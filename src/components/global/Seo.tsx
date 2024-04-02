import React from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { WpPage } from "~/types/wp";

type SeoProps = {
	page: WpPage;
};

export default function Seo({ page }: SeoProps) {
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
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="mask-icon" href="/favicon.svg" color="#FFFFFF" />
				<meta name="msapplication-TileColor" content="#FFFFFF" />
				<meta name="theme-color" content="#ffffff" />
				<meta name="twitter:card" content="summary" />
			</Head>
		</div>
	);
}
