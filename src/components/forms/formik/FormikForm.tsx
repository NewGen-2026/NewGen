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
					// useEffect(() => {
					// 	console.log("USEFFECT", isRecaptchaLoaded, window.grecaptcha, window);

					// if (isRecaptchaLoaded && window.grecaptcha) {
					// 	window.grecaptcha.enterprise.ready(() => {
					// 		window.grecaptcha.enterprise.execute("6Lf-XnsqAAAAABGFjzGFsbkrcQkPk-LJXtj_E6nU", { action: "LOGIN" }).then((token) => {
					// 			console.log(token);
					// 			console.log(formik.values);
					// 			if ("g-recaptcha-response" in formik.values) {
					// 				console.log("Set FIELD VALUE");
					// 				formik.setFieldValue("g-recaptcha-response", token);
					// 			} else {
					// 				console.log("adding g-recaptcha-response");
					// 				formik.setValues({
					// 					...formik.values,
					// 					"g-recaptcha-response": token,
					// 				});
					// 			}
					// 		});
					// 	});
					// }
					// }, [recaptchaToken]); // Only run when recaptcha loads

					useEffect(() => {
						console.log("useEffect");
						window.grecaptcha.ready(() => {
							console.log("Ready");
							window.grecaptcha.execute("6Lf-XnsqAAAAABGFjzGFsbkrcQkPk-LJXtj_E6nU", { action: "homepage" }).then((token) => {
								console.log(token);
								formik.setFieldValue("g-recaptcha-response", token);
							});
						});
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
