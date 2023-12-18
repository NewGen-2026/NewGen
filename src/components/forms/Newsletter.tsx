import * as Yup from "yup";
import FormikForm from "./formik/FormikForm";
import FormikField from "./formik/FormikField";

const generateFields = (layout) => {
	return [
		{
			name: "email",
			type: "email",
			placeHolder: "Enter Email",
			initialValue: "",
			validation: Yup.string().email("Incorrect email").required("Please enter your email"),
			className: layout === "one" ? "default-input transparent" : "default-input ghost",
			errorClass: layout === "one" ? "!left-[8px] text-white/50 !bottom-[-12px] !text-[8px]" : "!left-[3px] text-white/50 !bottom-[-32px] !text-[10px]",
		},
	];
};
const NewsletterLayoutOne = () => {
	const customFields = generateFields("one");
	return (
		<div className="w-full">
			<FormikField {...customFields[0]} />
			<button type="submit" aria-label="Submit" className="t-18 text-heading-black mt-[15px] w-full rounded-[14px] bg-white px-5 py-4 font-medium">
				Subscribe{" "}
			</button>
		</div>
	);
};

const NewsletterLayoutTwo = () => {
	const customFields = generateFields("two");
	return (
		<div className="relative flex w-full items-center justify-between rounded-[14px] border border-white/10 bg-white/10 px-[17px] py-2">
			<FormikField {...customFields[0]} />
			<button type="submit" aria-label="Submit">
				<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M9.971 13.7116L14.776 8.90656L9.971 4.10156L9.029 5.04456L12.224 8.23956H2.5V9.57356H12.224L9.029 12.7686L9.971 13.7116Z"
						fill="white"
					/>
				</svg>
			</button>
		</div>
	);
};

const Newsletter = ({ onSubmit, layout = "one" }) => {
	const FormLayout = layout === "one" ? NewsletterLayoutOne : NewsletterLayoutTwo;
	const fields = generateFields(layout);

	return <FormikForm fields={fields} onSubmit={onSubmit} formLayout={<FormLayout />} />;
};

export default Newsletter;
