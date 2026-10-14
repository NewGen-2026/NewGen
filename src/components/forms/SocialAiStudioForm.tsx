import { useState } from "react";
import { Formik, Form, Field, useField } from "formik";
import * as Yup from "yup";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/router";

// Bespoke "Book a demo" form for the hidden Social AI Studio landing page.
// Posts straight to the Contact Form 7 REST endpoint (same mechanism as DynamicCF7Form),
// but with a fixed field set so the markup can match the design exactly.
// Field names must match the tags in the CF7 form: your_name, your_email, your_company, source.

type Values = {
	your_name: string;
	your_email: string;
	your_company: string;
	website: string; // honeypot – never shown to humans, bots tend to fill it
};

const initialValues: Values = { your_name: "", your_email: "", your_company: "", website: "" };

const validationSchema = Yup.object({
	your_name: Yup.string().trim().required("Please enter your name"),
	your_email: Yup.string().trim().email("Please enter a valid email address").required("Please enter your work email"),
	your_company: Yup.string().trim().required("Please enter your company"),
});

// Where the enquiry came from. Override per QR code / campaign with ?src=... on the page URL.
const DEFAULT_SOURCE = "event-qr";

const EYEBROW = "text-[12px] font-semibold uppercase tracking-[0.08em]";
const INPUT =
	"min-h-[48px] w-full rounded-lg border border-black/[0.16] bg-white px-4 py-[14px] text-[16px] font-normal text-black placeholder:text-black/40 focus:border-black/[0.16] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-boost focus:ring-0";

type TextFieldProps = {
	name: keyof Values;
	label: string;
	placeholder: string;
	type?: "text" | "email";
	autoComplete?: string;
	error?: string | false;
};

const TextField = ({ name, label, placeholder, type = "text", autoComplete, error }: TextFieldProps) => {
	const id = `sas-${name}`;
	return (
		<div className="flex flex-col gap-1.5">
			<label htmlFor={id} className={EYEBROW}>
				{label}
			</label>
			<Field
				id={id}
				name={name}
				type={type}
				placeholder={placeholder}
				autoComplete={autoComplete}
				required
				aria-invalid={!!error}
				aria-describedby={error ? `${id}-error` : undefined}
				className={clsx(INPUT, error && "!border-ketchup")}
			/>
			{error && (
				<p id={`${id}-error`} className="text-[12px] text-ketchup">
					{error}
				</p>
			)}
		</div>
	);
};

// Visually removed, excluded from tab order and screen readers. Bots tend to fill it; humans never see it.
const Honeypot = () => {
	const [field] = useField("website");
	return (
		<div className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
			<label htmlFor="sas-website">
				Website
				<input id="sas-website" type="text" tabIndex={-1} autoComplete="off" {...field} />
			</label>
		</div>
	);
};

type SocialAiStudioFormProps = {
	formId: number;
	instagramUrl: string;
};

const SocialAiStudioForm = ({ formId, instagramUrl }: SocialAiStudioFormProps) => {
	const router = useRouter();
	const [sent, setSent] = useState<{ firstName: string; email: string } | null>(null);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const source = typeof router.query.src === "string" && router.query.src ? router.query.src : DEFAULT_SOURCE;

	const onSubmit = async (values: Values) => {
		setSubmitError(null);

		const name = values.your_name.trim();
		const email = values.your_email.trim();
		const markSent = () => setSent({ firstName: name.split(" ")[0], email });

		// Honeypot tripped: pretend it worked, send nothing.
		if (values.website) {
			markSent();
			return;
		}

		if (!formId) {
			// eslint-disable-next-line no-console
			console.error("SocialAiStudioForm: CF7 form ID is not set – see CF7_FORM_ID in src/pages/social-ai-studio.tsx");
			setSubmitError("This form isn't connected yet. Please email hello@thenewgen.com instead.");
			return;
		}

		const fd = new FormData();
		// CF7 unit tag format is always wpcf7-f{ID}-o1 for single instances
		fd.append("_wpcf7_unit_tag", `wpcf7-f${formId}-o1`);
		fd.append("your_name", name);
		fd.append("your_email", email);
		fd.append("your_company", values.your_company.trim());
		fd.append("source", source);

		try {
			const res = await axios.post(`/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`, fd, { headers: { "Content-Type": "multipart/form-data" } });

			if (res.data?.status === "mail_sent") {
				markSent();
				return;
			}

			const messages = res.data?.invalid_fields
				?.map((f: any) => f.message)
				.filter(Boolean)
				.join(", ");
			setSubmitError(messages || res.data?.message || "Something went wrong. Please try again.");
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error("SocialAiStudioForm submit error:", err);
			setSubmitError("Something went wrong. Please try again.");
		}
	};

	if (sent) {
		return (
			<div className="flex min-h-[360px] flex-col justify-center gap-4">
				<div className="grid h-14 w-14 place-items-center rounded-full bg-energy">
					<svg
						viewBox="0 0 24 24"
						width="24"
						height="24"
						fill="none"
						stroke="#000"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path d="M5 12l5 5L20 7" />
					</svg>
				</div>
				<h2 className="text-[28px] font-extrabold uppercase leading-none">You&apos;re in</h2>
				<p className="text-[16px] text-[#1A1A1A]">
					Thanks {sent.firstName}. We&apos;ve got your request and will be in touch at {sent.email} to lock in a time.
				</p>
				<p className="text-[14px] text-[#4A4A4A]">
					In the meantime, follow{" "}
					<a href={instagramUrl} target="_blank" rel="noreferrer" className="font-semibold underline hover:text-boost">
						@thenewgenagency
					</a>{" "}
					for what&apos;s now and what&apos;s next.
				</p>
			</div>
		);
	}

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			{({ errors, touched, isSubmitting }) => (
				<Form noValidate className="flex flex-col gap-5">
					<div>
						<h2 className="text-[28px] font-extrabold uppercase leading-none">Book a demo</h2>
						<p className="mt-2 text-[14px] text-[#4A4A4A]">Fifteen minutes. Your brand, live.</p>
					</div>

					<TextField name="your_name" label="Name" placeholder="Your name" autoComplete="name" error={touched.your_name && errors.your_name} />
					<TextField
						name="your_email"
						label="Work email"
						type="email"
						placeholder="you@company.com"
						autoComplete="email"
						error={touched.your_email && errors.your_email}
					/>
					<TextField
						name="your_company"
						label="Company"
						placeholder="Brand or agency"
						autoComplete="organization"
						error={touched.your_company && errors.your_company}
					/>

					{/* Honeypot – visually removed, excluded from tab order and screen readers */}
					<Honeypot />

					{submitError && (
						<p role="alert" className="text-[14px] text-ketchup">
							{submitError}
						</p>
					)}

					<button
						type="submit"
						disabled={isSubmitting}
						className="min-h-[52px] rounded-full bg-black px-7 py-[18px] text-[13px] font-extrabold uppercase tracking-[0.06em] text-white transition-colors duration-150 hover:bg-boost active:scale-[0.97] disabled:cursor-wait disabled:opacity-60"
					>
						{isSubmitting ? "Sending…" : "Book my demo"}
					</button>

					<p className="text-[12px] text-[#4A4A4A]">We&apos;ll reply within one working day. No newsletter, no spam.</p>
				</Form>
			)}
		</Formik>
	);
};

export default SocialAiStudioForm;
