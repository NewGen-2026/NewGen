import React from "react";
import { WpOptions, WpPage } from "~/types/wp";
import LayoutRenderer from "../layouts/LayoutRenderer";

type PageProps = {
	page: WpPage;
	options: WpOptions;
};

export default function Page(data: PageProps) {
	const { page } = data;

	return <LayoutRenderer {...page} />;
}
