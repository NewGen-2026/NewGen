import React from "react";
import { NextSeo, ArticleJsonLd, OrganizationJsonLd } from "next-seo";
import Head from "next/head";
import { WpOptions, WpPage } from "~/types/wp";

type SeoProps = {
	page: WpPage;
	options?: WpOptions;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://thenewgen.com";

// WP dates arrive as "YYYY-MM-DD HH:MM:SS"; OG tags and JSON-LD require ISO 8601.
// Only safe on the *_gmt fields, since the offset is appended as Z.
const gmtToIso = (wpDate?: string) => (wpDate ? `${wpDate.replace(" ", "T")}Z` : undefined);

export default function Seo({ page, options }: SeoProps) {
	const isIndexable = page?.seo?.indexable !== "1"; // This 1 value is yoast for "not indexable"
	const isPost = page?.post_type === "post";
	const publishedTime = gmtToIso(page?.post_date_gmt);
	const modifiedTime = gmtToIso(page?.post_modified_gmt);
	const authorName = page?.author?.name;
	const socialUrls = options?.footer_menu?.socials?.map((social) => social?.link?.url).filter(Boolean) || [];

	return (
		<div>
			{page?.seo && (
				<NextSeo
					noindex={!isIndexable}
					title={page.seo.title}
					description={page.seo.description}
					canonical={page.url}
					openGraph={{
						url: page.url,
						title: page.seo.title,
						description: page.seo.description,
						...(isPost && {
							type: "article",
							article: {
								publishedTime,
								modifiedTime,
								...(authorName && { authors: [authorName] }),
							},
						}),
						images: [
							{
								url: page.seo.image,
							},
						],
					}}
				/>
			)}
			{isPost && page?.seo && publishedTime && (
				<ArticleJsonLd
					url={page.url}
					title={page.seo.title || page.post_title}
					description={page.seo.description || ""}
					images={page.seo.image ? [page.seo.image] : []}
					datePublished={publishedTime}
					dateModified={modifiedTime}
					authorName={authorName || "NewGen"}
					publisherName="NewGen"
				/>
			)}
			<OrganizationJsonLd name="NewGen" url={SITE_URL} sameAs={socialUrls} />
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="mask-icon" href="/favicon.svg" color="#FFFFFF" />
				<meta name="msapplication-TileColor" content="#FFFFFF" />
				<meta name="theme-color" content="#ffffff" />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
		</div>
	);
}
