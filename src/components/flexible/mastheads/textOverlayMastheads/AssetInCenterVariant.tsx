import { useState } from "react";
import { useWindowSize } from "react-use";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { motion } from "framer-motion";
import WpImage from "~/components/elements/WpImage";
import SplitTextFontSwitcher from "~/components/elements/animations/helpers/SplitTextFontSwitcher";

const AssetInCenterVariant = (props) => {
	const { top_line_left, top_line_right, middle_line_left, middle_line_right, second_middle_line, bottom_line, content, image } = props;

	const [imageLoaded, setImageLoaded] = useState(false);

	const { width: windowWidth } = useWindowSize();

	const breakpointCrossed = windowWidth < 768;

	const textXDistanceLeftTop = breakpointCrossed ? 0 : "0.5em";
	const textXDistanceRightTop = breakpointCrossed ? 0 : "-0.5em";

	const textXDistanceLeftMiddle = breakpointCrossed ? 0 : "0.8em";
	const textXDistanceRightMiddle = breakpointCrossed ? 0 : "-0.8em";

	const imagePopDelay = 2;

	return (
		<div className="relative flex flex-col pt-24 md:min-h-[800px] md:pb-32 md:pt-[300px]">
			<h1 className="t-120 text-center font-black uppercase !leading-[0.9] xl:min-h-[432px]">
				<motion.div
					initial={{
						y: "0.2em",
						opacity: 0,
					}}
					animate={{
						y: 0,
						opacity: 1,
					}}
					transition={{
						delay: 0.2,
						type: "tween",
						duration: 0.1,
						opacity: {
							duration: 0.05,
							delay: 0.2,
						},
					}}
					className="relative z-0 flex  justify-center gap-[0.02em] md:gap-[1em]"
				>
					<motion.span
						initial={{
							transform: `translateX(${textXDistanceLeftTop})`,
						}}
						animate={{
							transform: imageLoaded ? `translateX(0em)` : `translateX(${textXDistanceLeftTop})`,
						}}
						transition={{
							delay: imagePopDelay,
						}}
						className="inline-block"
					>
						<FontSwitcher startDelay={600} text={top_line_left} />
					</motion.span>
					<motion.span
						initial={{
							transform: `translateX(${textXDistanceRightTop})`,
						}}
						animate={{
							transform: imageLoaded ? `translateX(0em)` : `translateX(${textXDistanceRightTop})`,
						}}
						transition={{
							delay: imagePopDelay,
						}}
						className="inline-block"
					>
						<FontSwitcher text={top_line_right} />
					</motion.span>
				</motion.div>
				<motion.div
					initial={{
						transform: "translateY(-0.2em)",
						opacity: 0,
					}}
					animate={{
						transform: "translateY(0em)",
						opacity: 1,
					}}
					transition={{
						delay: 0.8,
						type: "tween",
						duration: 0.1,
						opacity: {
							duration: 0.05,
							delay: 0.8,
						},
					}}
					className="relative  flex justify-center gap-[0.02em] md:gap-[1.8em]"
				>
					<motion.span
						initial={{
							transform: `translateX(${textXDistanceLeftMiddle})`,
						}}
						animate={{
							transform: imageLoaded ? `translateX(0em)` : `translateX(${textXDistanceLeftMiddle})`,
						}}
						transition={{
							delay: imagePopDelay,
						}}
						className="inline-block pr-2 md:pr-0"
					>
						<FontSwitcher startDelay={600} text={middle_line_left} />
					</motion.span>
					<motion.span
						initial={{
							transform: `translateX(${textXDistanceRightMiddle})`,
						}}
						animate={{
							transform: imageLoaded ? `translateX(0em)` : `translateX(${textXDistanceRightMiddle})`,
						}}
						transition={{
							delay: imagePopDelay,
						}}
						className="relative z-10 inline-block"
					>
						<FontSwitcher text={middle_line_right} />
					</motion.span>
				</motion.div>
				<span className="relative z-10 block ">
					<SplitTextFontSwitcher delay={0.2} fontSwitchStartDelay={700} text={second_middle_line} direction="up" />
				</span>
				<span className="relative z-0 block ">
					<SplitTextFontSwitcher delay={0.8} stagger={0.1} fontSwitchStartDelay={700} text={bottom_line} direction="down" />
				</span>
			</h1>

			<p className="t-20 mx-auto mt-7 max-w-[750px] text-center font-medium text-cobalt opacity-80 md:mt-14">{content}</p>

			<motion.div
				initial={{
					opacity: 0,
					transform: "translateY(50px)",
				}}
				animate={{
					opacity: imageLoaded ? 1 : 0,
					transform: imageLoaded ? "translateY(0px)" : "translateY(50px)",
				}}
				transition={{
					opacity: {
						duration: 0.3,
						delay: imagePopDelay,
					},
					delay: imagePopDelay,
					type: "spring",
					damping: 22,
					stiffness: 200,
				}}
				className="inset-0 z-[5] mt-7 flex w-full items-center justify-center md:absolute md:mt-0"
			>
				<div className="w-full max-w-[75%] translate-y-[5%] md:max-w-[35.11%] md:translate-x-[2%] md:translate-y-[-18%]">
					<WpImage
						image={image}
						onLoadComplete={() => {
							setImageLoaded(true);
						}}
						priority
						className="mx-auto w-full  object-contain"
					/>
				</div>
			</motion.div>
		</div>
	);
};

export default AssetInCenterVariant;
