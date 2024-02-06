import { useCallback } from "react";

const usePanSlider = (setActiveItem, items) => {
	const handlePanEnd = useCallback(
		(event, info) => {
			if (info.offset.x < 0) {
				setActiveItem((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
			} else {
				setActiveItem((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
			}
		},
		[setActiveItem, items.length]
	);

	return handlePanEnd;
};

export default usePanSlider;
