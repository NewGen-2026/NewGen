import { getFromWordpress } from "~/utils/server";

export default function Sitemap() {}

// Paths excluded from the sitemap: private post types, dead category URLs
// (the feed filters via query params, so /category/ pages 404), conversion-only
// thank-you pages, and WordPress test/placeholder pages.
const EXCLUDED_PATH_PATTERNS = ["/team_member/", "/creator/", "/category/", "/thank-you/", "/404-2/", "/feed-2/", "/services-test/", "/something-is-coming/"];

export const getServerSideProps = async ({ res }) => {
	const data = await getFromWordpress(`together/paths`);

	const paths = Array.from(new Set<string>(data)).filter((path) => !EXCLUDED_PATH_PATTERNS.some((pattern) => path.includes(pattern)));

	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${paths
				.map(
					(url) => `
            <url>
              <loc>${baseUrl}${url}</loc>
            </url>
          `
				)
				.join("")}
    </urlset>
  `;

	res.setHeader("Content-Type", "text/xml");
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
};
