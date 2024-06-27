import * as Yup from "yup";
import { motion } from "framer-motion";
import { useState } from "react";
import { Field } from "formik";
import FormikForm from "./formik/FormikForm";
import FormikField from "./formik/FormikField";
import { HoverButton } from "../elements/buttons/Button";

const errorClass = "!left-[2px] text-green-2 !bottom-[-20px] !text-[11px]";

const CurrencySwitch = ({ currency = "GBP", selectedCurrency, setSelectedCurrency }) => {
	return (
		<button type="button" aria-label={currency} className="relative" onClick={() => setSelectedCurrency(currency)}>
			{currency}
			{currency === selectedCurrency && (
				<motion.div layoutId="currency-switcher" className="absolute left-0 right-0 top-[120%] flex justify-center">
					<div className="h-[6px] w-[6px] bg-electric" />
				</motion.div>
			)}
		</button>
	);
};

const currencies = ["GBP", "USD", "EUR"];
const GBPOptions = [
	{ value: "<£10K", label: "<£10K" },
	{ value: "£10-20K", label: "£10-20K" },
	{ value: "£20-50K", label: "£20-50K" },
	{ value: "£50-75K", label: "£50-75K" },
	{ value: "£75-100K", label: "£75-100K" },
	{ value: "£100-150K", label: "£100-150K" },
	{ value: "£200-250K", label: "£200-250K" },
	{ value: "£500K+", label: "£500K+" },
];

const USDOptions = [
	{ value: "<$15K", label: "<$15K" },
	{ value: "$16-25K", label: "$16-25K" },
	{ value: "$25-50K", label: "$25-50K" },
	{ value: "$50-75K", label: "$50-75K" },
	{ value: "$75-100K", label: "$75-100K" },
	{ value: "$100-150K", label: "$100-150K" },
	{ value: "$200-250K", label: "$200-250K" },
	{ value: "$500K+", label: "$500K+" },
];

const EUROptions = [
	{ value: "<€15K", label: "<€15K" },
	{ value: "€16-25K", label: "€16-25K" },
	{ value: "€25-50K", label: "€25-50K" },
	{ value: "€50-75K", label: "€50-75K" },
	{ value: "€75-100K", label: "€75-100K" },
	{ value: "€100-150K", label: "€100-150K" },
	{ value: "€200-250K", label: "€200-250K" },
	{ value: "€500K+", label: "€500K+" },
];

const ContactBrandsForm = ({ onSubmit }) => {
	const [selectedCurrency, setSelectedCurrency] = useState("GBP");

	const getOptions = () => {
		switch (selectedCurrency) {
			case "GBP":
				return GBPOptions;
			case "USD":
				return USDOptions;
			case "EUR":
				return EUROptions;
			default:
				return GBPOptions;
		}
	};

	const fields = [
		{
			name: "work_type",
			type: "select",
			options: [
				{ value: "", label: "How can we help" },
				{ value: "Influencer Marketing", label: "Influencer Marketing" },
				{ value: "Paid Media", label: "Paid Media" },
				{ value: "Creative Strategy", label: "Creative Strategy" },
				{ value: "Social Strategy", label: "Social Strategy" },
				{ value: "Content Production", label: "Content Production" },
				{ value: "Data & Insights", label: "Data & Insights" },
			],
			placeHolder: "How can we help",
			initialValue: "",
			validation: Yup.string().required("Please select an option"),
			className: "default-input",
			errorClass,
		},
		{
			name: "your_name",
			type: "text",
			placeHolder: "Your name*",
			initialValue: "",
			validation: Yup.string().required("Please enter your name"),
			className: "default-input",
			errorClass,
		},

		{
			name: "your_email",
			type: "email",
			placeHolder: "Your email",
			initialValue: "",
			validation: Yup.string().email("Incorrect email").required("Please enter your email"),
			className: "default-input",
			errorClass,
		},
		{
			name: "your_project",
			type: "textarea",
			placeHolder: "Tell us about your project",
			initialValue: "",
			validation: Yup.string().required("Please tell us about your project"),
			className: "default-input",
			errorClass,
		},
		{
			name: "budget",
			type: "select",
			options: [{ value: "", label: "Select your budget" }, ...getOptions()],
			placeHolder: "How can we help",
			initialValue: "",
			validation: Yup.string().required("Please select an option"),
			className: "default-input",
			errorClass,
		},
		{
			name: "target_audience",
			type: "text",
			placeHolder: "Your target audience",
			initialValue: "",
			className: "default-input",
			errorClass,
		},
		{
			name: "hdyhau",
			type: "select",
			options: [
				{ value: "", label: "How did you hear about us?" },
				{ value: "Google", label: "Google" },
				{ value: "The Drum", label: "The Drum" },
				{ value: "Social Media", label: "Social Media" },
				{ value: "Event", label: "Event" },
				{ value: "Grapevine", label: "Grapevine" },
			],
			placeHolder: "How can we help",
			initialValue: "",
			validation: Yup.string().required("Please select an option"),
			className: "default-input",
			errorClass,
		},
		{
			name: "_gotcha",
			type: "hidden",
			placeHolder: "",
			initialValue: "",
			className: "hidden",
			errorClass,
		},
	];

	const brandsLayout = (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				delay: 0.1,
			}}
			className="flex w-full flex-col gap-4 md:flex-nowrap md:gap-6"
		>
			<FormikField {...fields[7]} />

			<FormikField {...fields[0]} />
			<FormikField {...fields[1]} />
			<FormikField {...fields[2]} />
			<FormikField {...fields[3]} />
			<div className="mt-6 flex items-center justify-between gap-4">
				<h3 className="t-44 font-black uppercase">{`What's the budget`}</h3>
				<div className="t-16 flex items-center gap-8 font-black uppercase">
					{currencies.map((currency) => (
						<CurrencySwitch key={currency} currency={currency} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
					))}
				</div>
			</div>
			<FormikField {...fields[4]} />
			<h3 className="t-44 mt-6 font-black uppercase">Optional</h3>
			<FormikField {...fields[5]} />
			<FormikField {...fields[6]} />
			<HoverButton
				button={{
					size: "wide",
					hover_background_color: "white",
					text_hover_color: "black",
					background_color: "electric",
					text_color: "cobalt",
				}}
				className="mt-8 flex w-full max-w-[240px]"
				type="submit"
				aria-label="Submit"
				buttonClass="!w-full"
			>
				{`submit bri<pst-grid>e</>f`}
			</HoverButton>
		</motion.div>
	);

	return <FormikForm fields={fields} onSubmit={onSubmit} formLayout={brandsLayout} />;
};

export default ContactBrandsForm;
