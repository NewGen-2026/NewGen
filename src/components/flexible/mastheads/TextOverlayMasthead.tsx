import AssetInCenterVariant from "./textOverlayMastheads/AssetInCenterVariant";
import AssetAtBottomVariant from "./textOverlayMastheads/AssetAtBottomVariant";
import TextOnTopVariant from "./textOverlayMastheads/TextOnTopVariant";

const variantComponents = {
	about: TextOnTopVariant,
	work: AssetInCenterVariant,
};

const getVariantComponent = (variant, props) => {
	const Component = variantComponents[variant] || AssetAtBottomVariant;
	return <Component {...props} variant={variant} />;
};

const TextOverlayMasthead = (props) => {
	const { variant = "creator" } = props;
	return getVariantComponent(variant, props);
};
export default TextOverlayMasthead;
