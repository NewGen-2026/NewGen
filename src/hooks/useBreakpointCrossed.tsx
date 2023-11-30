/* eslint-disable consistent-return */
const { useState, useEffect } = require("react");

const useBreakpointCrossed = (breakpoint) => {
	const [crossed, setCrossed] = useState(false);
	const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

	useEffect(() => {
		const updateCrossed = () => {
			setCrossed(width < breakpoint);
		};

		updateCrossed();
	}, [width, breakpoint]);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleResize = () => {
			const newWidth = window.innerWidth;
			if ((width < breakpoint && newWidth >= breakpoint) || (width >= breakpoint && newWidth < breakpoint)) {
				setWidth(newWidth);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [width, breakpoint]);

	return crossed;
};
export default useBreakpointCrossed;
