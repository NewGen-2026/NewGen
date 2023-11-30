import { WpOptions, WpPage } from "~/types/wp";
import cacheBustingString from "~/utils/cacheBustingString";

export const fetchFromWp = async (url: string, options?: object) => {
	const processedUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json/${cacheBustingString(url)}`;
	const processedOptions = { next: { revalidate: 60 }, ...options };
	try {
		const res = await fetch(processedUrl, processedOptions);
		const data = res.json();
		return data;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(`${error.code} ${error.message} on URL ${processedUrl}`);
		return process.exit(1);
	}
};

export default function cms() {
	if (!process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL) {
		throw new Error("NEXT_PUBLIC_WORDPRESS_BASE_URL valuerequired in .env.local");
	}

	return {
		paths: async (): Promise<string[]> => {
			const data: string[] = await fetchFromWp("together/paths");
			return data;
		},
		page: async (slug: string): Promise<WpPage> => {
			const data: WpPage = await fetchFromWp(`together/post?slug=${slug}`);
			return data;
		},
		options: async (): Promise<WpOptions> => {
			const data = await fetchFromWp(`together/options`);
			return data;
		},
		preview: async (post_id: number): Promise<WpPage> => {
			const data: WpPage = await fetchFromWp(`together/preview?post_id=${post_id}&cache=${+new Date()}`, {
				cache: "no-cache",
			});
			return data;
		},
	};
}
