import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Color, getTextColorClasses } from "~/utils/getColors";
import getFontSize from "~/utils/getFontSize";
import getMarginBottom from "~/utils/getMarginBottom";
import maxWidthProps, { MaxWidthStyleType } from "~/utils/maxWidthProps";

export interface HeadingProps {
	heading: string;
	className?: string;
	options: {
		font_size?: string;
		font_color?: Color;
		max_width?: number | null | undefined;
		margin_bottom?: string;
		heading_tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
		highlight_color?: string;
	};
	breakpointCrossed?: boolean;
	text_alignment?: string;
}

function TextCardHeading({
	heading,
	className,
	options: { font_size, font_color, max_width, margin_bottom, heading_tag },
	breakpointCrossed,
	text_alignment,
}: HeadingProps) {
	const HeadingTag = (heading_tag as keyof React.JSX.IntrinsicElements) || "h2";
	const [maxWidthStyle, setMaxWidthStyle] = useState<MaxWidthStyleType>(maxWidthProps(max_width));

	useEffect(() => {
		if (breakpointCrossed) {
			setMaxWidthStyle(null);
		} else {
			setMaxWidthStyle(maxWidthProps(max_width));
		}
	}, [max_width, breakpointCrossed]);

	const processText = (text) =>
		text
			.split("|")
			.map((part, index) => {
				if (index % 2 === 1) {
					// Odd parts (between pipes) get wrapped in a span with the special class
					return `<span class="font-gridular">${part}</span>`;
				}
				// Even parts (outside pipes) are returned as is
				return part;
			})
			.join("");

	const processedHeading = processText(heading);
	return (
		<HeadingTag
			className={clsx(
				"font-black uppercase",
				getFontSize(font_size),
				getTextColorClasses(font_color),
				getMarginBottom(margin_bottom),
				max_width !== null && text_alignment === "center" && "mx-auto",
				className
			)}
			style={{
				...maxWidthStyle?.style,
			}}
			dangerouslySetInnerHTML={{
				__html: processedHeading,
			}}
		/>
	);
}
export default TextCardHeading;
