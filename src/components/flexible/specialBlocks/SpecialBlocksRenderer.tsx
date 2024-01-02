import React from "react";
import dynamic from "next/dynamic";
import ServicesOverview from "./ServicesOverview";
import LeftRightCTA from "./LeftRightCTA";
import AllTeam from "./AllTeam";
import TimelineScroller from "./TimelineScroller";
import FloatingImagesCta from "./FloatingImagesCta";
import HijackScroller from "./HijackScroller";
import Offices from "./Offices";
import Jobs from "./Jobs";
import ContactForm from "./ContactForm";

const FeedListFlexible = dynamic(() => import("./FeedListFlexible"), { ssr: false });

const SPECIAL_BLOCKS_COMPONENT_MAP = {
	services_overview: ServicesOverview,
	creatorstalent_cta: LeftRightCTA,
	all_team: AllTeam,
	timeline_scroller: TimelineScroller,
	floating_images_cta: FloatingImagesCta,
	hijack_scroller: HijackScroller,
	offices: Offices,
	jobs: Jobs,
	contact_form: ContactForm,
	feed_list: FeedListFlexible,
};

const SpecialBlocksRenderer = (props) => {
	const { special_blocks, pageId, static_posts } = props;

	return special_blocks.map((layout, i) => {
		const Component = SPECIAL_BLOCKS_COMPONENT_MAP[layout.acf_fc_layout];
		return Component ? (
			<React.Fragment key={pageId + layout.acf_fc_layout + i}>
				<Component {...layout} static_posts={static_posts} />
			</React.Fragment>
		) : null;
	});
};

export default SpecialBlocksRenderer;
