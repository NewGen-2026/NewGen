import React, { useEffect, useRef, useState } from "react";
import useAutoSlider from "~/hooks/useAutoSlider";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { Color, getBgColorClasses } from "~/utils/getColors";
import IconsRenderer from "~/components/elements/icons/IconsRenderer";

type TransitionSliderProps = {
	className?: string;
	intervalDuration?: number;
	startDelay?: number;
	transitionColor?: Color;
	children: React.ReactNode;
	transitionColors?: Color[];
	add_nav?: boolean;
};

const TransitionSlider = ({
	className = "",
	children,
	intervalDuration = 3000,
	startDelay = 0,
	transitionColor = "ketchup",
	transitionColors = [],
	add_nav = false,
}: TransitionSliderProps) => {
	const ref = useRef(null);
	const [hasStarted, setHasStarted] = useState(false);

	const [overrideSlide, setOverrideSlide] = useState(null);

	const activeSlide = useAutoSlider(ref, React.Children.count(children), {
		intervalDuration,
		startDelay,
		overrideActiveSlide: overrideSlide,
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			setHasStarted(true);
		}, startDelay);

		return () => clearTimeout(timer);
	}, [startDelay]);

	const currentTransitionColor = transitionColors[activeSlide] || transitionColor;

	return (
		<LazyMotion features={domAnimation}>
			<div ref={ref} className={`relative ${className}`}>
				<div className="relative h-full w-full overflow-hidden">
					{React.Children.map(children, (child, index) => (
						<m.div
							key={index}
							initial={{ opacity: 0 }}
							animate={{ opacity: index === activeSlide ? 1 : 0 }}
							transition={{
								delay: 0.3,
							}}
							className="absolute inset-0 h-full w-full will-change-transform"
						>
							{child}
						</m.div>
					))}
					<div className="absolute inset-0">
						{hasStarted && activeSlide !== null && (
							<m.div
								key={activeSlide}
								initial={{ y: "100%" }}
								animate={{ y: [null, "0%", "-100%"] }}
								transition={{
									duration: 0.8,
									ease: "easeInOut",
								}}
								className={`absolute inset-0 z-10 will-change-transform ${getBgColorClasses(currentTransitionColor)}`}
							/>
						)}
					</div>
				</div>
				{add_nav && (
					<div className="absolute -bottom-8 left-0 right-0 flex w-full items-center justify-end gap-4 sm:gap-6 md:-bottom-10">
						<m.button
							whileTap={{ scale: 0.9 }}
							onClick={() => {
								setOverrideSlide((activeSlide - 1 + React.Children.count(children)) % React.Children.count(children || 0));
							}}
						>
							<div className="h-4 w-4 rotate-[90deg]">
								<IconsRenderer icon="arrow" />
							</div>
						</m.button>

						<m.button
							whileTap={{ scale: 0.9 }}
							onClick={() => {
								setOverrideSlide((activeSlide + 1) % React.Children.count(children || 0));
							}}
						>
							<div className="h-4 w-4 rotate-[-90deg]">
								<IconsRenderer icon="arrow" />
							</div>
						</m.button>
					</div>
				)}
			</div>
		</LazyMotion>
	);
};
export default TransitionSlider;
