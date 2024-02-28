/* eslint-disable no-unused-vars */
import { useMotionValueEvent, motion, MotionValue } from "framer-motion";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

type ScrollHeaderProps = {
	className?: string;
	setMenuOpen: (open: boolean) => void;
	children: ReactNode;
	setScrolledBg: (scrolled: boolean) => void;
	scrollY: MotionValue;
};

const ScrollHeader = ({ className = "", setMenuOpen, setScrolledBg, children, scrollY }: ScrollHeaderProps) => {
	const router = useRouter();

	useMotionValueEvent(scrollY, "change", (latest) => {
		const prev = scrollY.getPrevious();

		if (latest > 10 && latest > prev) {
			setScrolledBg(true);
		} else if (latest > 10 && latest < prev) {
			setScrolledBg(true);
		} else {
			setScrolledBg(false);
		}
	});

	useEffect(() => {
		const handleRouteChange = () => {
			setMenuOpen(false);
		};

		router.events.on("routeChangeComplete", handleRouteChange);

		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events, setMenuOpen]);

	return (
		<motion.header
			transition={{
				backgroundColor: {
					duration: 0.2,
				},
			}}
			className={`${className}`}
		>
			{children}
		</motion.header>
	);
};

export default ScrollHeader;
