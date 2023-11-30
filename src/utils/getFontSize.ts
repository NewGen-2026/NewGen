export default function getFontSize(size) {
	switch (size) {
		case "96":
			return "t-96";
		case "72":
			return "t-72";
		case "44":
		case "default":
			return "t-44";
		case "40":
			return "t-40";
		case "22":
			return "t-22";
		case "subheading":
			return "t-subheading";
		default:
			return `t-${size}`;
	}
}
