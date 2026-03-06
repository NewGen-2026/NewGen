import * as Yup from "yup";
import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import { useCF7Form } from "~/hooks/useCF7Form";
import { useRouter } from "next/router";
import { GoogleReCaptchaCheckbox } from "@google-recaptcha/react";
import FormikForm from "./formik/FormikForm";
import FormikField from "./formik/FormikField";
import { HoverButton } from "../elements/buttons/Button";

const errorClass = "!left-[2px] text-green-2 !bottom-[-20px] !text-[11px]";

type Color = "electric" | "cobalt" | "white" | "black" | "boost" | "energy" | "forest";
type Currency = "GBP" | "USD" | "EUR";

const CURRENCIES: Currency[] = ["GBP", "USD", "EUR"];

// Detects if a field name is a currency budget variant e.g. budget_gbp, budget_usd, budget_eur
const CURRENCY_FIELD_RE = /^(.+)_(gbp|usd|eur)$/i;

interface DynamicCF7FormProps {
	formId: number;
	formRedirect?: string;
	submitLabel?: string;
	showBudgetTitle?: boolean; // renders "What's the budget" heading + currency tabs
	showOptionalTitle?: boolean; // renders "Optional" heading before optional fields
	optionalFields?: string[]; // field names to appear under the Optional heading
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

const buildFormikField = (field: any, overrideOptions?: { value: string; label: string }[]) => {
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
		const opts = overrideOptions ?? field.options ?? [];
		base.options = [{ value: "", label: field.placeholder || "Please select", disabled: true }, ...opts];
	}

	return base;
};

const CurrencySwitch = ({
	currency,
	selectedCurrency,
	setSelectedCurrency,
}: {
	currency: Currency;
	selectedCurrency: Currency;
	setSelectedCurrency: (c: Currency) => void;
}) => (
	<button type="button" aria-label={currency} className="relative" onClick={() => setSelectedCurrency(currency)}>
		{currency}
		{currency === selectedCurrency && (
			<motion.div layoutId="currency-switcher" className="absolute left-0 right-0 top-[120%] flex justify-center">
				<div className="h-[6px] w-[6px] bg-electric" />
			</motion.div>
		)}
	</button>
);

const DynamicCF7Form = ({
	formId,
	formRedirect,
	submitLabel = "Submit",
	showBudgetTitle = true,
	showOptionalTitle = true,
	optionalFields = ["target_audience"],
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
	const [activeCurrency, setActiveCurrency] = useState<Currency>("GBP");
	const router = useRouter();

	const onSubmit = async (values: Record<string, any>) => {
		setSubmitError(null);
		const fd = new FormData();

		// CF7 unit tag format is always wpcf7-f{ID}-o1 for single instances
		// The REST API read endpoint requires auth — construct it directly instead
		fd.append("_wpcf7_unit_tag", `wpcf7-f${formId}-o1`);

		Object.entries(values).forEach(([key, value]) => {
			if (key === "_gotcha") return;

			const match = key.match(CURRENCY_FIELD_RE);
			if (match) {
				if (match[2].toUpperCase() === activeCurrency) {
					fd.append(match[1], value ?? "");
				}
				return;
			}

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

	// Detect if this form has currency fields
	const hasCurrencyFields = formData.fields.some((f) => CURRENCY_FIELD_RE.test(f.name));

	// Build a lookup of currency options: { budget: { GBP: [...], USD: [...], EUR: [...] } }
	const currencyOptionsMap: Record<string, Record<Currency, any[]>> = {};
	if (hasCurrencyFields) {
		formData.fields.forEach((field) => {
			const match = field.name.match(CURRENCY_FIELD_RE);
			if (match) {
				const baseName = match[1];
				const currency = match[2].toUpperCase() as Currency;
				if (!currencyOptionsMap[baseName]) currencyOptionsMap[baseName] = { GBP: [], USD: [], EUR: [] };
				currencyOptionsMap[baseName][currency] = field.options ?? [];
			}
		});
	}

	// Filter out non-primary currency fields (keep only _gbp as the rendered one, skip _usd/_eur)
	const visibleFields = formData.fields.filter((field) => {
		const match = field.name.match(CURRENCY_FIELD_RE);
		if (!match) return true;
		// Only render the GBP variant — options will swap based on activeCurrency
		return match[2].toLowerCase() === "gbp";
	});

	let optionalTitleInserted = false;

	const formLayout = (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex w-full flex-col gap-4 md:flex-nowrap md:gap-6">
			{visibleFields.map((field, i) => {
				const match = field.name.match(CURRENCY_FIELD_RE);
				const baseName = match ? match[1] : field.name;
				const isCurrencyField = !!match;

				// Get active currency options for this field
				const overrideOptions = isCurrencyField ? currencyOptionsMap[baseName]?.[activeCurrency] : undefined;

				const builtField = buildFormikField({ ...field, name: isCurrencyField ? baseName : field.name }, overrideOptions);

				const isOptional = optionalFields.includes(field.name);
				const showOptionalHeader = showOptionalTitle && isOptional && !optionalTitleInserted;
				if (showOptionalHeader) optionalTitleInserted = true;

				return (
					<div key={`${field.name}-${i}`}>
						{/* Budget title + currency tabs */}
						{isCurrencyField && showBudgetTitle && (
							<div className="mb-4 mt-6 flex items-center justify-between gap-4">
								{/* <h3 className="t-44 font-black uppercase">What's the budget</h3> */}
								<h3 className="t-44 font-black uppercase">What&apos;s the budget</h3>
								<div className="t-16 flex items-center gap-8 font-black uppercase">
									{CURRENCIES.map((c) => (
										<CurrencySwitch key={c} currency={c} selectedCurrency={activeCurrency} setSelectedCurrency={setActiveCurrency} />
									))}
								</div>
							</div>
						)}

						{/* Optional section title */}
						{showOptionalHeader && <h3 className="t-44 mb-4 mt-6 font-black uppercase">Optional</h3>}

						<FormikField {...builtField} />
					</div>
				);
			})}

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

	return (
		<FormikForm
			fields={visibleFields.map((field) => {
				const match = field.name.match(CURRENCY_FIELD_RE);
				const baseName = match ? match[1] : field.name;
				const overrideOptions = match ? currencyOptionsMap[baseName]?.[activeCurrency] : undefined;
				return buildFormikField({ ...field, name: baseName }, overrideOptions);
			})}
			onSubmit={onSubmit}
			formLayout={formLayout}
		/>
	);
};

export default DynamicCF7Form;
