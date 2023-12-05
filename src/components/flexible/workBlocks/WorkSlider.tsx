/* eslint-disable no-unsafe-optional-chaining */
import { useMotionTemplate, useMotionValueEvent, useScroll, motion, useSpring, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { useMeasure, useWindowSize } from "react-use";
import WpImage from "~/components/elements/WpImage";
import { Button } from "~/components/elements/buttons/Button";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";
import { getBgColorClasses } from "~/utils/getColors";

const WorkSlider = (props) => {
	const scrollRef = useRef(null);
	const breakpointCrossed = useBreakpointCrossed(768);

	const { work_slides } = props;

	const { scrollYProgress } = useScroll({
		target: scrollRef,

		offset: ["start -0.2", "end end"],
	});

	const leftMotionValue = useMotionValue(0);
	const leftMotionValueSpring = useSpring(leftMotionValue, { stiffness: 200, damping: 30, mass: 1 });
	const rightMotionValue = useMotionValue(0);
	const rightMotionValueSpring = useSpring(rightMotionValue, { stiffness: 200, damping: 30, mass: 1 });
	const leftPeekMotionValue = useMotionValue(0);
	const leftPeekMotionValueSpring = useSpring(leftPeekMotionValue, { stiffness: 200, damping: 24 });
	const rightPeekMotionValue = useMotionValue(0);
	const rightPeekMotionValueSpring = useSpring(rightPeekMotionValue, { stiffness: 200, damping: 24 });

	const thresholds = work_slides.map((_, index) => index / work_slides.length);
	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		const closestThreshold = thresholds.reduce((prev, curr) => (Math.abs(curr - latest) < Math.abs(prev - latest) ? curr : prev));

		const targetLeftY = closestThreshold * (100 * work_slides.length);
		const targetRightY = closestThreshold * (-100 * work_slides.length);

		leftMotionValue.set(targetLeftY);
		rightMotionValue.set(targetRightY);

		const scrollDirection = latest > scrollYProgress.getPrevious() ? "down" : "up";
		const scrollVelocity = scrollYProgress.getVelocity();

		let leftPeekValue = 0;
		let rightPeekValue = 0;

		if (Math.abs(scrollVelocity) < 0.15) {
			leftPeekValue = 0;
			rightPeekValue = 0;
		} else if (scrollDirection === "down" && latest > closestThreshold && latest < thresholds[thresholds.indexOf(closestThreshold) + 1]) {
			leftPeekValue = (latest - closestThreshold) * 100;
			rightPeekValue = (closestThreshold - latest) * 100;
		} else if (scrollDirection === "up" && latest < closestThreshold && latest > thresholds[thresholds.indexOf(closestThreshold) - 1]) {
			leftPeekValue = (closestThreshold - latest) * -100;
			rightPeekValue = (latest - closestThreshold) * -100;
		}

		leftPeekMotionValue.set(leftPeekValue);
		rightPeekMotionValue.set(rightPeekValue);
	});

	const leftTemplate = useMotionTemplate`translateY(${leftMotionValueSpring}%)`;
	const leftPeekTemplate = useMotionTemplate`translateY(${leftPeekMotionValueSpring}%)`;
	const rightTemplate = useMotionTemplate`translateY(${rightMotionValueSpring}%)`;
	const rightPeekTemplate = useMotionTemplate`translateY(${rightPeekMotionValueSpring}%)`;

	const [ref, { height }] = useMeasure() as any;
	const { height: windowHeight } = useWindowSize();

	const stickyTop = windowHeight / 2 - height / 2;

	return (
		<div
			ref={scrollRef}
			style={{
				height: `${work_slides?.length * 100}vh`,
			}}
			className="relative mx-auto hidden max-w-[1920px] overflow-x-clip pt-8 md:block"
		>
			<div
				style={{
					top: stickyTop || "unset",
				}}
				className="top-[5vh] flex w-full items-center md:sticky "
			>
				<div ref={ref} className="w-full px-8">
					<div className="flex aspect-[1376/696] max-h-[66vh] min-h-[600px] w-full overflow-hidden ">
						<motion.div
							style={{
								transform: leftPeekTemplate,
							}}
							className="flex flex-1"
						>
							<motion.div
								style={{
									transform: leftTemplate,
								}}
								className="flex flex-1 flex-col-reverse "
							>
								{work_slides.map((slide, i) => (
									<div
										key={`slide-block${i}`}
										className={`flex aspect-[688/700] min-h-full w-full flex-col justify-between gap-5 overflow-hidden p-6 ${getBgColorClasses(
											slide?.work?.acf?.general?.theme_color
										)}`}
									>
										<WpImage image={slide?.work?.acf?.work_logos?.light_logo} />
										<h2 className="t-64 uppercase">{slide?.work?.acf?.work_masthead?.heading}</h2>
										<div className="t-22 max-w-[90%]">{slide?.work?.acf?.previews?.excerpt}</div>
									</div>
								))}
							</motion.div>
						</motion.div>
						<motion.div
							style={{
								transform: rightPeekTemplate,
							}}
							className="flex flex-1"
						>
							<motion.div
								style={{
									transform: rightTemplate,
								}}
								className="flex flex-1 flex-col whitespace-nowrap"
							>
								{work_slides.map((slide, i) => (
									<div key={`slide-image${i}`} className="aspect-[688/700] min-h-full w-full overflow-hidden">
										<WpImage image={slide?.work?.acf?.previews?.slider_image || slide?.work?.featured_image} className="h-full w-full object-cover" />
									</div>
								))}
							</motion.div>
						</motion.div>
					</div>
					<div className="mt-16 flex justify-center laptop:mt-12">
						<NavBar />
					</div>
				</div>
			</div>
		</div>
	);
};
export default WorkSlider;

const NavBar = () => {
	return (
		<div className="w-full max-w-[680px] bg-stone/25 p-3">
			<div className="flex items-center justify-between pl-2">
				<div className="flex flex-1 items-center gap-[30px]">
					<div className="flex  flex-col items-center gap-[9px]">
						<div className="h-[10px] w-[10px] bg-cobalt" />
						<div className="h-[6px] w-[6px] bg-stone" />
						<div className="h-[6px] w-[6px] bg-stone" />
					</div>
					<div>Revolut</div>
				</div>
				<div className="flex flex-1 items-center gap-5">
					<div className="t-18 whitespace-nowrap font-heading font-black">VIEW CASE STUDY</div>
					<Button className="w-full text-center">All Work</Button>
				</div>
			</div>
		</div>
	);
};
