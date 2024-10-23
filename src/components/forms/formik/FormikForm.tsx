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

	return (
		<>
			{/* <Script src="https://www.google.com/recaptcha/enterprise.js?render=6Lf4oVcqAAAAAEP-G6YRpPVT0q0A9NNU0HH32fPp" /> */}
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{(formik) => {
					// useEffect(() => {
					// 	if (typeof window !== "undefined" && window.grecaptcha) {
					// 		window?.grecaptcha?.enterprise?.ready(() => {
					// 			window?.grecaptcha?.enterprise?.execute("‘6Lf4oVcqAAAAAEP-G6YRpPVT0q0A9NNU0HH32fPp", { action: "LOGIN" }).then((token) => {
					// 				// console.log("TOKEN", token);
					// 				if ("g-recaptcha-response" in formik.values) {
					// 					formik.setFieldValue("g-recaptcha-response", token);
					// 				} else {
					// 					// If it doesn't exist, add it
					// 					formik.setValues({
					// 						...formik.values,
					// 						"g-recaptcha-response": token,
					// 					});
					// 				}
					// 			});
					// 		});
					// 	}
					// }, [formik.setFieldValue]);

					return <Form className="newgen-form w-full">{formLayout}</Form>;
				}}
			</Formik>
		</>
	);
};
export default FormikForm;
