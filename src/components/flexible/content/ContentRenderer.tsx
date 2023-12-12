import React from "react";
import TwoColTextAsset from "./TwoColTextAsset";
import FadeGrid from "./FadeGrid";
import RotatingHeading from "./RotatingHeading";
import LinkGrid from "./LinkGrid";
import StatAssetRow from "./StatAssetRow";
import HoverRevealIconGrid from "./HoverRevealIconGrid";
import RosterGrid from "./RosterGrid";
import AllCreatorsList from "./AllCreatorsList";
import TwoColStatContent from "./TwoColStatContent";
import FillScreenTextBlock from "./FillScreenTextBlock";

const CONTENT_BLOCKS_COMPONENT_MAP = {
	two_col_text_asset: TwoColTextAsset,
	fade_grid: FadeGrid,
	rotating_heading: RotatingHeading,
	link_grid: LinkGrid,
	statasset_row: StatAssetRow,
	hover_reveal_icon_grid: HoverRevealIconGrid,
	roster_grid: RosterGrid,
	all_creators_list: AllCreatorsList,
	two_col_stat_content: TwoColStatContent,
	fill_screen_text_block: FillScreenTextBlock,
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
