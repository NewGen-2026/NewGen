/* eslint-disable no-unsafe-optional-chaining */
import { useMotionTemplate, motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { HoverButton, TextLink } from "~/components/elements/buttons/Button";
import { Link } from "~/components/elements/links/Link";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";
import { Color, getBgColorClasses, getBgContrastColorName, getTextContrastColorClasses } from "~/utils/getColors";
import dynamic from "next/dynamic";

const MobileWorkSlider = dynamic(() => import("../sliders/MobileWorkSlider"), { ssr: false });

const WorkSlider = (props) => {
	const breakpointCrossed = useBreakpointCrossed(890);

	return breakpointCrossed ? <MobileWorkSlider {...props} /> : <WorkSwiper {...props} />;
};

const WorkSwiper = (props) => {
	const [activeSlide, setActiveSlide] = useState(0);

	const { work_slides } = props;

	const leftMotionValue = useMotionValue(0);
	const leftMotionValueSpring = useSpring(leftMotionValue, { stiffness: 200, damping: 30, mass: 1 });
	const rightMotionValue = useMotionValue(0);
	const rightMotionValueSpring = useSpring(rightMotionValue, { stiffness: 200, damping: 30, mass: 1 });
	const leftPeekMotionValue = useMotionValue(0);
	const leftPeekMotionValueSpring = useSpring(leftPeekMotionValue, { stiffness: 200, damping: 24 });
	const rightPeekMotionValue = useMotionValue(0);
	const rightPeekMotionValueSpring = useSpring(rightPeekMotionValue, { stiffness: 200, damping: 24 });

	const leftTemplate = useMotionTemplate`translateY(${leftMotionValueSpring}%)`;
	const leftPeekTemplate = useMotionTemplate`translateY(${leftPeekMotionValueSpring}%)`;
	const rightTemplate = useMotionTemplate`translateY(${rightMotionValueSpring}%)`;
	const rightPeekTemplate = useMotionTemplate`translateY(${rightPeekMotionValueSpring}%)`;

	const dragThreshold = 100;

	const handleDragEndLeft = (event, info) => {
		if (Math.abs(info.offset.y) > dragThreshold) {
			if (info.offset.y < 0 && activeSlide < work_slides.length - 1) {
				setActiveSlide((prev) => prev + 1);
			} else if (info.offset.y > 0 && activeSlide > 0) {
				setActiveSlide((prev) => prev - 1);
			}
		}
		rightPeekMotionValue.set(0);
	};

	const handleDragEndRight = (event, info) => {
		if (Math.abs(info.offset.y) > dragThreshold) {
			if (info.offset.y > 0 && activeSlide < work_slides.length - 1) {
				setActiveSlide((prev) => prev + 1);
			} else if (info.offset.y < 0 && activeSlide > 0) {
				setActiveSlide((prev) => prev - 1);
			}
		}
		leftPeekMotionValue.set(0);
	};

	useEffect(() => {
		const translateYPercentage = activeSlide * 100;
		leftMotionValue.set(-translateYPercentage);
		rightMotionValue.set(translateYPercentage);
	}, [activeSlide, leftMotionValue, rightMotionValue]);

	return (
		<div className="w-full px-8">
			<div className="mx-auto flex aspect-[1376/696] max-h-[66vh] w-full max-w-[1376px] overflow-hidden xl:min-h-[600px] ">
				<motion.div
					style={{
						transform: leftPeekTemplate,
					}}
					className="flex flex-1"
				>
					<motion.div
						className="flex flex-1"
						drag="y"
						onDrag={(event, info) => {
							rightPeekMotionValue.set(-info.delta.y);
						}}
						onDragEnd={handleDragEndLeft}
						dragTransition={{ bounceStiffness: 200, bounceDamping: 30 }}
						dragConstraints={{
							top: 0,
							bottom: 0,
						}}
						dragSnapToOrigin
					>
						<motion.div
							style={{
								transform: leftTemplate,
							}}
							className="flex flex-1 flex-col "
						>
							{work_slides.map((slide, i) => (
								<div
									key={`slide-block${i}`}
									id={`slide${i}`}
									className={`pointer-events-none flex aspect-[688/700] min-h-full w-full flex-col justify-between gap-5 overflow-hidden p-6 ${getBgColorClasses(
										slide?.work?.acf?.general?.theme_color
									)}`}
								>
									<div className="max-w-[120px]">
										<WpImage
											image={
												slide?.work?.acf?.general?.theme_color === "boost"
													? slide?.work?.acf?.work_logos?.light_logo
													: slide?.work?.acf?.work_logos?.dark_logo || slide?.work?.acf?.work_logos?.light_logo
											}
											className="max-h-20 w-auto"
										/>
									</div>
									<h2 className="t-64-small max-w-[90%] uppercase xl:max-w-[100%]">
										<FontSwitcher hover isHovered={activeSlide === i} text={slide?.work?.acf?.work_masthead?.heading} />
									</h2>
									{slide?.work?.acf?.previews?.excerpt && (
										<div className={`"t-22 max-w-[90%]" ${getTextContrastColorClasses(slide?.work?.acf?.general?.theme_color)}`}>
											{slide?.work?.acf?.previews?.excerpt}
										</div>
									)}
								</div>
							))}
						</motion.div>
					</motion.div>
				</motion.div>
				<motion.div
					style={{
						transform: rightPeekTemplate,
					}}
					className="flex flex-1"
				>
					<motion.div
						className="flex flex-1"
						drag="y"
						onDrag={(event, info) => {
							leftPeekMotionValue.set(-info.delta.y);
						}}
						onDragEnd={handleDragEndRight}
						dragTransition={{ bounceStiffness: 200, bounceDamping: 30 }}
						dragConstraints={{
							top: 0,
							bottom: 0,
						}}
						dragSnapToOrigin
					>
						<motion.div
							style={{
								transform: rightTemplate,
							}}
							className="flex flex-1 flex-col-reverse "
						>
							{work_slides.map((slide, i) => (
								<div id={`slide${i}`} key={`slide-image${i}`} className="pointer-events-none aspect-[688/700] min-h-full w-full overflow-hidden">
									<WpImage image={slide?.work?.acf?.previews?.slider_image || slide?.work?.featured_image} className="h-full w-full object-cover" />
								</div>
							))}
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
			<div className="mt-16 flex justify-center laptop:mt-12">
				<NavBar items={work_slides} active={activeSlide} setActive={setActiveSlide} />
			</div>
		</div>
	);
};

export default WorkSlider;

const NavBar = ({ items, active, setActive }) => {
	return (
		<div className="h-20 w-full max-w-[680px] bg-white p-3">
			<div className="flex h-full items-center justify-between pl-2">
				<div className="flex flex-1 items-center gap-[30px]">
					<div className="flex  flex-col items-center gap-[9px]">
						{items.map((_, i) => (
							<motion.button
								aria-label={`Slide ${i}`}
								animate={{
									scale: active === i ? 1.4 : 1,
								}}
								onClick={() => setActive(i)}
								key={`nav-item-${i}`}
								className={`h-[6px] w-[6px] ${active === i ? getBgColorClasses(items[active]?.work?.acf?.general?.theme_color) : "bg-stone "}`}
							/>
						))}
					</div>
					<div className=" max-h-[60px] w-auto">
						<WpImage image={items[active]?.work?.acf?.work_logos?.dark_logo} className="max-h-[60px] w-auto" />
					</div>
				</div>
				<div className="flex flex-1 items-center gap-5">
					{items[active]?.work?.permalink && (
						<Link href={items[active]?.work?.permalink || "/#"} className="t-18 mb-[-5px] whitespace-nowrap font-heading font-black text-black">
							<TextLink underlineColour="black">{items[active]?.override_text_link ? items[active]?.text_link : `VIEW C<pst-rec>A</>SE STUDY`}</TextLink>
						</Link>
					)}
					<Link href={items[active]?.override_button && items[active]?.button.link?.url ? items[active]?.button.link?.url : "/work"} className="block w-full">
						<HoverButton
							button={
								items[active]?.override_button
									? items[active].button
									: {
											background_color: "black",
											text_color: "white",
											text_hover_color: getBgContrastColorName(items[active]?.work?.acf?.general?.theme_color) as Color,
											hover_background_color: items[active]?.work?.acf?.general?.theme_color,
											size: "medium",
									  }
							}
							className="!w-full text-center"
						>{`All w<pst-rec>o</>rk`}</HoverButton>
					</Link>
				</div>
			</div>
		</div>
	);
};
