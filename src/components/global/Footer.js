import React, { useContext } from "react";
import { GlobalContext } from "~/utils/context";

export default function Footer() {
	// eslint-disable-next-line no-unused-vars
	const [context] = useContext(GlobalContext);
	return <div>{/* <pre>{JSON.stringify(context.options, null, 4)}</pre> */}</div>;
}
