import { useState } from "react";
import { useWindowSize } from "react-use";
import SplitTextFontSwitcher from "~/components/elements/animations/helpers/SplitTextFontSwitcher";
import { motion } from "framer-motion";
import WpImage from "~/components/elements/WpImage";
import { getBgColorClasses } from "~/utils/getColors";

const variantThemeStyles = {
	talent: {
		imageClass: "max-w-[70%] md:max-w-[42.8%] tiny-laptop:max-w-[35%] translate-x-[-5%]  translate-y-[5%] md:translate-y-0",
	},
	creator: {
		imageClass: "max-w-[75%] sm:max-w-[50%] md:max-w-[35%] tiny-laptop:max-w-[27%] translate-y-[5%] md:translate-y-0",
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
						<h1 className="t-144-xlarge text-center font-black uppercase tiny-laptop:text-[8rem]">
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
								<SplitTextFontSwitcher delay={variant === "talent" ? 0.4 : 0.2} fontSwitchStartDelay={400} stagger={0.2} text={middle_line} reverse />
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
export default AssetAtBottomVariant;
