/* eslint-disable no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { GoogleReCaptchaCheckbox } from "@google-recaptcha/react";

const FormikForm = ({ fields, onSubmit, formLayout }) => {
	const validationSchema = Yup.object().shape(
		fields.reduce((schema, field) => {
			return { ...schema, [field.name]: field.validation };
		}, {})
	);

	const initialValues = fields.reduce((values, field) => {
		return { ...values, [field.name]: field.initialValue !== undefined ? field.initialValue : "" };
	}, {});

	const [token, setToken] = useState("");

	return (
		<>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{(formik) => {
					useEffect(() => {
						console.log("SETTING TOKEN", token);
						formik.setFieldValue("g-recaptcha-response", token);
					}, [token]);
					return <Form className="newgen-form w-full">{formLayout}</Form>;
				}}
			</Formik>
			<div className="mt-10">
				<GoogleReCaptchaCheckbox
					onChange={(token) => {
						console.log("token", token);
						setToken(token);
					}}
				/>
			</div>
		</>
	);
};
export default FormikForm;
