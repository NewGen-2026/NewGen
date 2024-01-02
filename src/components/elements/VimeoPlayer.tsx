/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Vimeo from "@u-wave/react-vimeo";
import { useState } from "react";
import { motion } from "framer-motion";
import WpImage from "./WpImage";

const VimeoPlayer = (props) => {
	const [videoPlaying, setVideoPlaying] = useState(false);
	const { vimeo_id, poster_image } = props;
	return (
		<div className="relative block aspect-[1376/774] h-full w-full cursor-pointer" aria-label="Play video" onClick={() => setVideoPlaying(!videoPlaying)}>
			{poster_image && (
				<WpImage
					image={poster_image}
					className={`pointer-events-none absolute z-[5] h-full w-full object-cover transition-opacity duration-200 ${
						videoPlaying ? "!opacity-0" : "opacity-100"
					}`}
				/>
			)}
			<div
				className={`pointer-events-none absolute bottom-0 left-0 right-0 z-[10] h-[60%] bg-gradient-to-t from-black/50 to-black/0  transition-opacity duration-200 ${
					videoPlaying ? "opacity-0" : "opacity-100"
				}`}
			/>
			<motion.div
				className={`pointer-events-none absolute inset-0 z-[15] flex items-center justify-center transition-opacity duration-200 ${
					videoPlaying ? "opacity-0" : "opacity-100"
				}`}
			>
				<motion.svg
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					transition={{
						duration: 0.2,
						delay: 0.5,
					}}
					width="80"
					height="80"
					viewBox="0 0 80 80"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<motion.rect
						animate={{
							scale: videoPlaying ? 0 : 1,
						}}
						transition={{
							delay: videoPlaying ? 0.2 : 0,
							type: "spring",
							stiffness: 200,
							damping: 24,
						}}
						width="80"
						height="80"
						fill="#DBF2FF"
					/>
					<motion.path
						animate={{
							scale: videoPlaying ? 0 : 1,
						}}
						transition={{
							delay: videoPlaying ? 0 : 0.2,
						}}
						d="M51.4992 40.2516L31.6992 28.1016V52.4016L51.4992 40.2516Z"
						fill="#0047FF"
					/>
				</motion.svg>
			</motion.div>
			<Vimeo video={vimeo_id} className="vimeo-video pointer-events-none" responsive loop paused={!videoPlaying} controls={false} />
		</div>
	);
};
export default VimeoPlayer;
