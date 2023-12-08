import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const fontMap = {
	pst: "font-heading",
	pil: "font-pilowlava !leading-[0.5]",
	grid: "font-gridular !leading-[0.5] !font-normal",
	rec: "font-recoleta !leading-[0.5] !font-semibold",
	nip: "font-nippo !leading-[0.5] !font-semibold",
	bec: "font-become !leading-[0.5] !font-semibold",
};

const getRandomFontClass = () => {
	const fontKeys = Object.keys(fontMap);
	const randomIndex = Math.floor(Math.random() * fontKeys.length);
	return fontMap[fontKeys[randomIndex]];
};

const getRandomDelay = () => Math.random() * 0.5;

const RotatingHeading = (props) => {
	const { heading_tag, text_prepend, text_append, rotating_lines } = props;
	const HeadingTag = (heading_tag as keyof React.JSX.IntrinsicElements) || "h2";

	const [activeLineIndex, setActiveLineIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveLineIndex((prevIndex) => (prevIndex + 1) % rotating_lines.length);
		}, 3000);

		return () => clearInterval(interval);
	}, [rotating_lines.length]);

	const activeLine = rotating_lines[activeLineIndex]?.line.split("");

	return (
		<HeadingTag className="container text-center ">
			<span className="t-72 mx-auto block font-black uppercase">
				<span className="block">{text_prepend}</span>
				<span className="relative inline-block">
					<AnimatePresence mode="wait">
						{activeLine.map((char, index) => (
							<motion.span
								key={char + index}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									delay: getRandomDelay(),
									duration: 0.1,
								}}
								className={index % 3 === 0 ? getRandomFontClass() : ""}
							>
								{char}
							</motion.span>
						))}
					</AnimatePresence>
				</span>

				<span className="block">{text_append}</span>
			</span>
		</HeadingTag>
	);
};
export default RotatingHeading;
