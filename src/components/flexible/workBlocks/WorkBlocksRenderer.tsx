import React from "react";
import dynamic from "next/dynamic";
import WorkSlider from "./WorkSlider";
import WorkGrid from "./WorkGrid";

const AllWorkGrid = dynamic(() => import("./AllWorkGrid"), { ssr: false });

const WORK_BLOCKS_COMPONENT_MAP = {
	work_slider: WorkSlider,
	work_grid: WorkGrid,
	all_work_grid: AllWorkGrid,
};

const WorkBlocksRenderer = (props) => {
	const { work_blocks, pageId, static_posts } = props;

	return work_blocks.map((layout, i) => {
		const Component = WORK_BLOCKS_COMPONENT_MAP[layout.acf_fc_layout];
		return Component ? (
			<React.Fragment key={pageId + layout.acf_fc_layout + i}>
				<Component {...layout} static_posts={static_posts} />
			</React.Fragment>
		) : null;
	});
};

export default WorkBlocksRenderer;
