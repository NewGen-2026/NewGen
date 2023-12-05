import React from "react";
import WorkSlider from "./WorkSlider";

const WORK_BLOCKS_COMPONENT_MAP = {
	work_slider: WorkSlider,
};

const WorkBlocksRenderer = (props) => {
	const { work_blocks, pageId } = props;

	return work_blocks.map((layout, i) => {
		const Component = WORK_BLOCKS_COMPONENT_MAP[layout.acf_fc_layout];
		return Component ? (
			<React.Fragment key={pageId + layout.acf_fc_layout + i}>
				<Component {...layout} />
			</React.Fragment>
		) : null;
	});
};

export default WorkBlocksRenderer;
