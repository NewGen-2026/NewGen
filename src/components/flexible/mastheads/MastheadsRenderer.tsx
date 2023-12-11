import React from "react";
import LoaderMasthead from "./LoaderMasthead";
import ConnectingMasthead from "./ConnectingMasthead";
import SliderMasthead from "./SliderMasthead";
import TextOverlayMasthead from "./TextOverlayMasthead";

const MASTHEADS_COMPONENT_MAP = {
	loader_masthead: LoaderMasthead,
	connecting_masthead: ConnectingMasthead,
	slider_masthead: SliderMasthead,
	text_overlay: TextOverlayMasthead,
};

const MastheadsRenderer = (props) => {
	const { mastheads, pageId } = props;

	return mastheads.map((layout, i) => {
		const Component = MASTHEADS_COMPONENT_MAP[layout.acf_fc_layout];
		return Component ? (
			<React.Fragment key={pageId + layout.acf_fc_layout + i}>
				<Component {...layout} />
			</React.Fragment>
		) : null;
	});
};

export default MastheadsRenderer;
