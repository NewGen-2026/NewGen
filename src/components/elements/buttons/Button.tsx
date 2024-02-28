/* eslint-disable react/button-has-type */
import clsx from "clsx";
import React, { useState } from "react";
import { Color, getBgColorClasses, getBgHoverColors, getTextColorClasses, getTextColorHoverClasses } from "~/utils/getColors";
import FontSwitcher from "../animations/helpers/FontSwitcher";

export type ButtonProps = {
	link?: {
		title: string;
		url: string;
	};
	button?: {
		color?: "black" | "white";
		background_color?: Color;
		hover_background_color?: Color;
		text_color?: Color;
		text_hover_color?: Color;
		size: "small" | "medium" | "wide" | "huge";
		link?: {
			title: string;
			url: string;
		};
	};
	size?: "small" | "medium" | "wide" | "huge";
	className?: string;
	children?: React.ReactNode;
	type?: "button" | "submit" | "reset";
	buttonClass?: string;
	externalFontTrigger?: boolean;
};

export function Button({ link, button, size, className = "", children, ...other }: ButtonProps) {
	const backgroundColor = button?.color || button?.background_color || "black";
	const buttonSize = button?.size || "medium";

	const classes = clsx(
		"transition-colors duration-100 select-none appearance-none inline-block t-18 uppercase !tracking-[-0.0225rem] !leading-[0.95] px-5 py-3 py-[16px] pb-[14px] md:pt-[21px] md:pb-[19px] font-black",
		className,
		getBgColorClasses(backgroundColor),
		getBgHoverColors(button?.hover_background_color),
		getTextColorClasses(button?.text_color),
		getTextColorHoverClasses(button?.text_hover_color),
		buttonSize === "small" && "px-5 py-2",
		buttonSize === "medium" && "md:px-[30px]",
		buttonSize === "wide" && "px-12 py-5",
		buttonSize === "huge" && "py-5 px-5 "
	);

	return link?.title ? (
		<div className={classes} {...other} dangerouslySetInnerHTML={{ __html: link?.title }} />
	) : (
		<div className={classes} {...other}>
			{children}
		</div>
	);
}

export const HoverButton = ({
	link,
	button,
	size,
	className = "",
	buttonClass = "",
	children,
	type = "button",
	externalFontTrigger,
	...other
}: ButtonProps) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<button className={className} type={type} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			<Button button={button} className={buttonClass}>
				<FontSwitcher hover isHovered={isHovered || externalFontTrigger} text={link?.title || button?.link?.title || children} />
			</Button>
		</button>
	);
};

type TextLinkProps = {
	link?: {
		title: string;
		url: string;
	};
	className?: string;
	children?: React.ReactNode;
	underlineColour?: "black" | "white";
	isParentHovered?: boolean;
	textClass?: string;
};

export function TextLink({ className = "", textClass = "t-18-small", link, children, underlineColour = "black", isParentHovered }: TextLinkProps) {
	const [isHovered, setIsHovered] = useState(false);

	const hoverState = isParentHovered !== undefined ? isParentHovered : isHovered;

	const mouseEventHandlers =
		isParentHovered === undefined
			? {
					onMouseEnter: () => setIsHovered(true),
					onMouseLeave: () => setIsHovered(false),
			  }
			: {};

	return (
		<div
			{...mouseEventHandlers}
			className={` group inline-flex cursor-pointer select-none items-center pb-[1px] font-heading font-black uppercase ${textClass} ${className}`}
		>
			{(link?.title || children) && (
				<div className="relative inline-block overflow-hidden pb-[1px] font-black">
					{(link?.title || children) && <FontSwitcher hover isHovered={hoverState} text={link?.title || children} />}

					<div className="absolute h-[1px] w-full  ">
						<div className={` relative h-full w-full  will-change-transform`}>
							<div
								className={`absolute inset-0 h-full w-full transition-transform duration-200 ${getBgColorClasses(underlineColour)}
						${hoverState ? "translate-x-0" : "-translate-x-full"}
						`}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
