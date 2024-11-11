/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useEffect, useState } from "react";
import { Formik, Form, useFormikContext, useField } from "formik";
import * as Yup from "yup";
import Script from "next/script";
import Head from "next/head";
import { GoogleReCaptchaCheckbox } from "@google-recaptcha/react";

declare global {
	interface Window {
		grecaptcha: {
			ready: (callback: () => void) => void;
			execute: (siteKey: string, options: { action: string }) => Promise<string>;
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
	const [recaptchaToken, setRecaptchaToken] = useState("");

	return (
		<>
			{/* <Script
				src="https://www.google.com/recaptcha/api.js?render=6Lf-XnsqAAAAABGFjzGFsbkrcQkPk-LJXtj_E6nU"
				onLoad={() => {
					console.log("SCRIPT LOADED");
					setIsRecaptchaLoaded(true);
				}}
			/> */}

			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{(formik) => {
					useEffect(() => {
						const handleRecaptcha = () => {
							console.log(window.grecaptcha);
							if (window.grecaptcha) {
								window.grecaptcha.ready(() => {
									window.grecaptcha.execute("6Lf-XnsqAAAAABGFjzGFsbkrcQkPk-LJXtj_E6nU", { action: "homepage" }).then((token) => {
										console.log(token);
										formik.setFieldValue("g-recaptcha-response", token);
									});
								});
							}
						};

						// Call handleRecaptcha after 3 seconds
						const timer = setTimeout(handleRecaptcha, 3000);

						// Cleanup the timer on component unmount
						return () => clearTimeout(timer);
					}, []);

					return <Form className="newgen-form w-full">{formLayout}</Form>;
				}}
			</Formik>
			<div className="mt-10">
				{/* <GoogleReCaptchaCheckbox
					onChange={(token) => {
						console.log("ONCHANGE", token);

						setRecaptchaToken(token);
					}}
				/> */}
				{/* <ReCAPTCHA sitekey="6Lf-XnsqAAAAABGFjzGFsbkrcQkPk-LJXtj_E6nU" ref={recaptchaRef} asyncScriptOnLoad={() => setIsRecaptchaLoaded(true)} /> */}
			</div>
		</>
	);
};
export default FormikForm;
