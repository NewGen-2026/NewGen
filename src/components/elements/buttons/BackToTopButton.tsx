/* eslint-disable consistent-return */
import { useEffect, useState } from "react";

const BackToTopButton = () => {
	const [showBackToTop, setShowBackToTop] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const handleScroll = () => {
			setShowBackToTop(window.scrollY > 500);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<button
			style={{
				opacity: showBackToTop ? 1 : 0,
				pointerEvents: showBackToTop ? "auto" : "none",
			}}
			type="button"
			aria-label="Back to top"
			onClick={() => {
				window.scrollTo({ top: 0, behavior: "smooth" });
			}}
			className="fixed bottom-3 right-3 z-[200] mix-blend-difference transition-opacity duration-300  will-change-transform md:bottom-6 md:right-8 "
		>
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M7.3316 14L7.3316 2M7.3316 2L13.1094 7.77778M7.3316 2L1.55382 7.77778" stroke="white" strokeWidth="2" />
			</svg>
		</button>
	);
};

export default BackToTopButton;
