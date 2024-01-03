import React from "react";
import dynamic from "next/dynamic";
import TextCard from "../elements/text/TextCard";
import Asset from "../elements/Asset";
import SpecialBlocksRenderer from "../flexible/specialBlocks/SpecialBlocksRenderer";
import MastheadsRenderer from "../flexible/mastheads/MastheadsRenderer";
import MarqueesRenderer from "../flexible/marquees/MarqueesRenderer";
import ContentRenderer from "../flexible/content/ContentRenderer";
import SlidersRenderer from "../flexible/sliders/SlidersRenderer";
import MediaRenderer from "../flexible/media/MediaRenderer";

const LandingPageRenderer = dynamic(() => import("../flexible/landingPages/LandingPageRenderer"), { ssr: false });
const WorkBlocksRenderer = dynamic(() => import("../flexible/workBlocks/WorkBlocksRenderer"), { ssr: false });

const COMPONENT_MAP = {
	text_card: (props) => <TextCard {...props.text_card} />,
	asset: Asset,
	special_blocks: SpecialBlocksRenderer,
	work_blocks: WorkBlocksRenderer,
	mastheads: MastheadsRenderer,
	marquees: MarqueesRenderer,
	sliders: SlidersRenderer,
	content: ContentRenderer,
	media: MediaRenderer,
	landing_page: LandingPageRenderer,
};

const ComponentRenderer = ({ components = [], pageId = null, static_posts }) => {
	return components.map((layout, i) => {
		const Component = COMPONENT_MAP[layout.acf_fc_layout];
		return Component ? (
			<React.Fragment key={pageId + layout.acf_fc_layout + i}>
				<Component {...layout} pageId={pageId + layout.acf_fc_layout} static_posts={static_posts} />
			</React.Fragment>
		) : null;
	});
};

export default ComponentRenderer;
