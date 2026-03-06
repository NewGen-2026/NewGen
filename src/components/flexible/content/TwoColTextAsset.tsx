/* eslint-disable no-unsafe-optional-chaining */
import Asset from "~/components/elements/Asset";
import TextCard from "~/components/elements/text/TextCard";
import { useRef } from "react";
import clsx from "clsx";
import TransitionSlider from "../sliders/TransitionSlider";

const TwoColTextAsset = (props) => {
	const { content, media, options } = props;
	const ref = useRef(null);
	return (
		<div
			ref={ref}
			className={`
        flex gap-10 lg:gap-20
        ${options?.reverse_mobile ? "flex-col-reverse" : "flex-col"}
        ${options?.reverse ? "lg:flex-row-reverse" : "lg:flex-row"}
        ${options?.alignment === "start" ? "items-start" : "items-center"}
      `}
		>
			{/* TEXT COLUMN */}
			<div className="w-full lg:w-1/2">
				<TextCard {...content?.text_card} loopHeading={media?.assets?.length > 0} className={options?.reverse ? "ml-auto" : "mr-auto"} breakpoint={890} />
			</div>
			{/* MEDIA COLUMN */}
			{media?.assets?.length > 0 && options?.variant === "image-slider" ? (
				<div className="flex w-full items-center lg:w-1/2">
					<TransitionSlider
						add_nav={media?.add_nav}
						intervalDuration={5000000}
						transitionColor="electric"
						transitionColors={media?.assets?.map((asset) => asset?.transition_color)}
						className="relative aspect-[16/10] w-full"
					>
						{media?.assets?.map((asset, index) => <Asset key={`asset${index}`} {...asset} className="h-full w-full object-cover" />)}
					</TransitionSlider>
				</div>
			) : (
				<div className="flex w-full items-center lg:w-1/2">
					<Asset {...media?.asset} className="h-auto w-full object-cover" />
				</div>
			)}
		</div>
	);
};
export default TwoColTextAsset;
