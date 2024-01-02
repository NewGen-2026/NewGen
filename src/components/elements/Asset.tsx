import React from "react";
import dynamic from "next/dynamic";
import AnimationRenderer from "./animations/AnimationRenderer";
import VideoPlayer from "./VideoPlayer";
import WpImage from "./WpImage";

const VimeoPlayer = dynamic(() => import("./VimeoPlayer"), { ssr: false });

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
	onVideoLoad?: () => void;
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
	onVideoLoad,
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
		return video?.type === "vimeo" ? (
			<VimeoPlayer {...video} />
		) : (
			<VideoPlayer className={className} {...video} playOnHover={playOnHover} parentInView={parentInView} onVideoLoad={onVideoLoad} />
		);
	}

	if (type === "customAnimation") {
		return (
			<div className="h-full w-full">
				<AnimationRenderer {...custom_animation} />
			</div>
		);
	}

	return <div>Asset {type} not implemented yet</div>;
}

export default Asset;
