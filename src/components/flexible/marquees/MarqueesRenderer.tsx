import React from "react";
import AssetMarquee from "./AssetMarquee";
import FeedMarquee from "./FeedMarquee";
import CreatorMarquee from "./CreatorMarquee";
import IconBlockMarquee from "./IconBlockMarquee";

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
