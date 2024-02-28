import React, { useEffect, useState } from "react";
import clsx from "clsx";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";
import { Color } from "~/utils/getColors";
import maxWidthProps, { MaxWidthStyleType } from "~/utils/maxWidthProps";
import LinkGroup, { LinkGroupProps } from "../links/LinkGroup";
import TextCardHeading from "./TextCardHeading";
import TextCardContent from "./TextCardContent";

export type TextCardProps = {
	heading?: string;
	content?: string;
	links?: LinkGroupProps["links"];
	breakpoint?: number;
	options?: {
		variant?: "vertical" | "horizontal";
		section_max_width?: string;
		text_alignment?: "left" | "center" | "right";
		has_mobile_text_alignment?: boolean;
		mobile_text_alignment?: "left" | "center" | "right";
		section_alignment?: "left" | "center" | "right";
		subheading_tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
		subheading_font_size?: string;
		subheading_classes?: string;
		heading_tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
		heading_font_size?: string;
		heading_classes?: string;
		heading_max_width?: number;
		heading_font_color?: {
			color?: Color;
		};
		heading_margin_bottom?: string;
		content_max_width?: number;
		content_classes?: string;
		content_font_size?: string;
		content_font_color?: {
			color?: Color;
		};
		custom_y_spacing?: string;
		mobile_section_alignment?: string;
	};
	className?: string;
	containerClass?: string;
	loopHeading?: boolean;
};

function TextCard({
	heading = "",
	content = "",
	links = [],
	breakpoint = 768,
	options: {
		variant = "vertical",
		section_max_width,
		text_alignment = "left",
		has_mobile_text_alignment = false,
		mobile_text_alignment = "left",
		section_alignment = "left",
		heading_tag = "h2",
		heading_font_size = "default",
		heading_font_color,
		heading_max_width,
		heading_margin_bottom = "default",
		content_max_width,
		content_classes = "",
		content_font_size = "22",
		content_font_color,
		mobile_section_alignment = "",
	} = {},
	containerClass = "",
	className = "",
	loopHeading = false,
}: TextCardProps) {
	const breakpointCrossed = useBreakpointCrossed(breakpoint);

	const [maxWidthStyle, setMaxWidthStyle] = useState<MaxWidthStyleType>(maxWidthProps(section_max_width));

	useEffect(() => {
		if (breakpointCrossed) {
			setMaxWidthStyle(null);
		} else {
			setMaxWidthStyle(maxWidthProps(section_max_width));
		}
	}, [section_max_width, breakpointCrossed]);

	const classes = clsx(
		"flex flex-col",
		section_alignment === "center" && "mx-auto",
		section_alignment === "right" && "ml-auto",
		breakpointCrossed && !has_mobile_text_alignment && "text-center mx-auto",
		breakpointCrossed && has_mobile_text_alignment && mobile_text_alignment === "left" && "text-left",
		breakpointCrossed && has_mobile_text_alignment && mobile_text_alignment === "center" && "text-center mx-auto",
		breakpointCrossed && has_mobile_text_alignment && mobile_text_alignment === "right" && "text-right",
		!breakpointCrossed && text_alignment === "left" && "text-left",
		!breakpointCrossed && text_alignment === "center" && "text-center",
		!breakpointCrossed && text_alignment === "right" && "text-right mx-0"
	);

	return (
		<div className={clsx(`container`, containerClass)}>
			<div
				style={{
					...maxWidthStyle?.style,
				}}
				className={clsx(classes, className)}
			>
				<div className={clsx(variant === "horizontal" && "flex w-full flex-col justify-between gap-y-5 md:flex-row md:gap-6")}>
					{heading && (
						<TextCardHeading
							className={clsx(variant === "horizontal" && "flex-1")}
							heading={heading}
							breakpointCrossed={breakpointCrossed}
							text_alignment={text_alignment}
							options={{
								font_size: heading_font_size,
								max_width: heading_max_width,
								font_color: heading_font_color?.color,
								margin_bottom: heading_margin_bottom,
								heading_tag,
							}}
							loopHeading={loopHeading}
						/>
					)}
					{content && (
						<div className={clsx(variant === "horizontal" && "flex-1")}>
							<TextCardContent
								className={clsx(variant === "horizontal" && "flex-1")}
								content={content}
								breakpointCrossed={breakpointCrossed}
								options={{
									font_size: content_font_size,
									max_width: content_max_width,
									font_color: content_font_color?.color,
									content_classes,
									text_alignment,
								}}
							/>
							{variant === "horizontal" && links?.length > 0 && links[0]?.link?.link?.url?.length > 0 && (
								<LinkGroup
									links={links}
									className={clsx(
										"mt-5 flex md:mt-8 ",
										!breakpointCrossed && text_alignment === "center" && "justify-center",
										!breakpointCrossed && text_alignment === "right" && "justify-end",
										!breakpointCrossed && text_alignment === "left" && "justify-start",
										breakpointCrossed && !has_mobile_text_alignment && "justify-center",
										breakpointCrossed && has_mobile_text_alignment && mobile_text_alignment === "center" && "justify-center",
										breakpointCrossed && has_mobile_text_alignment && mobile_text_alignment === "right" && "justify-end",
										breakpointCrossed && has_mobile_text_alignment && mobile_text_alignment === "left" && "justify-start"
									)}
								/>
							)}
						</div>
					)}
					{links?.length > 0 && links[0]?.link?.link?.url?.length > 0 && variant !== "horizontal" && (
						<LinkGroup
							links={links}
							className={clsx(
								"mt-8 flex xl:mt-16",
								!breakpointCrossed && text_alignment === "center" && "justify-center",
								!breakpointCrossed && text_alignment === "right" && "justify-end",
								!breakpointCrossed && text_alignment === "left" && "justify-start",
								breakpointCrossed && !has_mobile_text_alignment && "justify-center",
								breakpointCrossed && has_mobile_text_alignment && mobile_text_alignment === "center" && "justify-center",
								breakpointCrossed && has_mobile_text_alignment && mobile_text_alignment === "right" && "justify-end",
								breakpointCrossed && has_mobile_text_alignment && mobile_text_alignment === "left" && "justify-start"
							)}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default TextCard;
