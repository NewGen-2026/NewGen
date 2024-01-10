import React, { useState } from "react";
import { WpOptions, WpPage } from "~/types/wp";
import { VideoLoadedContext } from "~/utils/context";
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
	const [videoLoaded, setVideoLoaded] = useState(false);

	return (
		<PasswordProtect password={page?.post_password}>
			<VideoLoadedContext.Provider value={{ videoLoaded, setVideoLoaded }}>
				<Seo page={data?.page} />
				<Header {...options} pageOptions={page?.page_options} pagePostType={page?.post_type} />
				<main>{children}</main>
				{!page?.page_options?.remove_cta && <CTA pageOptions={page?.page_options} />}
				{!page?.page_options?.remove_footer && <Footer {...options} pageOptions={page?.page_options} />}
				<WpHotkey id={page?.ID} />
			</VideoLoadedContext.Provider>
		</PasswordProtect>
	);
}

export default Layout;
