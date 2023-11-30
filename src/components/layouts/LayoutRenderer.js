import React from "react";
import { LandingPage } from "~/components/layouts/LandingPage";
import { Section } from "~/components/layouts/Section";

export function LayoutRenderer({ sections, ID }) {
	if (!sections) return null;

	return sections?.map((section, i) => (
		<React.Fragment key={`${ID + section.acf_fc_layout + i}`}>
			{section?.acf_fc_layout === "landing_page" && <LandingPage {...section} />}
			{section?.acf_fc_layout === "section" && <Section {...section} firstSection={i === 0} i={i} />}
		</React.Fragment>
	));
}

export default LayoutRenderer;
