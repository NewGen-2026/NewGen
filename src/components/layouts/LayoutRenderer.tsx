import React from "react";
import { SectionProps, WpPage } from "~/types/wp";
import LandingPage from "./LandingPage";
import Section from "./Section";

function LayoutRenderer({ sections, ID }: WpPage) {
	if (!sections) return null;

	return sections?.map((section, i) => (
		<React.Fragment key={`${ID + section.acf_fc_layout + i}`}>
			{section?.acf_fc_layout === "landing_page" && <LandingPage {...section} />}
			{section?.acf_fc_layout === "section" && <Section {...(section as SectionProps)} />}
		</React.Fragment>
	));
}

export default LayoutRenderer;
