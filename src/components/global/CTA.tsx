import { useState } from "react";
import FontSwitcher from "../elements/animations/helpers/FontSwitcher";

const themeStyles = {
	boost: {
		backgroundColor: "bg-boost",
		unhoveredClasses: "bg-energy text-energy",
		hoveredClasses: "bg-white !text-boost",
		ctaText: "G<pst-pil>e</>t in to<pst-pil>u</>ch",
	},
	cobalt: {
		bg: "bg-cobalt",
		text: "text-electric",
	},
	black: {
		bg: "bg-black",
		text: "text-white",
	},
	candy: {
		bg: "bg-ketchup",
		text: "text-candy",
		hoverBg: "bg-white",
		hoverText: "text-ketchup",
		ctaText: "G<pst-grid>e</>t in to<pst-grid>u</>ch",
	},

	white: {
		unhoveredClasses: "bg-cobalt text-electric",
		hoveredClasses: "bg-electric text-cobalt",
		ctaText: "G<pst-grid>e</>t in to<pst-grid>u</>ch",
	},
};

const CTA = ({ pageOptions }) => {
	const [isHovered, setIsHovered] = useState(false);

	const footer_theme = pageOptions?.footer_theme || "white";

	return (
		<div className={`container pb-12 pt-8 md:pt-20 ${themeStyles[footer_theme]?.backgroundColor || "bg-white"}`}>
			<div
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className={`w-full  ${
					isHovered ? themeStyles[footer_theme]?.hoveredClasses : themeStyles[footer_theme]?.unhoveredClasses
				} t-144 px-5 py-20 text-center font-heading font-black uppercase transition-colors duration-200 md:py-32`}
			>
				<h2 className={`!bg-transparent ${isHovered ? themeStyles[footer_theme]?.hoveredClasses : ""}`}>
					<FontSwitcher hover isHovered={isHovered} text={themeStyles[footer_theme]?.ctaText || "G<pst-grid>e</>t in to<pst-grid>u</>ch"} />
				</h2>
			</div>
		</div>
	);
};
export default CTA;
