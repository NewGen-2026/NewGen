import { useState } from "react";
import Link from "next/link";
import FontSwitcher from "../elements/animations/helpers/FontSwitcher";

const themeStyles = {
	boost: {
		backgroundColor: "bg-white",
		unhoveredClasses: "bg-energy text-energy",
		hoveredClasses: "bg-boost !text-energy",
		ctaText: "G<pst-pil>e</>t in to<pst-pil>u</>ch",
		ctaHoverText: "F<pst-grid>i</>nd your n<pst-pil>e</>w",
	},
	cobalt: {
		backgroundColor: "bg-cobalt",
		unhoveredClasses: "bg-electric text-electric",
		hoveredClasses: "bg-white !text-cobalt",
		ctaText: "Ge<pst-rec>t</> in t<pst-rec>o</>uch",
		ctaHoverText: "F<pst-rec>i</>nd your n<pst-rec>e</>w",
	},
	black: {
		backgroundColor: "bg-black",
		unhoveredClasses: "bg-electric text-electric",
		hoveredClasses: "bg-cobalt !text-electric",
		ctaText: "Ge<pst-rec>t</> in t<pst-rec>o</>uch",
		ctaHoverText: "F<pst-rec>i</>nd your n<pst-rec>e</>w",
	},
	candy: {
		backgroundColor: "bg-white",
		unhoveredClasses: "bg-ketchup text-candy",
		hoveredClasses: "bg-candy !text-ketchup",
		ctaText: "G<pst-bec>e</>t in to<pst-bec>u</>ch",
		ctaHoverText: "F<pst-bec>i</>nd your n<pst-bec>e</>w",
	},
	white: {
		unhoveredClasses: "bg-cobalt text-electric",
		hoveredClasses: "bg-electric text-cobalt",
		ctaText: "G<pst-grid>e</>t in to<pst-grid>u</>ch",
		ctaHoverText: "F<pst-grid>i</>nd your n<pst-grid>e</>w",
	},
};

const CTA = ({ pageOptions }) => {
	const [isHovered, setIsHovered] = useState(false);

	const cta_theme = pageOptions?.cta_theme || "white";
	const overrideText = pageOptions?.override_cta_text;
	const unhoveredText = overrideText && pageOptions?.unhovered_text ? pageOptions?.unhovered_text : themeStyles[cta_theme]?.ctaText;
	const hoveredText = overrideText && pageOptions?.hovered_text ? pageOptions?.hovered_text : themeStyles[cta_theme]?.ctaHoverText;
	const link = overrideText && pageOptions?.override_cta_link?.url ? pageOptions?.override_cta_link?.url : "/contact/";

	const displayedText = isHovered ? hoveredText : unhoveredText;

	return (
		<div className={`${themeStyles[cta_theme]?.backgroundColor || "bg-white"}`}>
			<div className={` mx-auto max-w-[1376px] pb-12 pt-8 md:pt-20 `}>
				<Link
					href={link}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					className={`w-full  ${
						isHovered ? themeStyles[cta_theme]?.hoveredClasses : themeStyles[cta_theme]?.unhoveredClasses
					} t-96 block px-5 py-20 text-center font-heading font-black uppercase transition-colors duration-200 md:py-32`}
				>
					<h2 className={`!bg-transparent ${isHovered ? themeStyles[cta_theme]?.hoveredClasses : ""}`}>
						<FontSwitcher hover isHovered={isHovered} text={displayedText || "G<pst-grid>e</>t in to<pst-grid>u</>ch"} />
					</h2>
				</Link>
			</div>
		</div>
	);
};
export default CTA;
