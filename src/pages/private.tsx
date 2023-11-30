import React from "react";
import Template from "~/pages/[...slug]";
import { getFromWordpress } from "~/utils/server";

export default function Private(data) {
	return <Template {...data} />;
}

Private.getInitialProps = async (ctx) => {
	const { post_id, key } = ctx.query;
	return getFromWordpress(`together/private?post_id=${post_id}&key=${key}`);
};
