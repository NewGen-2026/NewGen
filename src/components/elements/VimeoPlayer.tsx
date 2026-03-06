import Vimeo from "@u-wave/react-vimeo";
import React, { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import WpImage from "./WpImage";

interface VimeoPlayerProps {
	vimeo_id: string;
	poster_image?: any;
}

const VimeoPlayer = ({ vimeo_id, poster_image }: VimeoPlayerProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const playerRef = useRef<any>(null); // Store Vimeo player instance
	const isInView = useInView(containerRef, { once: true, amount: 0.3 });

	const [shouldLoad, setShouldLoad] = useState(false);
	const [isMuted, setIsMuted] = useState(true);
	const [isReady, setIsReady] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		if (isInView) {
			setShouldLoad(true);
		}
	}, [isInView]);

	// Handle mute/unmute through Vimeo Player API
	const handleToggleMute = async (e: React.MouseEvent) => {
		e.stopPropagation();

		if (!playerRef.current) return;

		try {
			if (isMuted) {
				// Unmute: set volume to 1 (100%)
				await playerRef.current.setVolume(1);
				setIsMuted(false);
			} else {
				// Mute: set volume to 0
				await playerRef.current.setVolume(0);
				setIsMuted(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (!vimeo_id || vimeo_id === "undefined") {
		return null;
	}

	return (
		<div ref={containerRef} className="group relative block aspect-[1376/774] w-full overflow-hidden bg-transparent">
			{/* Poster */}
			{poster_image && (
				<WpImage
					priority={false}
					quality={90}
					image={poster_image}
					className={`absolute inset-0 z-[5] h-full w-full object-cover transition-opacity duration-700 ${isReady ? "opacity-0" : "opacity-100"}`}
				/>
			)}

			{/* Mute/Unmute Button */}
			{isPlaying && (
				<button
					type="button"
					onClick={handleToggleMute}
					className="absolute right-4 top-4 z-20 cursor-pointer rounded-full bg-black/60 p-3 opacity-0 backdrop-blur-sm transition-all hover:bg-black/80 group-hover:opacity-100"
					aria-label={isMuted ? "Unmute video" : "Mute video"}
				>
					{isMuted ? (
						<svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
							/>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
						</svg>
					) : (
						<svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
							/>
						</svg>
					)}
				</button>
			)}

			{/* Error State */}
			{hasError && (
				<div className="absolute inset-0 z-20 flex items-center justify-center bg-black text-white">
					<p>Video unavailable</p>
				</div>
			)}

			{/* Vimeo Player */}
			{shouldLoad && !hasError && (
				<div className={`absolute inset-0 transition-opacity duration-700 ${isReady ? "opacity-100" : "opacity-0"}`}>
					<Vimeo
						video={vimeo_id}
						className="h-full w-full"
						responsive
						autoplay
						muted // Always start muted for autoplay to work
						loop
						background
						controls={false}
						showTitle={false}
						showByline={false}
						playsInline
						volume={0} // Start with volume at 0
						onReady={(player) => {
							playerRef.current = player; // Store player instance
							setIsReady(true);

							// Ensure it starts muted
							player.setVolume(0);
						}}
						onPlay={() => setIsPlaying(true)}
						onPause={() => setIsPlaying(false)}
						onError={(error) => {
							setHasError(true);
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default VimeoPlayer;
