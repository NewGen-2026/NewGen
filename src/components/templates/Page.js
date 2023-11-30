import React from "react";
import { Layout } from "~/components/templates/Layout";
import { LayoutRenderer } from "~/components/layouts/LayoutRenderer";

export default function Page(data) {
	const { page } = data;
	return (
		<Layout data={data}>
			<LayoutRenderer {...page} />
		</Layout>
	);
}
