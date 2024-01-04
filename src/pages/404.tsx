import Layout from "~/components/templates/Layout";
import Page from "~/components/templates/Page";
import cms from "~/utils/cms";

export default function FourOhFour(data) {
	return (
		<Layout data={data}>
			<Page {...data} />
		</Layout>
	);
}

export async function getStaticProps() {
	const [page, options] = await Promise.all([cms().page("404-2"), cms().options()]);

	return {
		props: {
			page,
			options,
		},
		revalidate: 60,
	};
}
