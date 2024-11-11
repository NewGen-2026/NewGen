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
							const recaptchaScript = document.getElementById("google-recaptcha-script");
							if (recaptchaScript && window.grecaptcha) {
								window.grecaptcha.ready(() => {
									window.grecaptcha.execute("6Lf-XnsqAAAAABGFjzGFsbkrcQkPk-LJXtj_E6nU", { action: "homepage" }).then((token) => {
										console.log(token);
										formik.setFieldValue("g-recaptcha-response", token);
									});
								});
								return true; // Indicate success
							}
							return false; // Indicate failure
						};

						let attempts = 0;
						const maxAttempts = 5;
						const interval = 1000; // 1 second

						const intervalId = setInterval(() => {
							if (handleRecaptcha() || attempts >= maxAttempts) {
								clearInterval(intervalId);
								if (attempts >= maxAttempts) {
									console.warn("ReCAPTCHA script not loaded after multiple attempts");
								}
							}
							attempts += 1;
						}, interval);

						// Cleanup the interval on component unmount
						return () => clearInterval(intervalId);
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
