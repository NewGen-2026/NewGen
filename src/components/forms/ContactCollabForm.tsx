import * as Yup from "yup";
import { motion } from "framer-motion";
import FormikForm from "./formik/FormikForm";
import FormikField from "./formik/FormikField";
import { HoverButton } from "../elements/buttons/Button";

const errorClass = "!left-[2px] text-boost !bottom-[-20px] !text-[11px]";

const fields = [
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
];

const layout = (
	<motion.div
		initial={{
			opacity: 0,
		}}
		animate={{
			opacity: 1,
		}}
		transition={{
			delay: 0.1,
		}}
		className="flex w-full flex-col gap-4 md:flex-nowrap md:gap-6"
	>
		<FormikField {...fields[0]} />
		<FormikField {...fields[1]} />
		<FormikField {...fields[2]} />
		<h3 className="t-44 mt-6 font-black uppercase">Optional</h3>
		<FormikField {...fields[3]} />
		<FormikField {...fields[4]} />
		<HoverButton
			button={{
				size: "wide",
				hover_background_color: "white",
				text_hover_color: "black",
				background_color: "boost",
				text_color: "energy",
			}}
			className="mt-8 flex w-full max-w-[240px]"
			type="submit"
			aria-label="Submit"
			buttonClass="!w-full"
		>
			{`submit bri<pst-pil>e</>f`}
		</HoverButton>
	</motion.div>
);

const ContactCollabForm = ({ onSubmit }) => {
	return <FormikForm fields={fields} onSubmit={onSubmit} formLayout={layout} />;
};

export default ContactCollabForm;
