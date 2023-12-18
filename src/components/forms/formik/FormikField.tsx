/* eslint-disable react/jsx-fragments */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import { Field, useField } from "formik";
import InputField from "./fields/InputField";
import TextAreaField from "./fields/TextAreaField";
import SelectField from "./fields/SelectField";
import CheckboxField from "./fields/CheckboxField";

const fieldComponents = {
	text: InputField,
	email: InputField,
	password: InputField,
	url: InputField,
	textarea: TextAreaField,
	select: SelectField,
	checkbox: CheckboxField,
};
type FormikFieldProps = {
	name: string;
	type?: string;
	label?: string;
	options?: any[];
	extraInfo?: string;
};

const FormikField = ({ name, type = "text", label, extraInfo, options, ...props }: FormikFieldProps) => {
	const [isFocused, setIsFocused] = useState(false);
	const [field] = useField(name);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	const renderField = (formField, form) => {
		const { touched, errors } = form;
		const error = touched[formField?.name] && errors[formField?.name];
		const FieldComponent = fieldComponents[type] || InputField;

		return (
			<React.Fragment>
				<FieldComponent
					field={formField}
					form={form}
					type={type}
					options={options}
					error={error}
					onFocus={handleFocus}
					onBlur={handleBlur}
					name={name}
					{...props}
				/>
			</React.Fragment>
		);
	};

	return (
		<div className={`relative w-full ${type}`}>
			{label && (
				<label className={`field-label pointer-events-none mb-2 block md:mb-4 ${isFocused || field.value ? "focused" : ""}`} htmlFor={name}>
					{label}
				</label>
			)}
			<Field name={name} type={type} onBlur={field.onBlur} onFocus={handleFocus} {...props}>
				{({ field, form }) => renderField(field, form)}
			</Field>
			{extraInfo && <div className="t-14 mt-2 md:mt-[14px]" dangerouslySetInnerHTML={{ __html: extraInfo }} />}
		</div>
	);
};

export default FormikField;
