import React, { useEffect, useRef, useState } from "react";
import useAutoSlider from "~/hooks/useAutoSlider";
import { motion, AnimatePresence } from "framer-motion";
import { Color, getBgColorClasses } from "~/utils/getColors";

type TransitionSliderProps = {
	className?: string;
	intervalDuration?: number;
	startDelay?: number;
	transitionColor?: Color;
	children: React.ReactNode;
};

const TransitionSlider = ({ className = "", children, intervalDuration = 3000, startDelay = 0, transitionColor = "ketchup" }: TransitionSliderProps) => {
	const ref = useRef(null);
	const [hasStarted, setHasStarted] = useState(false);

	const activeSlide = useAutoSlider(ref, React.Children.count(children), {
		intervalDuration,
		startDelay,
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			setHasStarted(true);
		}, startDelay + intervalDuration);

		return () => clearTimeout(timer);
	}, [startDelay, intervalDuration]);

	return (
		<div ref={ref} className={`relative overflow-hidden ${className}`}>
			{React.Children.map(children, (child, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0 }}
					animate={{ opacity: index === activeSlide ? 1 : 0 }}
					transition={{
						delay: 0.3,
					}}
					className="absolute inset-0  h-full w-full"
				>
					{child}
				</motion.div>
			))}
			<AnimatePresence mode="wait" initial={false}>
				{hasStarted && (
					<motion.div
						key={activeSlide}
						initial={{ y: "100%" }}
						animate={{ y: ["100%", "0%", "-100%"] }}
						transition={{
							duration: 0.8,
							ease: [0.24, 0.32, 0.13, 0.98],
						}}
						className={`absolute inset-0 z-10 h-full w-full ${getBgColorClasses(transitionColor)}`}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};
export default TransitionSlider;
