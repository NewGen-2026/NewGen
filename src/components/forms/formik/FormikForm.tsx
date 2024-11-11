/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useEffect, useState } from "react";
import { Formik, Form, useFormikContext, useField } from "formik";
import * as Yup from "yup";
import Script from "next/script";
import Head from "next/head";

declare global {
	interface Window {
		grecaptcha: {
			enterprise: {
				ready: (callback: () => void) => void;
				execute: (siteKey: string, options: { action: string }) => Promise<string>;
			};
		};
	}
}

const FormikForm = ({ fields, onSubmit, formLayout }) => {
	const validationSchema = Yup.object().shape(
		fields.reduce((schema, field) => {
			return { ...schema, [field.name]: field.validation };
		}, {})
	);

	const initialValues = fields.reduce((values, field) => {
		return { ...values, [field.name]: field.initialValue !== undefined ? field.initialValue : "" };
	}, {});
	const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
	console.log("isRecaptchaLoaded", isRecaptchaLoaded);
	return (
		<>
			<Script
				src="https://www.google.com/recaptcha/api.js?render=6Lf-XnsqAAAAABGFjzGFsbkrcQkPk-LJXtj_E6nU"
				onLoad={() => {
					console.log("SCRIPT LOADED");
					setIsRecaptchaLoaded(true);
				}}
			/>

			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{(formik) => {
					useEffect(() => {
						console.log("USEFFECT", isRecaptchaLoaded, window.grecaptcha, window);
						if (isRecaptchaLoaded && window.grecaptcha) {
							window.grecaptcha.enterprise.ready(() => {
								window.grecaptcha.enterprise.execute("6Lf-XnsqAAAAABGFjzGFsbkrcQkPk-LJXtj_E6nU", { action: "LOGIN" }).then((token) => {
									console.log(token);
									console.log(formik.values);
									if ("g-recaptcha-response" in formik.values) {
										console.log("Set FIELD VALUE");
										formik.setFieldValue("g-recaptcha-response", token);
									} else {
										console.log("adding g-recaptcha-response");
										formik.setValues({
											...formik.values,
											"g-recaptcha-response": token,
										});
									}
								});
							});
						}
					}, [isRecaptchaLoaded]); // Only run when recaptcha loads

					return <Form className="newgen-form w-full">{formLayout}</Form>;
				}}
			</Formik>
		</>
	);
};
export default FormikForm;
