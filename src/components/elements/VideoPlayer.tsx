/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useInView } from "framer-motion";
import { memo, useEffect, useRef } from "react";

interface VideoPlayerProps {
	videoFile: any;
	className?: string;
	embed?: any;
	isEmbed?: boolean;
	playType?: "auto" | "click";
	parentInView?: boolean;
	playOnHover?: boolean;
}

function VideoPlayer({ videoFile, className = "", embed, isEmbed = false, playType, parentInView, playOnHover = false }: VideoPlayerProps) {
	const videoRef = useRef(null) as any;
	const inViewRef = useRef(null);

	const videoSrcRef = useRef("");

	const isInView = useInView(inViewRef, { once: false, amount: 0.2 });

	const inView = parentInView !== undefined ? parentInView : isInView;

	useEffect(() => {
		if (inView && videoSrcRef.current === "") {
			videoSrcRef.current = videoFile.url;
			videoRef.current.setAttribute("src", videoSrcRef.current);
			// videoRef.current.setAttribute("type", "video/mp4");
			videoRef.current?.load();
		}
	}, [inView, videoFile.url]);

	useEffect(() => {
		if (videoRef.current && videoSrcRef.current && !playOnHover) {
			if (isInView) {
				videoRef.current.play();
			} else {
				videoRef.current.pause();
			}
		}
	}, [videoSrcRef.current, isInView, playOnHover]);

	useEffect(() => {
		if (!videoRef.current) return;
		if (videoRef.current && videoRef.current.complete) {
			videoRef?.current?.classList?.remove("fade-in");
		} else if (videoRef?.current) {
			videoRef.current.onload = () => {
				videoRef?.current?.classList?.remove("fade-in");
			};
		}
	}, [videoRef.current]);

	const handleVideoLoad = () => {
		videoRef.current.classList.remove("fade-in");
	};

	const handleMouseEnter = () => {
		if (playOnHover) videoRef.current?.play();
	};

	const handleMouseLeave = () => {
		if (playOnHover) videoRef.current?.pause();
	};

	return (
		<div ref={inViewRef} className="relative h-full w-full will-change-[opacity]">
			{!isEmbed && (
				<video
					className={`fade-in h-full w-full object-cover opacity-100 transition-opacity duration-300  will-change-[opacity]  ${className}`}
					autoPlay={!playOnHover}
					loop
					muted
					playsInline
					controls={playType === "click"}
					ref={videoRef}
					width="100%"
					height="100%"
					onLoadedData={handleVideoLoad}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					{/* <source ref={sourceRef} type={videoFile?.mime_type} /> */}
					Your browser does not support the video tag.
				</video>
			)}
			{/* {video?.useMobileStaticAlt && <WpImage image={video?.mobileStaticAlt?.image?.asset} className="md:hidden" />} */}
			{isEmbed && <div className="h-full w-full" dangerouslySetInnerHTML={{ __html: embed }} />}
		</div>
	);
}
export default memo(VideoPlayer);
