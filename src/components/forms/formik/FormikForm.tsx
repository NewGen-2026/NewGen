/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useEffect, useState } from "react";
import { Formik, Form, useFormikContext, useField } from "formik";
import * as Yup from "yup";
import Script from "next/script";
import Head from "next/head";

import { useReCaptcha } from "next-recaptcha-v3";

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

	const {
		/** reCAPTCHA_site_key */
		reCaptchaKey,
		/** Global ReCaptcha object */
		grecaptcha,
		/** Is ReCaptcha script loaded */
		loaded,
		/** Is ReCaptcha script failed to load */
		error,
		/** Other hook props */
		...otherProps
	} = useReCaptcha();

	console.log(loaded, grecaptcha, reCaptchaKey);

	return (
		<>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{(formik) => {
					// useEffect(() => {
					// 	console.log("UseEffect", window);
					// 	if (isRecaptchaLoaded) {
					// 		console.log("isloaded", window.grecaptcha);
					// 		window.grecaptcha.ready(() => {
					// 			window.grecaptcha.execute("6Lf-XnsqAAAAABGFjzGFsbkrcQkPk-LJXtj_E6nU", { action: "homepage" }).then((token) => {
					// 				console.log(token);
					// 				formik.setFieldValue("g-recaptcha-response", token);
					// 			});
					// 		});
					// 	}
					// }, [isRecaptchaLoaded]);0

					useEffect(() => {
						console.log("UseEffect", loaded, window);
						if (window && window.grecaptcha) {
							console.log("UseEffect in window", loaded, window);
							window.grecaptcha.ready(() => {
								window.grecaptcha.execute("6Lf-XnsqAAAAABGFjzGFsbkrcQkPk-LJXtj_E6nU", { action: "homepage" }).then((token) => {
									console.log(token);
									formik.setFieldValue("g-recaptcha-response", token);
								});
							});
						}
					}, [loaded]);

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
