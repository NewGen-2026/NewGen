import clsx from "clsx";
import { useEffect, useState } from "react";
import { Color, getTextColorClasses } from "~/utils/getColors";
import getFontSize from "~/utils/getFontSize";
import getMarginBottom from "~/utils/getMarginBottom";
import maxWidthProps, { MaxWidthStyleType } from "~/utils/maxWidthProps";

type TextCardContentProps = {
	content: string;
	className?: string;
	options: {
		font_size?: string;
		font_color?: Color;
		max_width?: number;
		margin_bottom?: string;
		content_classes?: string;
		openLinksInNewTab?: boolean;
		text_alignment?: string;
	};
	breakpointCrossed?: boolean;
};

function TextCardContent({
	className,
	content,
	options: { font_size, font_color, max_width, margin_bottom, content_classes, openLinksInNewTab, text_alignment },
	breakpointCrossed,
}: TextCardContentProps) {
	const [maxWidthStyle, setMaxWidthStyle] = useState<MaxWidthStyleType>(maxWidthProps(max_width));

	useEffect(() => {
		if (breakpointCrossed) {
			setMaxWidthStyle(null);
		} else {
			setMaxWidthStyle(maxWidthProps(max_width));
		}
	}, [max_width, breakpointCrossed]);

	return (
		<div
			className={clsx(
				"font-medium",
				getFontSize(font_size),
				getTextColorClasses(font_color || "black"),
				getMarginBottom(margin_bottom),
				max_width !== null && text_alignment === "center" && "mx-auto",
				content_classes,
				className
			)}
			style={{
				...maxWidthStyle?.style,
			}}
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
}
export default TextCardContent;
