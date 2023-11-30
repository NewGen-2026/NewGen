import React from "react";
import { Layout } from "~/components/templates/Layout";

export default function Post(data) {
	const {
		page: { post_title },
	} = data;

	return (
		<Layout data={data}>
			<h1 className="bg-[white]">Post: {post_title}</h1>
		</Layout>
	);
}
