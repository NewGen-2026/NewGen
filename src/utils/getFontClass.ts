export default function getFontClass(font) {
	switch (font) {
		case "pst":
		case "heading":
			return "font-heading";
		case "grid":
		case "gridular":
			return "font-gridular !leading-[0.5] !font-normal";
		case "pil":
		case "pilowlava":
			return "font-pilowlava !leading-[0.5]";
		case "rec":
		case "recoleta":
			return "font-recoleta !leading-[0.5]";
		case "nip":
		case "nippo":
			return "font-nippo !leading-[0.5]";
		case "become":
		case "bec":
			return "font-become !leading-[0.5] !font-semibold";
		case "hal":
		case "haltwins":
			return "font-haltwins";
		default:
			return `font-heading`;
	}
}
