export default function getMarginBottom(spacing = "") {
	switch (spacing.toString()) {
		case "default":
		case "24":
			return "mb-5 md:mb-6";
		case "50":
			return "mb-5 md:mb-[50px]";
		case "56":
			return "mb-5 md:mb-[56px]";
		case "35":
			return "mb-5 md:mb-[35px]";
		default:
			return `mb-${spacing}`;
	}
}
