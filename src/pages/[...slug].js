import React from "react";
import Post from "~/components/templates/Post";
import Page from "~/components/templates/Page";
import { getFromWordpress } from "~/utils/server";

export default function Template(data) {
	const { page } = data;
	switch (page?.post_type) {
		case "post":
			return <Post {...data} />;
		default:
			return <Page {...data} />;
	}
}

export async function getStaticPaths() {
	const data = await getFromWordpress(`together/paths`);
	return { paths: data, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
	const slug = typeof params.slug !== "string" ? `/${params.slug.join("/")}` : params.slug;
	const [page, options] = await Promise.all([getFromWordpress(`together/post?slug=${slug}`), getFromWordpress(`together/options`)]);

	return {
		props: {
			page,
			options,
		},
		revalidate: 60, // In seconds
	};
}
