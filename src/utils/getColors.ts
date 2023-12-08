export type Color = "white" | "black" | "cobalt" | "electric" | "stone" | "ketchup" | "sand" | "candy" | "boost" | "energy" | "forest" | "spark";

export const getBgColorClasses = (color: Color) => {
	const colors = {
		white: "bg-white",
		black: "bg-black",
		cobalt: "bg-cobalt",
		electric: "bg-electric",
		stone: "bg-stone",
		ketchup: "bg-ketchup",
		sand: "bg-sand",
		candy: "bg-candy",
		boost: "bg-boost",
		energy: "bg-energy",
		forest: "bg-forest",
		spark: "bg-spark",
	};

	return colors[color];
};

export const getTextColorClasses = (color: Color) => {
	const colors = {
		white: "text-white",
		black: "text-black",
		cobalt: "text-cobalt",
		electric: "text-electric",
		stone: "text-stone",
		ketchup: "text-ketchup",
		sand: "text-sand",
		candy: "text-candy",
		boost: "text-boost",
		energy: "text-energy",
		forest: "text-forest",
		spark: "text-spark",
	};

	return colors[color];
};

export const getTextColorHoverClasses = (color: Color) => {
	const colors = {
		white: "hover:text-white",
		black: "hover:text-black",
		cobalt: "hover:text-cobalt",
		electric: "hover:text-electric",
		stone: "hover:text-stone",
		ketchup: "hover:text-ketchup",
		sand: "hover:text-sand",
		candy: "hover:text-candy",
		boost: "hover:text-boost",
		energy: "hover:text-energy",
		forest: "hover:text-forest",
		spark: "hover:text-spark",
	};

	return colors[color];
};

export const getTextColorGroupHoverClasses = (color: Color) => {
	const colors = {
		white: "group-hover:text-white",
		black: "group-hover:text-black",
		cobalt: "group-hover:text-cobalt",
		electric: "group-hover:text-electric",
		stone: "group-hover:text-stone",
		ketchup: "group-hover:text-ketchup",
		sand: "group-hover:text-sand",
		candy: "group-hover:text-candy",
		boost: "group-hover:text-boost",
		energy: "group-hover:text-energy",
		forest: "group-hover:text-forest",
		spark: "group-hover:text-spark",
	};

	return colors[color];
};

export const getColorHexCodes = (color) => {
	const colors = {
		white: "#FFFFFF",
		black: "#000000",
		cobalt: "#0047FF",
		electric: "#DBF2FF",
		stone: "#D3DADD",
		ketchup: "#F23428",
		sand: "#F3FFC7",
		candy: "#FFD2FD",
		boost: "#5800C8",
		energy: "#D3FFD2",
		forest: "#00A72F",
		spark: "#FF7A00",
	};

	return colors[color];
};
