import React from "react";
import dynamic from "next/dynamic";
import AssetMarquee from "./AssetMarquee";
import IconBlockMarquee from "./IconBlockMarquee";

const FeedMarquee = dynamic(() => import("./FeedMarquee"), { ssr: false });
const CreatorMarquee = dynamic(() => import("./CreatorMarquee"), { ssr: false });

const MARQUEE_COMPONENT_MAP = {
	asset_marquee: AssetMarquee,
	feed_marquee: FeedMarquee,
	creator_marquee: CreatorMarquee,
	icon_block_marquee: IconBlockMarquee,
};

const MarqueesRenderer = (props) => {
	const { marquees, pageId } = props;

	return marquees.map((layout, i) => {
		const Component = MARQUEE_COMPONENT_MAP[layout.acf_fc_layout];
		return Component ? (
			<React.Fragment key={pageId + layout.acf_fc_layout + i}>
				<Component {...layout} />
			</React.Fragment>
		) : null;
	});
};

export default MarqueesRenderer;
