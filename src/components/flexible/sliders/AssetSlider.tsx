import dynamic from "next/dynamic";

const AssetSliderInner = dynamic(() => import("./AssetSliderInner"), { ssr: false });

const AssetSlider = (props) => {
	const { items } = props;
	return (
		<div className="min-h-[150px] w-full max-w-[1440px] lg:min-h-[375px]">
			<AssetSliderInner items={items} />
		</div>
	);
};
export default AssetSlider;
