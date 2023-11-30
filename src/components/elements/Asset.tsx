import React from "react";
// import dynamic from "next/dynamic";
import WpImage from "./WpImage";
import VideoPlayer from "./VideoPlayer";
import AnimationRenderer from "./animations/AnimationRenderer";
// import LottiePlayer from "./LottiePlayer";

// const LottiePlayer = dynamic(() => import("./LottiePlayer"), { ssr: false });

interface AssetProps {
	type?: "image" | "video" | "lottie" | "multiple" | "customAnimation";
	image?: any;
	video?: any;
	custom_animation?: any;
	className?: string;
	classes?: string;
	assets?: any;
	width?: string;
	height?: string;
	lottie?: any;
	lazyLottie?: boolean;
	loop_lottie?: boolean;
	variant?: string;
	hoverLottie?: any;
	hideLoading?: boolean;
	random?: boolean;
	hover?: boolean;
	alt?: string;
	multiple?: any;
	fill?: boolean;
	parentInView?: boolean;
	playOnHover?: boolean;
}

function Asset({
	type = "image",
	image,
	video,
	custom_animation,
	className,
	classes,
	assets,
	width,
	height,
	lottie,
	lazyLottie,
	loop_lottie,
	variant,
	hoverLottie,
	hideLoading,
	random,
	hover,
	alt,
	multiple,
	fill,
	parentInView,
	playOnHover,
	...other
}: AssetProps) {
	if (type === "image") {
		return <WpImage className={className} image={image} fill={fill} {...other} />;
	}
	if (type === "multiple") {
		return (
			<>
				{multiple.map((asset, i) => (
					<Asset {...asset} key={`${i}`} {...other} />
				))}
			</>
		);
	}

	if (type === "video") {
		return <VideoPlayer className={className} {...video} playOnHover={playOnHover} parentInView={parentInView} />;
	}

	if (type === "customAnimation") {
		return (
			<div className="w-full} h-full">
				<AnimationRenderer {...custom_animation} />
			</div>
		);
	}

	// if (type === "lottie") {
	// 	return (
	// 		<div className={`h-full w-full ${getAspectRatio(lottie?.aspect)} `}>
	// 			<LottiePlayer lottie={lottie} className={classes || className} loop_lottie={loop_lottie} />
	// 		</div>
	// 	);
	// }
	return <div>Asset {type} not implemented yet</div>;
}

export default Asset;

const getAspectRatio = (aspect) => {
	const sizes = {
		"615-625": "xl:aspect-[615/625] xl:min-h-[625px] ",
		"762-452": "xl:aspect-[762/452] xl:min-h-[500px] ",
		"398-544": "xl:aspect-[398/544] max-w-[500px] xl:min-h-[544px] ",
	};
	return sizes[aspect];
};
