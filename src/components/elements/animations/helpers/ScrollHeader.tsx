/* eslint-disable no-unused-vars */
import { useMotionValueEvent, useScroll, motion, useMotionValue, useSpring, useMotionTemplate, MotionValue } from "framer-motion";
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

	const yMotionValue = useMotionValue(0);
	const ySpring = useSpring(yMotionValue, {
		damping: 25,
		stiffness: 200,
	});

	useMotionValueEvent(scrollY, "change", (latest) => {
		const prev = scrollY.getPrevious();

		if (latest > 10 && latest > prev) {
			yMotionValue.set(-100);
		} else if (latest > 10 && latest < prev) {
			yMotionValue.set(0);
			setScrolledBg(true);
		} else {
			yMotionValue.set(0);
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

	const yTemplate = useMotionTemplate`translateY(${ySpring}%)`;

	return (
		<motion.header
			style={{
				transform: yTemplate,
			}}
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
