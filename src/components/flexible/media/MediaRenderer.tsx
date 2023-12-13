import React from "react";
import LogoGrid from "./LogoGrid";
import DualAsset from "./DualAsset";

const MEDIA_BLOCKS_COMPONENT_MAP = {
	logo_grid: LogoGrid,
	dual_asset: DualAsset,
};

const MediaRenderer = (props) => {
	const { media, pageId } = props;

	return media.map((layout, i) => {
		const Component = MEDIA_BLOCKS_COMPONENT_MAP[layout.acf_fc_layout];
		return Component ? (
			<React.Fragment key={pageId + layout.acf_fc_layout + i}>
				<Component {...layout} />
			</React.Fragment>
		) : null;
	});
};

export default MediaRenderer;
