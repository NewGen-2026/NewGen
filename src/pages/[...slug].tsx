import React from "react";
import Feed from "~/components/templates/Feed";
import Layout from "~/components/templates/Layout";
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

	return (
		<Layout data={data}>{page?.page_options?.is_posts_page ? <Feed {...data} /> : page?.post_type === "post" ? <Post {...data} /> : <Page {...data} />}</Layout>
	);
}

export async function getStaticPaths() {
	const data = await cms().paths();

	const filteredPaths = data.filter((path) => !path.includes("/creator/"));

	return { paths: filteredPaths, fallback: "blocking" };
}
export async function getStaticProps({ params }) {
	const slug = typeof params.slug !== "string" ? `/${params.slug.join("/")}` : params.slug;
	const [page, options] = await Promise.all([cms().page(slug), cms().options()]);

	if (page?.page_options?.is_posts_page) {
		const posts = await cms().postType("post", 100);

		return {
			props: {
				page: { ...page, posts },
				options,
			},
			revalidate: 6000,
		};
	}

	return {
		props: {
			page,
			options,
		},
		revalidate: 6000,
	};
}
