import React from "react";
import ServicesOverview from "./ServicesOverview";
import LeftRightCTA from "./LeftRightCTA";
import AllTeam from "./AllTeam";
import TimelineScroller from "./TimelineScroller";
import FloatingImagesCta from "./FloatingImagesCta";

const SPECIAL_BLOCKS_COMPONENT_MAP = {
	services_overview: ServicesOverview,
	creatorstalent_cta: LeftRightCTA,
	all_team: AllTeam,
	timeline_scroller: TimelineScroller,
	floating_images_cta: FloatingImagesCta,
};

const SpecialBlocksRenderer = (props) => {
	const { special_blocks, pageId } = props;

	return special_blocks.map((layout, i) => {
		const Component = SPECIAL_BLOCKS_COMPONENT_MAP[layout.acf_fc_layout];
		return Component ? (
			<React.Fragment key={pageId + layout.acf_fc_layout + i}>
				<Component {...layout} />
			</React.Fragment>
		) : null;
	});
};

export default SpecialBlocksRenderer;
