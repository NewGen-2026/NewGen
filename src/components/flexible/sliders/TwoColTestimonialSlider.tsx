/* eslint-disable no-shadow */
import clsx from "clsx";
import { AnimatePresence, useInView, motion, useIsomorphicLayoutEffect } from "framer-motion";
import { createRef, useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import usePanSlider from "~/hooks/usePanSlider";
import { getBgColorClasses, getBgContrastColorClasses, getTextContrastColorClasses } from "~/utils/getColors";
import IconsRenderer from "~/components/elements/icons/IconsRenderer";

const TwoColTestimonialSlider = (props) => {
	const { variant, items, image_aspect } = props;

	const ref = useRef(null);
	const quoteRefs = useRef(items.map(() => createRef()));

	const [maxQuoteHeight, setMaxQuoteHeight] = useState(0);

	const isInView = useInView(ref, { once: false, amount: 0 });

	const [activeSlide, setActiveSlide] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	const updateMaxHeight = () => {
		const heights = quoteRefs.current.map((ref) => ref.current?.offsetHeight || 0);
		const maxHeight = Math.max(...heights);
		setMaxQuoteHeight(maxHeight);
	};

	useEffect(() => {
		updateMaxHeight();

		window.addEventListener("resize", updateMaxHeight);

		return () => {
			window.removeEventListener("resize", updateMaxHeight);
		};
	});

	useEffect(() => {
		const updateActiveSlide = () => {
			if (isInView) {
				setActiveSlide((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
			}
		};

		const intervalDuration = 5500;
		const interval = setInterval(updateActiveSlide, intervalDuration);

		return () => clearInterval(interval);
	}, [items.length, activeSlide, isInView]);

	useIsomorphicLayoutEffect(() => {
		const heights = quoteRefs.current.map((ref: { current: { offsetHeight: any } }) => ref.current?.offsetHeight || 0);
		const maxHeight = Math.max(...heights);
		setMaxQuoteHeight(maxHeight);
	}, [items.length, activeSlide]);

	const boxedVariant = variant === "boxedImage";

	const { width: windowWidth } = useWindowSize();

	const xValue = windowWidth < 1024 ? 0 : "100%";
	const yValue = windowWidth < 1024 ? "50%" : 0;

	const handlePanEnd = usePanSlider(setActiveSlide, items);

	const imageAspect = image_aspect === "landscape" ? "aspect-[672/420]" : "aspect-[672/672]";
	const boxImageNavClasses = image_aspect === "landscape" ? "" : "xl:mt-32 tiny-laptop:mt-12";

	return (
		<motion.div
			onPanEnd={handlePanEnd}
			ref={ref}
			className={clsx(
				`mx-[-15px] flex w-full gap-y-6 text-center transition-colors duration-200 md:mx-0 lg:flex-row lg:text-left`,
				getBgColorClasses(items[activeSlide]?.theme_color),
				boxedVariant
					? "flex-col-reverse justify-between gap-6"
					: "tiny-laptop:min-h-664px px-5x md:px-8x flex-col items-center justify-between overflow-hidden lg:min-h-[720px]"
			)}
		>
			<div className={clsx(`w-full flex-1 lg:w-[unset]`, boxedVariant ? "flex flex-col justify-between p-8 lg:max-w-[620px]" : "py-8 lg:max-w-[585px]")}>
				<div className={clsx(`relative w-full`, boxedVariant ? "flex h-full flex-col justify-between " : "mt-6 px-5 md:mt-[51px] md:px-8")}>
					<div className="">
						<div style={{ minHeight: maxQuoteHeight }} className="relative w-full">
							{items?.map((item, i) => (
								<motion.div
									key={`quote${i}`}
									ref={quoteRefs.current[i]}
									initial={{ opacity: 0 }}
									animate={{
										opacity: activeSlide === i ? 1 : 0,
									}}
									transition={{
										duration: 0.2,
										delay: activeSlide === i ? 0.2 : 0,
									}}
									onMouseEnter={() => setIsHovered(true)}
									onMouseLeave={() => setIsHovered(false)}
									className={`t-40 absolute left-0 top-0 cursor-default  font-black  uppercase lg:max-w-[680px] ${
										isHovered ? getTextContrastColorClasses(items[activeSlide]?.theme_color) : ""
									} ${activeSlide === i ? "" : "delay-[400ms]"}
								`}
								>
									<span
										className={`mb-[-10px] mr-5 inline-flex h-[0.1em] translate-y-[0.4em] items-center font-haltwins text-[3rem] !font-normal !leading-[0] !tracking-[0.02em]  md:text-[6rem]  ${getTextContrastColorClasses(
											items[activeSlide]?.theme_color
										)} ${boxedVariant ? "lg:mr-16" : "lg:mr-28"} `}
									>
										“{" "}
									</span>
									<span>
										<FontSwitcher hover isHovered={isHovered} text={item?.quote} />
									</span>
								</motion.div>
							))}
						</div>

						<div className="mt-8 xl:mt-[56px]">
							<AnimatePresence mode="wait">
								{items?.map(
									(item, i) =>
										activeSlide === i && (
											<motion.div
												layout
												key={`name${i}`}
												initial={{ opacity: 0 }}
												animate={{
													opacity: 1,
												}}
												exit={{
													opacity: 0,
													transition: {
														delay: 0.1,
													},
												}}
												className=""
											>
												<div className="t-22">{item?.name}</div>
												<div className="t-22 mt-1 font-medium">{item?.title}</div>
											</motion.div>
										)
								)}
							</AnimatePresence>
						</div>
					</div>
					<div className={clsx(`mt-8 flex items-center justify-center gap-3 lg:justify-start`, boxedVariant ? boxImageNavClasses : "lg:mt-32")}>
						<motion.button
							whileTap={{ scale: 0.9 }}
							onClick={() => {
								setActiveSlide((prevSlide) => (prevSlide - 1 + items.length) % items.length);
							}}
						>
							<div className="h-3 w-3 rotate-[90deg]">
								<IconsRenderer icon="arrow" />
							</div>
						</motion.button>

						{items?.map((_, i) => (
							<motion.div
								key={`navItem${i}`}
								onClick={() => setActiveSlide(i)}
								initial={{ scale: 1 }}
								animate={{ scale: activeSlide === i ? 1.5 : 1 }}
								className={`h-[6px] w-[6px] cursor-pointer transition-colors duration-200 ${getBgContrastColorClasses(items[activeSlide]?.theme_color)} ${
									activeSlide === i ? getBgContrastColorClasses(items[activeSlide]?.theme_color) : "opacity-50 saturate-0"
								}`}
							/>
						))}
						<motion.button
							whileTap={{ scale: 0.9 }}
							onClick={() => {
								setActiveSlide((prevSlide) => (prevSlide + 1) % items.length);
							}}
						>
							<div className="h-3 w-3 rotate-[-90deg]">
								<IconsRenderer icon="arrow" />
							</div>
						</motion.button>
					</div>
				</div>
			</div>
			<div
				className={clsx(
					`w-full flex-1 lg:w-[unset] `,
					boxedVariant && image_aspect !== "landscape" && "tiny-laptop:max-w-[580px]",
					boxedVariant ? "lg:max-w-[672px]" : "xl:translate-x-[-5%]x  max-w-[650px] "
				)}
			>
				<div
					className={clsx(
						`pointer-events-none relative w-full `,
						boxedVariant ? `${imageAspect} overflow-hidden` : "aspect-[650/656]",
						items[activeSlide]?.add_background && getBgColorClasses(items[activeSlide]?.boxed_image_background?.color)
					)}
				>
					{items?.map((item, i) => (
						<motion.div
							key={`item${i}`}
							initial={{ opacity: 0, x: xValue, y: yValue }}
							animate={{
								opacity: activeSlide === i ? 1 : 0,
								x: activeSlide === i ? "0%" : xValue,
								y: activeSlide === i ? "0%" : yValue,
							}}
							transition={{
								type: "spring",
								stiffness: 180,
								damping: 25,
								delay: activeSlide === i ? 0.3 : 0,

								opacity: {
									duration: 0.2,
									delay: activeSlide === i ? 0.3 : 0,
								},
							}}
							className="absolute inset-0"
						>
							<WpImage image={item?.image} className="h-full w-full object-cover" fill />
						</motion.div>
					))}
				</div>
			</div>
		</motion.div>
	);
};
export default TwoColTestimonialSlider;
