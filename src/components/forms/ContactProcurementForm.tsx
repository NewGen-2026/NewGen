import * as Yup from "yup";
import FormikForm from "./formik/FormikForm";
import FormikField from "./formik/FormikField";
import { HoverButton } from "../elements/buttons/Button";

const errorClass = "!left-[2px] text-forest !bottom-[-20px] !text-[11px]";

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
];

const layout = (
	<div className="flex w-full flex-col gap-4 md:flex-nowrap md:gap-6">
		<FormikField {...fields[0]} />
		<FormikField {...fields[1]} />
		<FormikField {...fields[2]} />
		<HoverButton
			button={{
				size: "wide",
				hover_background_color: "white",
				text_hover_color: "black",
				background_color: "forest",
				text_color: "sand",
			}}
			className="mt-4 flex w-full max-w-[240px] md:mt-8"
			type="submit"
			aria-label="Submit"
			buttonClass="!w-full"
		>
			{`submit bri<pst-rec>e</>f`}
		</HoverButton>
	</div>
);

const ContactProcurementForm = ({ onSubmit }) => {
	return <FormikForm fields={fields} onSubmit={onSubmit} formLayout={layout} />;
};

export default ContactProcurementForm;
