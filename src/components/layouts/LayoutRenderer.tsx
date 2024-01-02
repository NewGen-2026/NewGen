import React from "react";
import { WpPage } from "~/types/wp";
import LandingPage from "./LandingPage";
import Section from "./Section";

const LAYOUT_COMPONENT_MAP = {
	landing_page: LandingPage,
	section: Section,
};

const LayoutRenderer = ({ sections, ID, static_posts }: WpPage) => {
	if (!sections) return null;

	return sections.map((section, i) => {
		const Component = LAYOUT_COMPONENT_MAP[section.acf_fc_layout];
		return Component ? (
			<React.Fragment key={`${ID + section.acf_fc_layout + i}`}>
				<Component pageId={ID} {...section} static_posts={static_posts} />
			</React.Fragment>
		) : null;
	});
};

export default LayoutRenderer;
