/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

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
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			<Form className="newgen-form w-full">{formLayout}</Form>
		</Formik>
	);
};
export default FormikForm;
