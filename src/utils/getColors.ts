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

export const getBgContrastColorClasses = (color: Color) => {
	const colors = {
		white: "bg-black",
		black: "bg-white",
		cobalt: "bg-electric",
		electric: "bg-cobalt",
		stone: "bg-spark",
		ketchup: "bg-candy",
		sand: "bg-forest",
		candy: "bg-ketchup",
		boost: "bg-energy",
		energy: "bg-boost",
		forest: "bg-sand",
		spark: "bg-white",
	};

	return colors[color];
};

export const getBgContrastHoverColorClasses = (color: Color) => {
	const colors = {
		white: "hover:bg-black",
		black: "hover:bg-white",
		cobalt: "hover:bg-electric",
		electric: "hover:bg-cobalt",
		stone: "hover:bg-spark",
		ketchup: "hover:bg-candy",
		sand: "hover:bg-forest",
		candy: "hover:bg-ketchup",
		boost: "hover:bg-energy",
		energy: "hover:bg-boost",
		forest: "hover:bg-sand",
		spark: "hover:bg-white",
	};

	return colors[color];
};

export const getBgHoverColors = (color: Color) => {
	const colors = {
		white: "hover:bg-white",
		black: "hover:bg-black",
		cobalt: "hover:bg-cobalt",
		electric: "hover:bg-electric",
		stone: "hover:bg-stone",
		ketchup: "hover:bg-ketchup",
		sand: "hover:bg-sand",
		candy: "hover:bg-candy",
		boost: "hover:bg-boost",
		energy: "hover:bg-energy",
		forest: "hover:bg-forest",
		spark: "hover:bg-spark",
	};

	return colors[color];
};

export const getTextColorClasses = (color: Color) => {
	const colors = {
		white: "!text-white",
		black: "!text-black",
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

export const getTextContrastColorClasses = (color: Color) => {
	const colors = {
		white: "text-black",
		black: "text-white",
		cobalt: "text-electric",
		electric: "text-cobalt",
		stone: "text-spark",
		ketchup: "text-candy",
		sand: "text-forest",
		candy: "text-ketchup",
		boost: "!text-energy",
		energy: "text-boost",
		forest: "text-sand",
		spark: "text-stone",
	};

	return colors[color];
};

export const getTextColorHoverClasses = (color: Color) => {
	const colors = {
		white: "hover:!text-white group-hover:text-white",
		black: "hover:!text-black group-hover:text-black",
		cobalt: "hover:!text-cobalt group-hover:text-cobalt",
		electric: "hover:!text-electric group-hover:text-electric",
		stone: "hover:!text-white group-hover:text-white",
		ketchup: "hover:!text-ketchup group-hover:text-ketchup",
		sand: "hover:!text-sand group-hover:text-sand",
		candy: "hover:!text-candy group-hover:text-candy",
		boost: "hover:!text-boost group-hover:!text-boost",
		energy: "hover:text-energy group-hover:!text-energy",
		forest: "hover:text-forest group-hover:text-forest",
		spark: "hover:text-spark group-hover:text-spark",
	};

	return colors[color];
};

export const getTextContrastColorHoverClasses = (color: Color) => {
	const colors = {
		white: "hover:text-black group-hover:text-black",
		black: "hover:text-white group-hover:text-white",
		cobalt: "hover:text-electric group-hover:text-electric",
		electric: "hover:text-cobalt group-hover:text-cobalt",
		stone: "hover:text-black group-hover:text-black",
		ketchup: "hover:text-candy group-hover:text-candy",
		sand: "hover:text-forest group-hover:text-forest",
		candy: "hover:text-ketchup group-hover:text-ketchup",
		boost: "hover:!text-energy group-hover:!text-energy",
		energy: "hover:text-boost group-hover:text-boost",
		forest: "hover:text-sand group-hover:text-sand",
		spark: "hover:text-white group-hover:text-white",
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

export const getColorGradients = (color) => {
	const colors = {
		white: "from-white/100 to-white/0",
		black: "from-black/100 to-black/0",
		cobalt: "from-cobalt/100 to-cobalt/0",
		electric: "from-electric/100 to-electric/0",
		stone: "from-stone/100 to-stone/0",
		ketchup: "from-ketchup/100 to-ketchup/0",
		sand: "from-sand/100 to-sand/0",
		candy: "from-candy/100 to-candy/0",
		boost: "from-boost/100 to-boost/0",
		energy: "from-energy/100 to-energy/0",
		forest: "from-forest/100 to-forest/0",
		spark: "from-spark/100 to-spark/0",
	};

	return colors[color];
};
