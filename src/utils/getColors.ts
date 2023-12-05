export type Color = "white" | "black" | "cobalt" | "electric" | "stone" | "ketchup" | "sand" | "candy" | "boost" | "energy" | "forest";

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
	};

	return colors[color];
};
