import React from "react";
import { WpOptions, WpPage } from "~/types/wp";
import Header from "../global/Header";
import Seo from "../global/Seo";
import Footer from "../global/Footer";
import WpHotkey from "../elements/WpHotkey";
import PasswordProtect from "../global/PasswordProtect";
import CTA from "../global/CTA";

type LayoutProps = {
	data: {
		page: WpPage;
		options: WpOptions;
	};
	children: React.ReactNode;
};

function Layout({ data, children }: LayoutProps) {
	const { page, options } = data;

	return (
		<PasswordProtect password={page?.post_password}>
			<Seo page={data?.page} />
			<Header {...options} pageOptions={page?.page_options} />
			<main>{children}</main>
			<CTA />
			<Footer {...options} />
			<WpHotkey id={page?.ID} />
		</PasswordProtect>
	);
}

export default Layout;
