import React from "react";
import Layout from "~/components/templates/Layout";
import Page from "~/components/templates/Page";
import Post from "~/components/templates/Post";
import { WpOptions, WpPage } from "~/types/wp";
import cms from "~/utils/cms";
import dynamic from "next/dynamic";

const WorkPost = dynamic(() => import("~/components/templates/WorkPost"), { ssr: false });

type TemplateProps = {
	page: WpPage;
	options: WpOptions;
};

export default function Template(data: TemplateProps) {
	const { page } = data;

	return (
		<Layout data={data} hideCTA={page?.post_type === "post" || page?.post_type === "work"}>
			{page?.post_type === "post" ? <Post {...data} /> : page?.post_type === "work" ? <WorkPost {...data} /> : <Page {...data} />}
		</Layout>
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

	const staticPosts = {};

	if (!page || Object.keys(page).length === 0) {
		return {
			notFound: true,
		};
	}

	if (page.sections) {
		await Promise.all(
			page.sections.map(async (section) => {
				if (section.fetch_static_posts) {
					await Promise.all(
						section.fetch_static_posts.map(async (postType) => {
							staticPosts[postType] = await cms().postType(postType, 100);
						})
					);
				}
			})
		);
	}
	return {
		props: {
			page: { ...page, static_posts: staticPosts },
			options,
		},
		revalidate: 6000,
	};
}
