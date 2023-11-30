import React from "react";
import Template from "~/pages/[...slug]";
import { getFromWordpress } from "~/utils/server";

export default function Preview(data) {
	return <Template {...data} />;
}

export async function getServerSideProps(ctx) {
	const {
		query: { post_id },
	} = ctx;

	const [page, options] = await Promise.all([
		getFromWordpress(`together/preview?post_id=${post_id}&cache=${+new Date()}`),
		getFromWordpress(`together/options`),
	]);

	return {
		props: { page, options },
	};
}
