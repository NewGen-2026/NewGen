export type MaxWidthStyleType = { style?: undefined } | { style: { maxWidth: string | number } } | null;

const maxWidthProps = (setting): MaxWidthStyleType => {
	if (!setting) return {};

	return {
		style: {
			maxWidth: setting === 0 ? 0 : `${setting}px`,
		},
	};
};

export default maxWidthProps;
