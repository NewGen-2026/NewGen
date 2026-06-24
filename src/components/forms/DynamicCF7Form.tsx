import * as Yup from "yup";
import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import { useCF7Form } from "~/hooks/useCF7Form";
import { useRouter } from "next/router";
import FormikForm from "./formik/FormikForm";
import FormikField from "./formik/FormikField";
import { HoverButton } from "../elements/buttons/Button";

const errorClass = "!left-[2px] text-green-2 !bottom-[-20px] !text-[11px]";

type Color = "electric" | "cobalt" | "white" | "black" | "boost" | "energy" | "forest";

interface DynamicCF7FormProps {
	formId: number;
	formRedirect?: string;
	submitLabel?: string;
	buttonColors?: {
		background_color?: Color;
		text_color?: Color;
		hover_background_color?: Color;
		text_hover_color?: Color;
	};
}

const buildValidation = (field: any) => {
	if (field.type === "email") {
		let schema = Yup.string().email("Incorrect email");
		if (field.required) schema = schema.required("Please enter your email");
		return schema;
	}
	if (field.type === "select") {
		let schema = Yup.string();
		if (field.required) schema = schema.required("Please select an option");
		return schema;
	}
	if (field.type === "hidden") return undefined;

	let schema = Yup.string();
	if (field.required) {
		// Clean up field name: remove "your_" prefix and replace underscores with spaces
		const friendlyName = (field.label || field.name).replace(/^your_/i, "").replace(/_/g, " ");
		schema = schema.required(`Please enter your ${friendlyName}`);
	}
	return schema;
};

const buildFormikField = (field: any) => {
	const base: any = {
		name: field.name,
		type: field.type,
		placeHolder: field.placeholder || field.label || "",
		initialValue: field.initial_val || "",
		className: field.type === "hidden" ? "hidden" : "default-input",
		errorClass,
	};

	if (field.required) {
		base.validation = buildValidation(field);
	}

	if (field.type === "select") {
		const opts = field.options ?? [];
		base.options = [{ value: "", label: field.placeholder || "Please select", disabled: true }, ...opts];
	}

	return base;
};

const DynamicCF7Form = ({
	formId,
	formRedirect,
	submitLabel = "Submit",
	buttonColors = {
		background_color: "cobalt",
		text_color: "white",
		hover_background_color: "white",
		text_hover_color: "black",
	},
}: DynamicCF7FormProps) => {
	const { formData, loading, error } = useCF7Form(formId);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const router = useRouter();

	const onSubmit = async (values: Record<string, any>) => {
		setSubmitError(null);
		const fd = new FormData();

		// CF7 unit tag format is always wpcf7-f{ID}-o1 for single instances
		fd.append("_wpcf7_unit_tag", `wpcf7-f${formId}-o1`);

		Object.entries(values).forEach(([key, value]) => {
			if (key === "_gotcha") return;
			fd.append(key, value ?? "");
		});

		try {
			const res = await axios.post(`/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`, fd, { headers: { "Content-Type": "multipart/form-data" } });

			if (res.data?.status === "mail_sent") {
				if (formRedirect) {
					router.push("contact/thank-you/");
				} else {
					setIsSubmitted(true);
				}
			} else {
				const messages = res.data?.invalid_fields?.map((f: any) => f.message).join(", ");
				setSubmitError(messages || res.data?.message || "Something went wrong. Please try again.");
			}
		} catch (err) {
			console.error("Form submit error:", err);
			setSubmitError("Something went wrong. Please try again.");
		}
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent opacity-50" />
			</div>
		);
	}

	if (error || !formData) {
		return <p className="t-18-small opacity-50">{error || "Form unavailable. Please try again later."}</p>;
	}

	if (isSubmitted) {
		return (
			<div>
				<h3 className="t-36 font-heading uppercase">Thank You</h3>
				<p className="t-20 mt-3 font-medium md:mt-6">We will be in touch shortly!</p>
			</div>
		);
	}

	const formLayout = (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex w-full flex-col gap-4 md:flex-nowrap md:gap-6">
			{formData.fields.map((field, i) => (
				<div key={`${field.name}-${i}`}>
					<FormikField {...buildFormikField(field)} />
				</div>
			))}

			{submitError && <p className="t-14 text-red-500">{submitError}</p>}

			<HoverButton
				button={{ size: "wide", ...buttonColors }}
				className="mt-8 flex w-full max-w-[240px]"
				type="submit"
				aria-label="Submit"
				buttonClass="!w-full"
			>
				{submitLabel}
			</HoverButton>
		</motion.div>
	);

	return <FormikForm fields={formData.fields.map((field) => buildFormikField(field))} onSubmit={onSubmit} formLayout={formLayout} />;
};

export default DynamicCF7Form;
