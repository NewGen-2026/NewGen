import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { getBgColorClasses } from "~/utils/getColors";
import { motion } from "framer-motion";
import { useState } from "react";
import { useWindowSize } from "react-use";

const SplitTextFontSwitcher = ({ text, delay = 0, stagger = 0.1, reverse = false, fontSwitchStartDelay = 1500 }) => {
	const words = text.split(" ");
	const totalWords = words.length;

	return words.map((word, index) => {
		const delayIndex = reverse ? totalWords - 1 - index : index;

		return (
			<motion.span
				key={word + index}
				initial={{
					y: "0.2em",
					opacity: 0,
				}}
				animate={{
					y: 0,
					opacity: 1,
				}}
				transition={{
					delay: delay + delayIndex * stagger + 0.2,
					type: "tween",
					duration: 0.1,
					opacity: {
						duration: 0.05,
						delay: delay + delayIndex * stagger + 0.2,
					},
				}}
				style={{ marginRight: index < totalWords - 1 ? "0.1em" : "0" }}
				className="inline-block will-change-transform"
			>
				<FontSwitcher startDelay={fontSwitchStartDelay} text={word + (index < totalWords - 1 ? " " : "")} />
			</motion.span>
		);
	});
};
const variantThemeStyles = {
	talent: {
		imageClass: "max-w-[42.8%] translate-x-[-5%]",
	},
	creator: {
		imageClass: "max-w-[35%]",
	},
};

const AssetAtBottomVariant = (props) => {
	const { background_color, top_line_left, top_line_right, middle_line, bottom_line, image, variant } = props;

	const [imageLoaded, setImageLoaded] = useState(false);

	const { width: windowWidth } = useWindowSize();

	const breakpointCrossed = windowWidth < 768;

	const textXDistanceLeft = breakpointCrossed ? 0 : "0.45em";
	const textXDistanceRight = breakpointCrossed ? 0 : "-0.45em";

	return (
		<div className={`relative flex flex-col justify-center gap-y-8 pt-24 md:flex-row md:items-end md:pt-28 ${getBgColorClasses(background_color)}`}>
			<div className="mx-auto w-full max-w-[1440px]">
				<div className="inset-0 flex items-center md:absolute">
					<div className="container md:pt-20">
						<h1 className="t-144 text-center font-black uppercase">
							<div className="relative z-0 flex justify-center gap-[0.1em] md:gap-[1em]">
								<motion.span
									initial={{
										x: textXDistanceLeft,
									}}
									animate={{
										x: imageLoaded ? 0 : textXDistanceLeft,
									}}
									transition={{
										delay: 1.1,
									}}
									className="inline-block min-h-[0.5em]"
								>
									<SplitTextFontSwitcher delay={0.3} fontSwitchStartDelay={600} text={top_line_left} />
								</motion.span>
								<motion.span
									initial={{
										x: textXDistanceRight,
									}}
									animate={{
										x: imageLoaded ? 0 : textXDistanceRight,
									}}
									transition={{
										delay: 1.1,
									}}
									className="inline-block"
								>
									<SplitTextFontSwitcher delay={0.5} text={top_line_right} />
								</motion.span>
							</div>
							<span className="relative z-10 block">
								<SplitTextFontSwitcher delay={variant === "talent" ? 0.4 : 0.2} stagger={0.2} text={middle_line} reverse />
							</span>
							<span className="relative z-10 block">
								<SplitTextFontSwitcher delay={0.6} fontSwitchStartDelay={700} text={bottom_line} />
							</span>
						</h1>
					</div>
				</div>

				<motion.div
					initial={{
						opacity: 0,
						y: 50,
					}}
					animate={{
						opacity: imageLoaded ? 1 : 0,
						y: imageLoaded ? 5 : 50,
					}}
					transition={{
						opacity: {
							duration: 0.3,
							delay: 1.3,
						},
						delay: 1.3,
						type: "spring",
						damping: 20,
						stiffness: 200,
					}}
					className="relative z-[5] flex w-full justify-center"
				>
					<WpImage
						image={image}
						priority
						onLoadComplete={() => {
							setImageLoaded(true);
						}}
						className={`mx-auto ${variantThemeStyles[variant]?.imageClass}`}
					/>
				</motion.div>
			</div>
		</div>
	);
};

