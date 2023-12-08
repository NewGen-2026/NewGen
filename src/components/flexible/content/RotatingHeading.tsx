import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

const fontMap = {
	pst: "font-heading",
	pil: "font-pilowlava !leading-[0.5] !font-normal",
	grid: "font-gridular !leading-[0.5] !font-normal",
	rec: "font-recoleta !leading-[0.5] !font-semibold",
	nip: "font-nippo !leading-[0.5] !font-semibold",
	bec: "font-become !leading-[0.5] !font-medium",
};
const getRandomDelay = () => Math.random() * 0.3;

const RotatingHeading = ({ heading_tag, text_prepend, text_append, rotating_lines }) => {
	const HeadingTag = heading_tag || "h2";

	const ref = useRef(null);
	const isInView = useInView(ref);

	const [activeLineIndex, setActiveLineIndex] = useState(0);
	const [randomFonts, setRandomFonts] = useState([]);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);

		const updateRandomFonts = () => {
			const newRandomFonts = rotating_lines[activeLineIndex]?.line.split("").map((_, index) => (index % 3 === 0 ? getRandomFontClass() : ""));
			setRandomFonts(newRandomFonts);
		};

		const interval = setInterval(() => {
			if (isInView) {
				setActiveLineIndex((prevIndex) => (prevIndex + 1) % rotating_lines.length);
				updateRandomFonts();
			}
		}, 3000);

		return () => clearInterval(interval);
	}, [activeLineIndex, rotating_lines, isInView]);

	const activeLine = rotating_lines[activeLineIndex]?.line.split("");

	return (
		<HeadingTag ref={ref} className="container text-center">
			<span className="t-72 mx-auto block font-black uppercase">
				<span className="block">{text_prepend}</span>
				<span className="relative inline-block">
					{activeLine.map((char, index) => (
						<AnimatePresence key={char + index}>
							<motion.span
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									duration: 0.1,
									delay: getRandomDelay(),
								}}
								className={isMounted ? randomFonts[index] : ""}
							>
								{char}
							</motion.span>
						</AnimatePresence>
					))}
				</span>
				<span className="block">{text_append}</span>
			</span>
		</HeadingTag>
	);
};

const getRandomFontClass = () => {
	const fontKeys = Object.keys(fontMap);
	const randomIndex = Math.floor(Math.random() * fontKeys.length);
	return fontMap[fontKeys[randomIndex]];
};

export default RotatingHeading;
