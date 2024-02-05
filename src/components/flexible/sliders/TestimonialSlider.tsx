/* eslint-disable no-shadow */
import { createRef, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useIsomorphicLayoutEffect } from "framer-motion";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { getBgColorClasses, getTextColorClasses, getTextContrastColorClasses } from "~/utils/getColors";

const TestimonialSlider = (props) => {
	const { items, background, variant, mode } = props;

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
	}, []);

	useEffect(() => {
		const updateActiveSlide = () => {
			if (isInView) {
				setActiveSlide((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
			}
		};

		const intervalDuration = 3500;
		const interval = setInterval(updateActiveSlide, intervalDuration);

		return () => {
			clearInterval(interval);
		};
	}, [items.length, activeSlide, isInView]);

	useIsomorphicLayoutEffect(() => {
		const heights = quoteRefs.current.map((ref: { current: { offsetHeight: any } }) => ref.current?.offsetHeight || 0);
		const maxHeight = Math.max(...heights);
		setMaxQuoteHeight(maxHeight);
	}, [items.length, activeSlide]);

	const textClass = mode === "dark" ? "text-black" : "text-white";
	const navClass = mode === "dark" ? "bg-stone" : "bg-white/40";

	return (
		<div className={`${variant === "contained" ? `${getBgColorClasses(background?.color)} mx-[-15px] px-3 py-12 md:mx-0 md:py-20 tiny-laptop:py-16` : ""}`}>
			<motion.div
				ref={ref}
				onPanEnd={(event, info) => {
					if (info.offset.x < 0) {
						setActiveSlide((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
					} else {
						setActiveSlide((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
					}
				}}
				className="mx-auto flex w-full max-w-[877px] flex-col items-center text-center"
			>
				<div className="relative aspect-[160/180] w-full max-w-[80px] md:max-w-[160px] tiny-laptop:max-w-[130px]">
					{items?.map((item, i) => (
						<motion.div
							key={`item${i}`}
							initial={{ opacity: 0 }}
							animate={{
								opacity: activeSlide === i ? 1 : 0,
							}}
							transition={{
								duration: 0.3,
								delay: activeSlide === i ? 0.3 : 0,
							}}
							className="absolute inset-0 h-full w-full"
						>
							<WpImage image={item?.image} className="h-full w-full object-cover" />
						</motion.div>
					))}
				</div>

				<div className="mt-6 md:mt-[51px]">
					<AnimatePresence mode="wait">
						{items?.map(
							(item, i) =>
								activeSlide === i && (
									<motion.div
										key={`quote${i}`}
										ref={quoteRefs.current[i]}
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
										style={{ minHeight: maxQuoteHeight }}
										onMouseEnter={() => setIsHovered(true)}
										onMouseLeave={() => setIsHovered(false)}
										className={`t-40 cursor-default font-black uppercase transition-colors duration-200  ${
											isHovered ? getTextColorClasses(item?.theme_color) : textClass
										}`}
									>
										<span className="font-gridular ">“</span>
										<span>
											<FontSwitcher hover isHovered={isHovered} text={item?.quote} />
										</span>
										<span className="font-gridular ">”</span>
									</motion.div>
								)
						)}
					</AnimatePresence>

					<div className={`mt-8 md:mt-2 tiny-laptop:mt-12 `}>
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
													delay: 0.2,
												},
											}}
											className=""
										>
											<div className="t-24 font-black uppercase">{item?.name}</div>
											<div className={`t-16 mt-2 font-medium ${mode === "dark" ? "opacity-[0.35]" : getTextContrastColorClasses(background?.color)} `}>
												{item?.title}
											</div>
										</motion.div>
									)
							)}
						</AnimatePresence>
					</div>
					<div className="mt-16 flex items-center justify-center gap-3">
						{items?.map((item, i) => (
							<motion.div
								key={`navItem${i}`}
								onClick={() => setActiveSlide(i)}
								initial={{ scale: 1 }}
								animate={{ scale: activeSlide === i ? 1.5 : 1 }}
								className={`h-[6px] w-[6px] cursor-pointer transition-colors duration-200 ${getBgColorClasses(item?.theme_color || "cobalt")} ${
									activeSlide === i ? getBgColorClasses(item?.theme_color || "cobalt") : navClass
								}`}
							/>
						))}
					</div>
				</div>
			</motion.div>
		</div>
	);
};
export default TestimonialSlider;
