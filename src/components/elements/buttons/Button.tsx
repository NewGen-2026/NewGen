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
		color: "black" | "white";
		background_color?: "black" | "white";
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
};

export function Button({ link, button, size, className = "", children, ...other }: ButtonProps) {
	const backgroundColor = button?.color || button?.background_color || "black";
	const buttonSize = button?.size || "medium";

	const classes = clsx(
		"text-white border transition-colors duration-300 select-none appearance-none inline-block t-18 uppercase px-[30px] !tracking-[-0.0225rem] !leading-[0.95] pt-[21px] pb-[19px] font-black",
		className,
		getBgColorClasses(backgroundColor),
		getBgHoverColors(button?.hover_background_color),
		getTextColorClasses(button?.text_color),
		getTextColorHoverClasses(button?.text_hover_color),
		buttonSize === "small" && "inline-block rounded text-13px px-5 py-2 font-medium",
		buttonSize === "wide" && "block rounded-[100px] text-16px px-7 py-5 leading-[1.3] text-center font-bold",
		buttonSize === "huge" && "w-full rounded-[100px] text-16px  py-5 px-5 font-bold cursor-pointer text-center"
	);

	return link?.title ? (
		<div className={classes} {...other} dangerouslySetInnerHTML={{ __html: link?.title }} />
	) : (
		<div className={classes} {...other}>
			{children}
		</div>
	);
}

export const HoverButton = ({ link, button, size, className = "", children, ...other }: ButtonProps) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<button type="button" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			<Button button={button}>
				<FontSwitcher hover isHovered={isHovered} text={link?.title || button?.link?.title || children} />
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
};

export function TextLink({ className = "", link, children, underlineColour = "black" }: TextLinkProps) {
	return (
		<div className={`text-16px group inline-flex cursor-pointer select-none items-center leading-tight ${className}`}>
			{(link?.title || children) && (
				<div className="group-hover:text-orange inline-block font-bold text-inherit">
					{link?.title && <span dangerouslySetInnerHTML={{ __html: link?.title }} />}
					{!link?.title && children && children}
					<div
						className={`group-hover:bg-orange mt-1 h-[2px] w-full rounded bg-black
          bg-${underlineColour} transition-colors duration-300 ease-in-out`}
					/>
				</div>
			)}
		</div>
	);
}
