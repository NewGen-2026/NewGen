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
			ready: (callback: () => void) => void;
			execute: (siteKey: string, options: { action: string }) => Promise<string>;
		};
	}
}

const FormikForm = ({ fields, onSubmit, formLayout }) => {
	const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);

	const validationSchema = Yup.object().shape(
		fields.reduce((schema, field) => {
			return { ...schema, [field.name]: field.validation };
		}, {})
	);

	const initialValues = fields.reduce((values, field) => {
		return { ...values, [field.name]: field.initialValue !== undefined ? field.initialValue : "" };
	}, {});

	return (
		<>
			<Script
				async
				src="https://www.google.com/recaptcha/api.js"
				strategy="afterInteractive"
				onLoad={() => {
					console.log("SCRIPT LOADED");
					setIsRecaptchaLoaded(true);
				}}
				onError={(e) => {
					console.error("Script failed to load", e);
				}}
			/>

			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{(formik) => {
					useEffect(() => {
						console.log("UseEffect", window);
						if (isRecaptchaLoaded) {
							console.log("isloaded", window.grecaptcha);
							window.grecaptcha.ready(() => {
								window.grecaptcha.execute("6Lf-XnsqAAAAABGFjzGFsbkrcQkPk-LJXtj_E6nU", { action: "homepage" }).then((token) => {
									console.log(token);
									formik.setFieldValue("g-recaptcha-response", token);
								});
							});
						}
					}, [isRecaptchaLoaded]);

					return <Form className="newgen-form w-full">{formLayout}</Form>;
				}}
			</Formik>
			{/* <div className="mt-10">
				<div className="g-recaptcha" data-sitekey="6Lf-XnsqAAAAABGFjzGFsbkrcQkPk-LJXtj_E6nU" data-callback="onSubmit" data-size="invisible" />
			</div> */}
		</>
	);
};
export default FormikForm;
