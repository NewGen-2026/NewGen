import React from "react";
import TestimonialSlider from "./TestimonialSlider";
import BigTitleSlider from "./BigTitleSlider";

const SLIDERS_COMPONENT_MAP = {
	testimonial_slider: TestimonialSlider,
	big_title_slider: BigTitleSlider,
};

const SlidersRenderer = (props) => {
	const { sliders, pageId } = props;

	return sliders.map((layout, i) => {
		const Component = SLIDERS_COMPONENT_MAP[layout.acf_fc_layout];
		return Component ? (
			<React.Fragment key={pageId + layout.acf_fc_layout + i}>
				<Component {...layout} />
			</React.Fragment>
		) : null;
	});
};

export default SlidersRenderer;
