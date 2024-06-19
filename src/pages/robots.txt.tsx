import { getFromWordpress } from "~/utils/server";

export default function Robots() {}

export const getServerSideProps = async ({ res }) => {
	const data = await getFromWordpress(`together/robots`);
	const is_public = data.blog_public === "1" || data.blog_public === 1;
	const robots = `User-agent: *
${is_public ? "Allow: /*" : "Disallow: /*"}
Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml
`;

	res.setHeader("Content-Type", "text/plain");
	res.write(robots);
	res.end();

	return {
		props: {},
	};
};
