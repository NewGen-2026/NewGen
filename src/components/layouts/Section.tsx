import React from "react";
import clsx from "clsx";
import { SectionProps } from "~/types/wp";
import { getBgColorClasses } from "~/utils/getColors";
import ComponentRenderer from "./ComponentRenderer";

const paddingSizes = {
	top: {
		none: "pt-0",
		small: "pt-8 md:pt-20",
		medium: "pt-16 md:pt-24",
		large: "pt-16 md:pt-32 ",
		xlarge: "pt-16 md:pt-40 laptop:pt-32",
		xxlarge: "pt-20 md:pt-44 laptop:pt-36",
		mastheadLarge: "pt-20 md:pt-52 laptop:pt-36",
	},
	bottom: {
		none: "pb-0",
		small: "pb-8 md:pb-20",
		medium: "pb-16 md:pb-24",
		large: "pb-16 md:pb-32",
		xlarge: "pb-16 md:pb-40 laptop:pb-32",
		xxlarge: "pb-20 md:pb-44 laptop:pb-36",
	},
};

const getComponentSpacingClasses = (inner_spacing = "default") => {
	switch (inner_spacing) {
		case "none":
			return "";
		case "small":
			return "space-y-8";
		case "medium":
			return "space-y-10 md:space-y-24";
		case "large":
			return "space-y-12 md:space-y-28";
		case "xlarge":
			return "space-y-14 md:space-y-32";
		case "xxlarge":
			return "space-y-16 md:space-y-40";
		default:
			return "";
	}
};

const getSectionPaddingClasses = ({ paddingTop, paddingBottom }) => {
	const top = paddingSizes.top[paddingTop];
	const bottom = paddingSizes.bottom[paddingBottom];
	return `${top} ${bottom}`;
};

function Section(props: SectionProps) {
	const {
		pageId,
		components = [],
		id = "",
		classnames = "",
		inner_spacing = "",
		has_container = true,
		overflow = false,
		background,
		padding_top = "medium",
		padding_bottom = "medium",
		is_rounded = false,
		rounded_options = {},
	} = props;

	// Set section outer classes
	const outerClasses = clsx(classnames, [
		!overflow ? "overflow-hidden" : "overflow-visible", // Set overflow
		getBgColorClasses(background?.background_color), // Set outer background
		getSectionPaddingClasses({ paddingTop: padding_top, paddingBottom: padding_bottom }), // Set padding
		is_rounded && has_container ? "container" : "", // Add container to outer element if is rounded section and has_container set to true
	]);

	// Set section inner classes
	const innerClasses = clsx([
		(!is_rounded && has_container) || (is_rounded && rounded_options?.has_inner_container) ? "container" : "", // Set if using container or not
		getComponentSpacingClasses(inner_spacing), // Set inner spacing
		is_rounded ? "sm:rounded-2xl" : "", // Set it to be rounded
		is_rounded ? getBgColorClasses(rounded_options?.inner_background_color) : "", // Set inner background color options
		is_rounded ? getSectionPaddingClasses({ paddingTop: rounded_options?.inner_padding_top, paddingBottom: rounded_options?.inner_padding_bottom }) : "", // Set inner padding
	]);

	return (
		<section id={id} className={outerClasses}>
			<div className={innerClasses}>
				<ComponentRenderer pageId={pageId} components={components} />
			</div>
		</section>
	);
}

export default Section;
