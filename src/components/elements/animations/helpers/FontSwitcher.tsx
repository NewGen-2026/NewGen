/* eslint-disable consistent-return */
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FontSwitcher = ({ text, switchInterval = 1000, loop = true, startDelay = 0, hover = false, isHovered = false }) => {
	const [segmentIndices, setSegmentIndices] = useState([]);
	const [segments, setSegments] = useState([]);

	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	const mapFontName = (shortName) => {
		const fontMap = {
			pst: "font-heading",
			pil: "font-pilowlava !leading-[0.5] !font-normal",
			grid: "font-gridular !leading-[0.5] !font-normal",
			rec: "font-recoleta !leading-[0.5] !font-semibold",
			nip: "font-nippo !leading-[0.5] !font-bold",
			bec: "font-become !leading-[0.5] !font-medium",
			hal: "font-haltwins !leading-[0.5] !font-normal",
		};
		return fontMap[shortName] || shortName;
	};

	useEffect(() => {
		const lines = text.split("\\n");
		let fontSwitchCount = 0;

		const parsedSegments = lines.flatMap((line, lineIndex) => {
			return line
				.split(/(<[^>]+>.\s*<\/>)/g)
				.filter(Boolean)
				.map((segment) => {
					const fontSwitchMatch = segment.match(/<([^>]+)>(.)\s*<\/>/);
					if (fontSwitchMatch) {
						fontSwitchCount += 1;
						const fontNames = fontSwitchMatch[1].split("-").map(mapFontName);
						const content = fontSwitchMatch[2];
						return { content, fonts: fontNames, index: fontSwitchCount - 1 };
					}
					return { content: segment };
				})
				.concat(lineIndex < lines.length - 1 ? { content: <br />, isBreak: true } : []);
		});

		setSegments(parsedSegments);
		setSegmentIndices(new Array(fontSwitchCount).fill(0));
	}, [text]);

	useEffect(() => {
		if (!hover && isInView && segments.length > 0) {
			const intervals = [];

			const startInterval = (segment, i) => {
				if (segment.fonts && segment.fonts.length > 1) {
					intervals[i] = setInterval(() => {
						setSegmentIndices((indices) => {
							const newIndices = [...indices];
							const currentIndex = indices[segment.index];
							let nextIndex = currentIndex + 1;

							if (nextIndex >= segment.fonts.length) {
								if (loop) {
									nextIndex = 0;
								} else {
									clearInterval(intervals[i]);
									return indices;
								}
							}

							newIndices[segment.index] = nextIndex;
							return newIndices;
						});
					}, switchInterval);
				}
			};

			segments.forEach((segment, i) => {
				setTimeout(() => startInterval(segment, i), startDelay);
			});

			return () => {
				intervals.forEach((interval) => interval && clearInterval(interval));
			};
		}
	}, [isInView, segments, switchInterval, loop, hover, startDelay]);

	return (
		<span ref={ref}>
			{segments.map((segment, index) => {
				if (segment.isBreak) {
					return <span key={index}>{segment.content}</span>;
				}

				let className = "";
				if (segment.fonts && segment.fonts.length > 0) {
					const currentFontIndex = hover && isHovered ? Math.min(segment.fonts.length - 1, 1) : segmentIndices[segment.index] % segment.fonts.length;
					className = segment.fonts[currentFontIndex];
				}

				return (
					<span key={index} className={className}>
						{segment.content}
					</span>
				);
			})}
		</span>
	);
};

export default FontSwitcher;
