import { useState } from "react";
import WpImage from "~/components/elements/WpImage";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { TextLink } from "~/components/elements/buttons/Button";

const LeftRightCTA = (props) => {
	const [activeSide, setActiveSide] = useState("left");

	const { left, right } = props;

	const yMotionValue = useMotionValue(100);
	const yMotionValueSpring = useSpring(yMotionValue, {
		stiffness: 200,
		damping: 18,
		mass: 0.4,
	});

	if (activeSide === "right") {
		yMotionValue.set(0);
	} else {
		yMotionValue.set(100);
	}

	const yTemplate = useMotionTemplate`translateX(${yMotionValueSpring}%)`;

	return (
		<div className="relative flex flex-col gap-y-12 bg-boost pt-20 sm:gap-y-20 md-large:min-h-[900px] md-large:flex-row md-large:py-0">
			<motion.div style={{ transform: yTemplate }} className="absolute inset-0 z-[0] bg-cobalt" />

			<div className="absolute inset-0 z-[20] flex w-full">
				<div onMouseEnter={() => setActiveSide("left")} className="flex-1 " />
				<div onMouseEnter={() => setActiveSide("right")} className="flex-1 " />
			</div>
			<div className="pointer-events-none inset-0 z-[20] flex w-full items-end md-large:absolute md-large:pb-[146px]">
				<div className="container !w-full">
					<div className="mx-auto w-full max-w-[1146px]">
						<div className="t-18 flex w-full items-end justify-between font-heading font-black uppercase text-white">
							<TextLink className="!pointer-events-auto" underlineColour="white">{`Fo<pst-pil>r</> Creat<pst-pil>o</>rs`}</TextLink>
							<TextLink className="!pointer-events-auto" underlineColour="white">{`F<pst-rec>o</>r Talent Mana<pst-rec>g</>ers`}</TextLink>
						</div>
					</div>
				</div>
			</div>
			<div className="flex w-full items-center justify-center text-center">
				<div className="container">
					<AnimatePresence mode="wait">
						{activeSide === "left" ? (
							<TextContainer key="textLeft" className="!text-energy" {...left} />
						) : (
							<TextContainer className="!text-electric" key="textRight" {...right} />
						)}
					</AnimatePresence>
				</div>
			</div>

			<div className="inset-0 flex min-h-[300px] w-full items-end justify-center sm:min-h-[400px] md-large:absolute">
				<div className="relative flex h-full min-h-[300px] w-full justify-center md-large:items-end ">
					<motion.div
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: activeSide === "left" ? 1 : 0,
						}}
						className="absolute inset-0 z-[10] mx-auto mt-auto  flex max-w-[45%] items-end xs:max-w-[35%] md-large:max-w-[494px]"
					>
						<WpImage image={left?.left_image} />
					</motion.div>
					<motion.div
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: activeSide === "right" ? 1 : 0,
						}}
						className="absolute inset-0 z-[10] mx-auto mt-auto  flex max-w-[55%] items-end xs:max-w-[45%] md-large:max-w-[629px]"
					>
						<WpImage image={right?.right_image} />
					</motion.div>
				</div>
			</div>
		</div>
	);
};
export default LeftRightCTA;

const TextContainer = ({ top_line_left, top_line_right, middle_line, bottom_line, className = "" }) => {
	return (
		<motion.h2 className={`t-144 pointer-events-none w-full  max-w-[1000px] font-heading uppercase ${className}`}>
			<div className="flex justify-center gap-[0.1em] md-large:gap-[10rem]">
				<span className="relative z-[0] inline-flex whitespace-nowrap">
					<FontSwitcher text={top_line_left} />
				</span>
				<span className="relative z-[0] inline-flex whitespace-nowrap">
					{" "}
					<FontSwitcher text={top_line_right} />
				</span>
			</div>
			<span className="relative z-[20]">
				{" "}
				<FontSwitcher text={middle_line} />{" "}
			</span>
			<span className="relative z-[20] ">
				<FontSwitcher text={bottom_line} />
			</span>
		</motion.h2>
	);
};
