import React from "react";
import LegalLandingPage from "./LegalLandingPage";
import ErrorLandingPage from "./ErrorLandingPage";

const LANDING_PAGE_COMPONENT_MAP = {
	legal: LegalLandingPage,
	error_page: ErrorLandingPage,
};

const LandingPageRenderer = (props) => {
	const { landing_page, pageId, static_posts } = props;

	return landing_page.map((layout, i) => {
		const Component = LANDING_PAGE_COMPONENT_MAP[layout.acf_fc_layout];
		return Component ? (
			<React.Fragment key={pageId + layout.acf_fc_layout + i}>
				<Component {...layout} static_posts={static_posts} />
			</React.Fragment>
		) : null;
	});
};

export default LandingPageRenderer;
