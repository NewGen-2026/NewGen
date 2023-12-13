import React from "react";
import LogoGrid from "./LogoGrid";

const MEDIA_BLOCKS_COMPONENT_MAP = {
	logo_grid: LogoGrid,
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
