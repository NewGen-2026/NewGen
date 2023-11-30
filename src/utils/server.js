import axios from "axios";
import cacheBustingString from "~/utils/cacheBustingString";

export const getFromWordpress = async (url = "") => {
	const processedUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json/${cacheBustingString(url)}`;

	try {
		const { data } = await axios.get(processedUrl);
		return data;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(`${error.code} ${error.message} on URL ${processedUrl}`);
		return process.exit(1);
	}
};

export default getFromWordpress;
