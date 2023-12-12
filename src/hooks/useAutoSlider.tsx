/* eslint-disable no-unused-vars */
import { useInView } from "framer-motion";
import { RefObject, useEffect, useState } from "react";

type UseAutoSliderOptions = {
	intervalDuration?: number;
	startDelay?: number;
};

const useAutoSlider: (ref: RefObject<HTMLElement>, itemCount: number, options?: UseAutoSliderOptions) => number = (
	ref,
	itemCount,
	{ intervalDuration = 3000, startDelay = 0 } = {}
) => {
	const [activeSlide, setActiveSlide] = useState(0);
	const isInView = useInView(ref, { once: false });

	useEffect(() => {
		let interval;

		if (isInView && itemCount > 1) {
			const updateSlide = () => setActiveSlide((prevSlide) => (prevSlide + 1) % itemCount);

			const timeout = setTimeout(() => {
				interval = setInterval(updateSlide, intervalDuration);
			}, startDelay);

			return () => {
				clearTimeout(timeout);
				clearInterval(interval);
			};
		}

		return () => interval && clearInterval(interval);
	}, [isInView, itemCount, intervalDuration, startDelay]);

	return activeSlide;
};

export default useAutoSlider;
