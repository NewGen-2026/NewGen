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
			className={`flex justify-between gap-6 gap-y-12 md:gap-12 ${options?.reverse_mobile ? "flex-col-reverse" : "flex-col"} ${
				options?.reverse ? "md-large:flex-row-reverse" : "md-large:flex-row"
			} ${options?.alignment === "start" ? "items-start" : "items-center"}`}
		>
			<div className={`w-auto md:max-w-[50%] ${options?.reverse ? "xl:mr-3" : ""}`}>
				<TextCard {...content?.text_card} loopHeading={media?.assets?.length > 0} className={`${options?.reverse ? "ml-auto" : "mr-auto"}`} breakpoint={890} />
			</div>
			{media?.assets?.length > 0 && options?.variant === "image-slider" ? (
				<div className="w-full max-w-[672px] md:flex-1">
					<TransitionSlider
						add_nav={media?.add_nav}
						intervalDuration={5000000}
						transitionColor="electric"
						transitionColors={media?.assets?.map((asset) => asset?.transition_color)}
						className={`relative w-full bg-stone/10 ${media?.aspect === "landscape" ? "aspect-[672/420]" : "aspect-[672/672]"}`}
					>
						{media?.assets && media?.assets?.map((asset, index) => <Asset key={`asset${index}`} {...asset} className="h-full w-full object-cover" />)}
					</TransitionSlider>
				</div>
			) : (
				<Asset
					{...media?.asset}
					className={clsx("w-full max-w-[672px] md:flex-1", media?.aspect === "landscape" ? "aspect-[672/420]" : "aspect-[672/672] object-cover object-center")}
				/>
			)}
		</div>
	);
};
export default TwoColTextAsset;
