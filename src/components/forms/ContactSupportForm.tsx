import * as Yup from "yup";
import FormikForm from "./formik/FormikForm";
import FormikField from "./formik/FormikField";

const errorClass = "!left-[2px] text-green-2 !bottom-[-17px] !text-[11px]";

const fields = [
	{
		name: "name",
		type: "text",
		placeHolder: "Name*",
		initialValue: "",
		validation: Yup.string().required("Please enter your name"),
		className: "default-input grey",
		errorClass,
	},

	{
		name: "email",
		type: "email",
		placeHolder: "Email Address*",
		initialValue: "",
		validation: Yup.string().email("Incorrect email").required("Please enter your email"),
		className: "default-input grey",
		errorClass,
	},
	{
		name: "severity",
		type: "select",
		label: "How would you rank your request’s severity?*",
		initialValue: "",
		validation: Yup.string().required("Please pick a severity level"),
		className: "default-input grey",
		errorClass,
		options: [
			{ value: "", label: "Unsure" },
			{ value: "sev1", label: "Severity 1 (complete outage)" },
			{ value: "sev2", label: "Severity 2 (major outage)" },
			{ value: "sev3", label: "Severity 3 (minor outage)" },
			{ value: "sev4", label: "Severity 4 (question or request)" },
		],
		extraInfo: `Read about <a href="https://tailscale.com/kb/1250/support-options/#severity-definitions" target="_blank" class="text-blue"> how to classify your support request</a>`,
	},
	{
		name: "request-type",
		type: "select",
		label: "What type of request do you have?",
		initialValue: "",
		validation: Yup.string().required("Please pick a request type"),
		className: "default-input grey",
		errorClass,
		options: [
			{ label: "Select an option", disabled: true },
			{ value: "Connection issue", label: "Connection issue" },
			{ value: "ACL or ACL tag issue", label: "ACL or ACL tag issue" },
			{ value: "DNS issue", label: "DNS issue" },
			{ value: "Subnet issue", label: "Subnet issue" },
			{ value: "Exit node issue", label: "Exit node issue" },
			{ value: "Node sharing issue", label: "Node sharing issue" },
			{ value: "Domain or owner change", label: "Domain or owner change" },
			{ value: "Login name change detected", label: "Login name change detected" },
			{ value: "Identity provider configuration or change", label: "Identity provider configuration or change" },
			{ value: "Billing question or change", label: "Billing question or change" },
			{ value: "Account deletion request", label: "Account deletion request" },
			{ value: "Tailnet deletion request", label: "Tailnet deletion request" },
			{ value: "Feedback", label: "Feedback" },
			{ value: "Other", label: "Other" },
		],
	},
];

const contactSuportLayout = (
	<div className="flex w-full flex-col gap-4 md:flex-nowrap md:gap-5">
		<FormikField {...fields[0]} />
		<FormikField {...fields[1]} />
		<FormikField {...fields[2]} />
		<FormikField {...fields[3]} />
		<button type="submit" aria-label="Submit" className="t-18 bg-black-4 rounded-[14px] px-5 py-4 font-medium text-white">
			Send Request
		</button>
	</div>
);

const ContactSupportForm = ({ onSubmit }) => {
	return <FormikForm fields={fields} onSubmit={onSubmit} formLayout={contactSuportLayout} />;
};

export default ContactSupportForm;
