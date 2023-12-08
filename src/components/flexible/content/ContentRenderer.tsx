import React from "react";
import TwoColTextAsset from "./TwoColTextAsset";
import FadeGrid from "./FadeGrid";
import RotatingHeading from "./RotatingHeading";
import LinkGrid from "./LinkGrid";

const CONTENT_BLOCKS_COMPONENT_MAP = {
	two_col_text_asset: TwoColTextAsset,
	fade_grid: FadeGrid,
	rotating_heading: RotatingHeading,
	link_grid: LinkGrid,
};

const ContentRenderer = (props) => {
	const { content, pageId } = props;

	return content.map((layout, i) => {
		const Component = CONTENT_BLOCKS_COMPONENT_MAP[layout.acf_fc_layout];
		return Component ? (
			<React.Fragment key={pageId + layout.acf_fc_layout + i}>
				<Component {...layout} />
			</React.Fragment>
		) : null;
	});
};

export default ContentRenderer;
