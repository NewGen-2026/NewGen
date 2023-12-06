import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FontSwitcher = ({ text, switchInterval = 500, loop = false, startDelay = 0 }) => {
	const [segmentIndices, setSegmentIndices] = useState([]);
	const [segments, setSegments] = useState([]);

	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	const mapFontName = (shortName) => {
		const fontMap = {
			pst: "font-heading",
			pil: "font-pilowlava !leading-[0.5]",
			grid: "font-gridular !leading-[0.5] !font-normal",
		};
		return fontMap[shortName] || shortName;
	};

	useEffect(() => {
		const lines = text.split("\\n");
		let fontSwitchCount = 0;

		const parsedSegments = lines.flatMap((line, lineIndex) => {
			return line
				.split(/(<[^>]+>\w)/)
				.filter(Boolean)
				.map((segment) => {
					const fontSwitchMatch = segment.match(/<([^>]+)>(\w)/);
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
		const intervals = [];
		let delayTimeout;

		if (isInView && segments.length > 0) {
			// Delay the start of the font switching
			delayTimeout = setTimeout(() => {
				segments.forEach((segment, i) => {
					if (segment.fonts) {
						intervals[i] = setInterval(() => {
							setSegmentIndices((indices) => {
								const newIndices = [...indices];
								const nextIndex = indices[segment.index] + 1;

								if (!loop && nextIndex >= segment.fonts.length) {
									clearInterval(intervals[i]);
									return indices;
								}
								newIndices[segment.index] = nextIndex % segment.fonts.length;
								return newIndices;
							});
						}, switchInterval);
					}
				});
			}, startDelay);
		}

		return () => {
			intervals.forEach((interval) => clearInterval(interval));
			if (delayTimeout) {
				clearTimeout(delayTimeout);
			}
		};
	}, [isInView, segments, switchInterval, loop, startDelay]);
	return (
		<span ref={ref}>
			{segments.map((segment, index) => {
				if (segment.isBreak) {
					return <span key={index}>{segment.content}</span>;
				}
				if (segment.fonts) {
					const className = segment.fonts[segmentIndices[segment.index]] || "";
					return (
						<span key={index} className={className}>
							{segment.content}
						</span>
					);
				}
				return <span key={index}>{segment.content}</span>;
			})}
		</span>
	);
};

export default FontSwitcher;
