import React from "react";
import styled from "styled-components";

/**
 * Button
 */
export function Button({ link, button, size, className = "", children, ...other }) {
	let typeClasses = `${className} text-white trans border border-inherit select-none appearance-none`;

	if (size === "small") {
		typeClasses += " inline-block rounded text-13px px-5 py-2 font-medium";
	} else if (size === "wide") {
		typeClasses += " block rounded-[100px] text-16px px-7 py-5 leading-[1.3] text-center font-bold";
	} else if (size === "huge") {
		typeClasses += " w-full rounded-[100px] text-16px  py-5 px-5 font-bold cursor-pointer text-center";
	} else {
		typeClasses += " inline-block rounded text-16px px-7 py-3 leading-[1.3] font-medium";
	}

	if (button?.type === "outline") {
		typeClasses += " bg-transparent border";
		if (button?.color === "white") {
			typeClasses += " border-white hover:bg-white hover:text-black";
		}

		if (button?.color === "black") {
			typeClasses += " border-black text-black hover:bg-black hover:text-white";
		}
	} else if (!button?.color || button?.color === "black") {
		typeClasses += " bg-black border-black ";
	}

	return link?.title ? (
		<div className={typeClasses} {...other} dangerouslySetInnerHTML={{ __html: link?.title }} />
	) : (
		<div className={typeClasses} {...other}>
			{children}
		</div>
	);
}

export default Button;

/**
 * Text Link
 */
const TextLinkStyled = styled.div``;
export function TextLink({ className = "", link, children, underlineColour = "black" }) {
	return (
		<TextLinkStyled className={`text-16px group inline-flex cursor-pointer select-none items-center leading-tight ${className}`}>
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
		</TextLinkStyled>
	);
}
