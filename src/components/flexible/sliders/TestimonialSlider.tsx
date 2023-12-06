import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import WpImage from "~/components/elements/WpImage";

const timerTime = 3500;

const TestimonialSlider = (props) => {
	const { items } = props;

	const ref = useRef(null);

	const isInView = useInView(ref, { once: false, amount: 0 });

	const [activeSlide, setActiveSlide] = useState(0);
	const [intervalId, setIntervalId] = useState(null);

	const changeSlide = (newIndex) => {
		setActiveSlide(newIndex);
		if (intervalId) {
			clearInterval(intervalId);
		}
		const newIntervalId = setInterval(updateSlide, timerTime);
		setIntervalId(newIntervalId);
	};

	const updateSlide = useCallback(() => {
		setActiveSlide((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
	}, [items.length]);

	useEffect(() => {
		let interval = setInterval(updateSlide, timerTime);

		const handleVisibilityChange = () => {
			if (document.hidden) {
				clearInterval(interval);
			} else if (isInView) {
				interval = setInterval(updateSlide, timerTime);
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => {
			clearInterval(interval);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [items.length, isInView, updateSlide]);

	return (
		<div>
			<div ref={ref} className="mx-auto flex w-full max-w-[877px] flex-col items-center text-center">
				<div className="relative aspect-[160/180] w-full max-w-[160px]">
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

				<motion.div layout className="mt-6 md:mt-[51px]">
					<AnimatePresence mode="wait">
						{items?.map(
							(item, i) =>
								activeSlide === i && (
									<motion.div
										key={`quote${i}`}
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
										className="t-40 font-black uppercase"
									>
										<span className="font-gridular text-ketchup">“</span>
										{item?.quote}
										<span className="font-gridular text-ketchup">”</span>
									</motion.div>
								)
						)}
					</AnimatePresence>

					<motion.div layout className="mt-8 md:mt-20">
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
											<div className="t-16 mt-2 font-medium opacity-[0.35]">{item?.title}</div>
										</motion.div>
									)
							)}
						</AnimatePresence>
					</motion.div>
					<motion.div layout className="mt-16 flex items-center justify-center gap-3">
						{items?.map((_, i) => (
							<motion.div
								key={`navItem${i}`}
								onClick={() => changeSlide(i)}
								initial={{ scale: 1 }}
								animate={{ scale: activeSlide === i ? 1.5 : 1 }}
								className={`h-[6px] w-[6px] cursor-pointer transition-colors duration-200 hover:bg-candy ${activeSlide === i ? "bg-ketchup" : "bg-stone"}`}
							/>
						))}
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
};
export default TestimonialSlider;
