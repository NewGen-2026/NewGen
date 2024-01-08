import React from "react";
import dynamic from "next/dynamic";
import TestimonialSlider from "./TestimonialSlider";
import BigTitleSlider from "./BigTitleSlider";
import DualAssetSlider from "./DualAssetSlider";
import AssetSlider from "./AssetSlider";
import LinkSlider from "./LinkSlider";

const TwoColTestimonialSlider = dynamic(() => import("./TwoColTestimonialSlider"), { ssr: false });

const SLIDERS_COMPONENT_MAP = {
	testimonial_slider: TestimonialSlider,
	big_title_slider: BigTitleSlider,
	dual_asset_slider: DualAssetSlider,
	asset_slider: AssetSlider,
	link_slider: LinkSlider,
	two_col_testimonial_slider: TwoColTestimonialSlider,
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
