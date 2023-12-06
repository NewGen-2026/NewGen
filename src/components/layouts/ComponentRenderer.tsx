import React from "react";
import TextCard from "../elements/text/TextCard";
import TestComponent from "../flexible/TestComponent";
import Asset from "../elements/Asset";
import SpecialBlocksRenderer from "../flexible/specialBlocks/SpecialBlocksRenderer";
import MastheadsRenderer from "../flexible/mastheads/MastheadsRenderer";
import MarqueesRenderer from "../flexible/marquees/MarqueesRenderer";
import WorkBlocksRenderer from "../flexible/workBlocks/WorkBlocksRenderer";
import ContentRenderer from "../flexible/content/ContentRenderer";

const COMPONENT_MAP = {
	test_component: TestComponent,
	text_card: (props) => <TextCard {...props.text_card} />,
	asset: Asset,
	special_blocks: SpecialBlocksRenderer,
	work_blocks: WorkBlocksRenderer,
	mastheads: MastheadsRenderer,
	marquees: MarqueesRenderer,
	content: ContentRenderer,
};

const ComponentRenderer = ({ components = [], pageId = null }) => {
	return components.map((layout, i) => {
		const Component = COMPONENT_MAP[layout.acf_fc_layout];
		return Component ? (
			<React.Fragment key={pageId + layout.acf_fc_layout + i}>
				<Component {...layout} pageId={pageId + layout.acf_fc_layout} />
			</React.Fragment>
		) : null;
	});
};

export default ComponentRenderer;
