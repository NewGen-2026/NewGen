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
			<Script src="https://www.google.com/recaptcha/api.js?render=6LesbDcqAAAAAM9a7AhrzQxVLfTYynzBB5uYeFvY" />
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{(formik) => {
					useEffect(() => {
						if (typeof window !== "undefined" && window.grecaptcha) {
							window?.grecaptcha?.ready(() => {
								window?.grecaptcha?.execute("6LesbDcqAAAAAM9a7AhrzQxVLfTYynzBB5uYeFvY", { action: "homepage" }).then((token) => {
									// console.log("TOKEN", token);
									if ("g-recaptcha-response" in formik.values) {
										formik.setFieldValue("g-recaptcha-response", token);
									} else {
										// If it doesn't exist, add it
										formik.setValues({
											...formik.values,
											"g-recaptcha-response": token,
										});
									}
								});
							});
						}
					}, [formik.setFieldValue]);

					return <Form className="newgen-form w-full">{formLayout}</Form>;
				}}
			</Formik>
		</>
	);
};
export default FormikForm;
