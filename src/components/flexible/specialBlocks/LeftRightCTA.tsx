import { useEffect, useState } from "react";
import WpImage from "~/components/elements/WpImage";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { TextLink } from "~/components/elements/buttons/Button";
import Link from "next/link";
import { useWindowSize } from "react-use";

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

	const { width: windowWidth } = useWindowSize();

	useEffect(() => {
		const isMobile = windowWidth <= 890;
		let intervalId;

		if (isMobile) {
			intervalId = setInterval(() => {
				setActiveSide((prevSide) => (prevSide === "left" ? "right" : "left"));
			}, 6000);
		}

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [windowWidth]);

	return (
		<div className="relative flex flex-col gap-y-12 bg-boost pt-20 sm:gap-y-20 md-large:min-h-[900px] md-large:flex-row md-large:py-0">
			<motion.div style={{ transform: yTemplate }} className="absolute inset-0 z-[0] bg-cobalt" />

			<div className="absolute inset-0 z-[20] flex w-full">
				<div onMouseEnter={() => setActiveSide("left")} className="flex-1 " />
				<div onMouseEnter={() => setActiveSide("right")} className="flex-1 " />
			</div>
			<div className="pointer-events-none inset-0 z-[20] hidden w-full items-end md-large:absolute md-large:flex md-large:pb-[146px]">
				<div className="container !w-full">
					<div className="mx-auto w-full max-w-[1146px]">
						<div className="t-18 flex w-full items-end justify-between font-heading font-black uppercase text-white">
							<Link href="/for-creators">
								<TextLink
									className="!pointer-events-auto"
									isParentHovered={activeSide === "left"}
									underlineColour="white"
								>{`Fo<pst-pil>r</> Creat<pst-pil>o</>rs`}</TextLink>
							</Link>
							<Link href="/for-talent-managers">
								<TextLink
									className="!pointer-events-auto"
									isParentHovered={activeSide === "right"}
									underlineColour="white"
								>{`F<pst-rec>o</>r Talent Mana<pst-rec>g</>ers`}</TextLink>
							</Link>
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
			<div className="pointer-events-none inset-0 z-[20] mx-auto flex w-full justify-center gap-[30px] md-large:hidden md-large:pb-[146px]">
				<div className="container !w-full">
					<div className="mx-auto w-full max-w-[1146px]">
						<div className="t-18 flex w-full items-end justify-center gap-[30px] font-heading font-black uppercase text-white">
							<TextLink
								className="!pointer-events-auto"
								isParentHovered={activeSide === "left"}
								underlineColour="white"
							>{`Fo<pst-pil>r</> Creat<pst-pil>o</>rs`}</TextLink>
							<TextLink
								isParentHovered={activeSide === "right"}
								className="!pointer-events-auto"
								underlineColour="white"
							>{`F<pst-rec>o</>r Talent Mana<pst-rec>g</>ers`}</TextLink>
						</div>
					</div>
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
						className="absolute inset-0 z-[10] mx-auto mt-auto flex  max-w-[15em] translate-y-[30%] items-end sm:translate-y-0 md-large:max-w-[494px]"
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
						className="absolute inset-0 z-[10] mx-auto mt-auto  flex max-w-[70%] translate-y-[10%] items-end xss:max-w-[65%] xs:max-w-[50%] sm:max-w-[35%] md:translate-y-0 md-large:max-w-[629px]"
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
		<motion.h2 className={`t-144-large pointer-events-none w-full  max-w-[1000px] font-heading uppercase ${className}`}>
			<div className="flex justify-center gap-[0.1em] md-large:gap-[10rem] ">
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
			<span className="relative z-[20] block">
				<FontSwitcher text={bottom_line} />
			</span>
		</motion.h2>
	);
};