const TextOnTopVariant = (props) => {
	const { top_line, middle_line, bottom_line, image, variant } = props;

	const [imageLoaded, setImageLoaded] = useState(false);

	return (
		<div className="pt-6 md:pt-0">
			<h1 className="t-144 text-center font-black uppercase !leading-[0.8]">
				<span className="relative z-10 block translate-x-[-12%]">
					<FontSwitcher startDelay={600} text={top_line} />
				</span>

				<span className="relative z-10 block translate-x-[14%]">
					<FontSwitcher text={middle_line} />
				</span>
				<span className="relative z-10 block translate-x-[-1%]">
					<FontSwitcher startDelay={700} text={bottom_line} />
				</span>
			</h1>

			<div className="-mt-3 bg-stone/10 md:-mt-[4.5rem]">
				<WpImage
					image={image}
					priority
					onLoadComplete={() => {
						setImageLoaded(true);
					}}
					className={`mx-auto ${variantThemeStyles[variant]?.imageClass}`}
				/>
			</div>
		</div>
	);
};

const AssetInCenterVariant = (props) => {
	const { top_line_left, top_line_right, middle_line_left, middle_line_right, second_middle_line, bottom_line, content, image } = props;

	const [imageLoaded, setImageLoaded] = useState(false);

	const { width: windowWidth } = useWindowSize();

	const breakpointCrossed = windowWidth < 768;

	const textXDistanceLeftTop = breakpointCrossed ? 0 : "0.5em";
	const textXDistanceRightTop = breakpointCrossed ? 0 : "-0.5em";

	const textXDistanceLeftMiddle = breakpointCrossed ? 0 : "0.9em";
	const textXDistanceRightMiddle = breakpointCrossed ? 0 : "-0.9em";

	return (
		<div className="relative flex flex-col pt-24 md:min-h-[800px] md:pb-32 md:pt-[300px]">
			<h1 className="t-120 text-center font-black uppercase !leading-[0.9]">
				<div className="relative z-0 flex  justify-center gap-[0.02em] md:gap-[1em]">
					<motion.span
						initial={{
							x: textXDistanceLeftTop,
						}}
						animate={{
							x: imageLoaded ? 0 : textXDistanceLeftTop,
						}}
						transition={{
							delay: 0.4,
						}}
						className="inline-block"
					>
						<FontSwitcher startDelay={600} text={top_line_left} />
					</motion.span>
					<motion.span
						initial={{
							x: textXDistanceRightTop,
						}}
						animate={{
							x: imageLoaded ? 0 : textXDistanceRightTop,
						}}
						transition={{
							delay: 0.4,
						}}
						className="inline-block"
					>
						<FontSwitcher text={top_line_right} />
					</motion.span>
				</div>
				<div className="relative  flex justify-center gap-[0.02em] md:gap-[1.8em]">
					<motion.span
						initial={{
							x: textXDistanceLeftMiddle,
						}}
						animate={{
							x: imageLoaded ? 0 : textXDistanceLeftMiddle,
						}}
						transition={{
							delay: 0.4,
						}}
						className="inline-block"
					>
						<FontSwitcher startDelay={600} text={middle_line_left} />
					</motion.span>
					<motion.span
						initial={{
							x: textXDistanceRightMiddle,
						}}
						animate={{
							x: imageLoaded ? 0 : textXDistanceRightMiddle,
						}}
						transition={{
							delay: 0.4,
						}}
						className="relative z-10 inline-block"
					>
						<FontSwitcher text={middle_line_right} />
					</motion.span>
				</div>
				<span className="relative z-10 block ">
					<FontSwitcher startDelay={700} text={second_middle_line} />
				</span>
				<span className="relative z-0 block ">
					<FontSwitcher startDelay={700} text={bottom_line} />
				</span>
			</h1>

			<p className="t-20 mx-auto mt-7 max-w-[750px] text-center font-medium text-electric opacity-80 md:mt-14">{content}</p>

			<motion.div
				initial={{
					opacity: 0,
					y: 50,
				}}
				animate={{
					opacity: imageLoaded ? 1 : 0,
					y: imageLoaded ? 0 : 50,
				}}
				transition={{
					opacity: {
						duration: 0.3,
						delay: 0.6,
					},
					delay: 0.6,
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

const variantComponents = {
	about: TextOnTopVariant,
	work: AssetInCenterVariant,
};

const getVariantComponent = (variant, props) => {
	const Component = variantComponents[variant] || AssetAtBottomVariant;
	return <Component {...props} variant={variant} />;
};

const TextOverlayMasthead = (props) => {
	const { variant = "creator" } = props;
	return getVariantComponent(variant, props);
};
export default TextOverlayMasthead;
