import { useEffect, useState } from "react";
import axios from "axios";

export interface CF7Field {
	name: string;
	type: string;
	label?: string;
	options?: string[];
	required?: boolean;
	placeholder?: string;
}

export interface CF7FormData {
	id: number;
	title: string;
	fields: CF7Field[];
}

const CF7_API_BASE = "/wp-json/custom/v1/cf7-form";

// Maps CF7 field types to your existing FormikField types
const mapFieldType = (cf7Type: string): string => {
	const typeMap: Record<string, string> = {
		text: "text",
		email: "email",
		textarea: "textarea",
		select: "select",
		"drop-down": "select",
		checkbox: "checkbox",
		radio: "radio",
		tel: "text",
		url: "text",
		number: "text",
		hidden: "hidden",
	};
	return typeMap[cf7Type] || "text";
};

export const useCF7Form = (formId: number | null) => {
	const [formData, setFormData] = useState<CF7FormData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!formId) return;

		setLoading(true);
		setError(null);

		axios
			.get(`${CF7_API_BASE}/${formId}`)
			.then((res) => {
				const raw = res.data;

				// Normalize the API response into a consistent shape.
				// Adjust the mapping below if your API returns a different structure.
				const normalized: CF7FormData = {
					id: formId,
					title: raw?.title || "",
					fields: (raw?.fields || []).map((field: any) => ({
						name: field.name || field.basetype || "",
						type: mapFieldType(field.basetype || field.type || "text"),
						label: field.label || field.name || "",
						placeholder: field.placeholder || field.label || field.name || "",
						required: field.required === true || field.required === "1",
						options: Array.isArray(field.options) ? field.options.map((opt: any) => (typeof opt === "string" ? { value: opt, label: opt } : opt)) : undefined,
					})),
				};

				setFormData(normalized);
			})
			.catch((err) => {
				console.error("CF7 form fetch error:", err);
				setError("Failed to load form");
			})
			.finally(() => setLoading(false));
	}, [formId]);

	return { formData, loading, error };
};
