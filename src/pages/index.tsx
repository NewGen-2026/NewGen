import Template, { getStaticProps as getPageStaticProps } from "~/pages/[...slug]";

export default Template;

export async function getStaticProps() {
	const props = await getPageStaticProps({ params: { slug: "home" } });
	return props;
}
