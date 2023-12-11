import React from "react";
import Page from "~/components/templates/Page";
import Post from "~/components/templates/Post";
import { WpOptions, WpPage } from "~/types/wp";
import cms from "~/utils/cms";

type TemplateProps = {
	page: WpPage;
	options: WpOptions;
};

export default function Template(data: TemplateProps) {
	const { page } = data;

	switch (page?.post_type) {
		case "post":
			return <Post {...data} />;
		default:
			return <Page {...data} />;
	}
}

export async function getStaticPaths() {
	const data = await cms().paths();

	const filteredPaths = data.filter((path) => !path.includes("/creator/"));

	return { paths: filteredPaths, fallback: "blocking" };
}
export async function getStaticProps({ params }) {
	const slug = typeof params.slug !== "string" ? `/${params.slug.join("/")}` : params.slug;
	const [page, options] = await Promise.all([cms().page(slug), cms().options()]);

	return {
		props: {
			page,
			options,
		},
		revalidate: 6000, // In seconds
	};
}
