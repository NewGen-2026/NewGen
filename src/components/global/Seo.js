import React from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";

export default function Seo({ page = false }) {
	const isIndexable = page?.seo?.indexable !== "1"; // This 1 value is yoast for "not indexable"

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
						images: [
							{
								url: page.seo.image,
							},
						],
					}}
				/>
			)}
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link rel="apple-touch-icon" sizes="180x180" href="/static/images/favicons/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicons/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/static/images/favicons/favicon-16x16.png" />
				<link rel="manifest" href="/static/images/favicons/site.webmanifest" />
				<link rel="mask-icon" href="/static/images/favicons/safari-pinned-tab.svg" color="#492847" />
				<meta name="msapplication-TileColor" content="#492847" />
				<meta name="theme-color" content="#ffffff" />
				<meta name="twitter:card" content="summary" />
			</Head>
		</div>
	);
}
