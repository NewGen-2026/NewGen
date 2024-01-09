import React, { useCallback, useEffect, useRef, useState } from "react";
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
	const [isMounted, setIsMounted] = useState(false);

	const generateRandomFonts = useCallback(() => {
		const lineText = rotating_lines[activeLineIndex]?.line.split("");
		const switchFontClass = fontMap[rotating_lines[activeLineIndex]?.switch_font];

		const lineFonts = new Array(lineText.length).fill("");

		const indices = new Set();
		while (indices.size < 2) {
			indices.add(Math.floor(Math.random() * lineText.length));
		}

		if (switchFontClass) {
			indices.forEach((index: any) => {
				lineFonts[index] = switchFontClass;
			});
		}
		return lineFonts;
	}, [rotating_lines, activeLineIndex]);

	const [randomFonts, setRandomFonts] = useState(generateRandomFonts());

	useEffect(() => {
		setIsMounted(true);

		const interval = setInterval(() => {
			if (isInView) {
				setActiveLineIndex((prevIndex) => (prevIndex + 1) % rotating_lines.length);
				const newRandomFonts = generateRandomFonts();
				setRandomFonts(newRandomFonts);
			}
		}, 3000);

		return () => clearInterval(interval);
	}, [activeLineIndex, rotating_lines, isInView, generateRandomFonts]);

	const activeLine = rotating_lines[activeLineIndex]?.line.split("");

	return (
		<HeadingTag ref={ref} className="container text-center xl:mb-12">
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

export default RotatingHeading;
