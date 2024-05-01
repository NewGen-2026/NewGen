/* eslint-disable consistent-return */
import { useInView } from "framer-motion";
import { memo, useEffect, useMemo, useRef, useState } from "react";

interface FontSwitcherProps {
	text: string | any;
	switchInterval?: number;
	loop?: boolean;
	startDelay?: number;
	hover?: boolean;
	isHovered?: boolean;
}

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

interface Segment {
	content: any;
	fonts?: string[];
	index?: number;
	isBreak?: boolean;
	delay?: number;
}

const FontSwitcher = memo(({ text, switchInterval = 1000, loop = false, startDelay = 0, hover = false, isHovered = false }: FontSwitcherProps) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: false });

	const { parsedSegments, fontSwitchCount } = useMemo(() => {
		let count = 0;
		const lines = text?.split("\\n");
		const segs: Segment[] = lines?.flatMap((line, lineIndex) => {
			const lineSegments: Segment[] = line
				.split(/(<[^>]+>.\s*<\/>)/g)
				.filter(Boolean)
				.map((segment): Segment => {
					const fontSwitchMatch = segment.match(/<([^>]+)>(.)\s*<\/>/);
					if (fontSwitchMatch) {
						const fontNames = fontSwitchMatch[1].split("-").map(mapFontName);
						const content = fontSwitchMatch[2];
						count += 1;

						const delayMatch = fontSwitchMatch[1].match(/delay-(\d+)/);
						const delay = delayMatch ? parseInt(delayMatch[1], 10) : 0;

						return { content, fonts: fontNames, index: count - 1, delay };
					}
					return { content: segment };
				});

			if (lineIndex < lines.length - 1) {
				lineSegments.push({ content: <br />, isBreak: true });
			}

			return lineSegments;
		});

		return { parsedSegments: segs, fontSwitchCount: count };
	}, [text]);

	const [segmentIndices, setSegmentIndices] = useState(new Array(fontSwitchCount).fill(0));

	useEffect(() => {
		if (!hover && isInView && parsedSegments?.length > 0) {
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

			parsedSegments.forEach((segment, i) => {
				setTimeout(() => startInterval(segment, i), startDelay + segment.delay);
			});

			return () => {
				intervals.forEach((interval) => interval && clearInterval(interval));
			};
		}
	}, [isInView, parsedSegments, switchInterval, loop, hover, startDelay]);

	return (
		<span ref={ref}>
			{parsedSegments?.map((segment, index) => {
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
});

export default FontSwitcher;
