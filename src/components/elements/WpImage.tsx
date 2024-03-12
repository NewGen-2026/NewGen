/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import { useEffect, useRef } from "react";

interface WpImageProps {
	image: {
		src?: string;
		url?: string;
		width?: number;
		height?: number;
		alt?: string | any;
		title?: string;
	};
	fill?: boolean;
	className?: string;
	priority?: boolean;
	style?: any;
	pageId?: number;
	quality?: number;
	layout?: "fill" | "fixed" | "intrinsic" | "responsive";
	onLoadComplete?: () => void;
	removeFadeIn?: boolean;
}

function WpImage({ image, fill = false, className, pageId, onLoadComplete, removeFadeIn = false, ...props }: WpImageProps) {
	const imgRef = useRef(null) as any;
	const imageUrl = image?.src || image?.url;

	useEffect(() => {
		if (!imgRef.current) return;
		if (imgRef.current && imgRef.current.complete) {
			handleImageLoad();
		} else if (imgRef?.current) {
			imgRef.current.onload = () => {
				handleImageLoad();
			};
		}
	}, [imgRef.current]);

	const handleImageLoad = () => {
		if (!imgRef.current) return;

		imgRef.current.classList.remove("fade-in");
		if (onLoadComplete) {
			onLoadComplete();
		}
	};

	if (!image || !imageUrl) return null;

	if (fill) {
		return (
			<Image
				ref={imgRef}
				src={imageUrl}
				fill
				alt={image.alt || image.title}
				// sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				className={`${removeFadeIn ? "" : "fade-in "} opacity-100 transition-opacity duration-200 ${className}`}
				onLoad={handleImageLoad}
				{...props}
			/>
		);
	}
	return (
		<Image
			ref={imgRef}
			src={imageUrl}
			width={image.width}
			height={image.height}
			alt={image.alt || image.title}
			className={`${removeFadeIn ? "" : "fade-in "} opacity-100 transition-opacity duration-200  ${className}`}
			onLoad={handleImageLoad}
			{...props}
		/>
	);
}

export default WpImage;
