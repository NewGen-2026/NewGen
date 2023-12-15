import React, { useEffect, useRef, useState } from "react";
import useAutoSlider from "~/hooks/useAutoSlider";
import { motion } from "framer-motion";
import { Color, getBgColorClasses } from "~/utils/getColors";

type TransitionSliderProps = {
	className?: string;
	intervalDuration?: number;
	startDelay?: number;
	transitionColor?: Color;
	children: React.ReactNode;
	transitionColors?: Color[];
};

const TransitionSlider = ({
	className = "",
	children,
	intervalDuration = 3000,
	startDelay = 0,
	transitionColor = "ketchup",
	transitionColors = [],
}: TransitionSliderProps) => {
	const ref = useRef(null);
	const [hasStarted, setHasStarted] = useState(false);

	const activeSlide = useAutoSlider(ref, React.Children.count(children), {
		intervalDuration,
		startDelay,
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			setHasStarted(true);
		}, startDelay);

		return () => clearTimeout(timer);
	}, [startDelay]);

	const currentTransitionColor = transitionColors[activeSlide] || transitionColor;

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
					className="absolute inset-0 h-full w-full will-change-transform"
				>
					{child}
				</motion.div>
			))}
			{hasStarted && (
				<motion.div
					key={activeSlide}
					initial={{ y: "100%" }}
					animate={{ y: [null, "0%", "-100%"] }}
					transition={{
						duration: 0.6,
						ease: "easeInOut",
					}}
					className={`absolute inset-0 z-10 h-full w-full will-change-transform ${getBgColorClasses(currentTransitionColor)}`}
				/>
			)}
		</div>
	);
};
export default TransitionSlider;
