import Asset from "~/components/elements/Asset";

const DualAsset = (props) => {
	const { left_asset, right_asset } = props;
	return (
		<div className="flex flex-col justify-between gap-4 md:flex-row md:gap-8 lg:h-[500px]">
			<div className="relative flex-[0.4] overflow-hidden md:max-w-[437px]">
				<Asset {...left_asset?.left_asset} className=" h-full w-full object-cover" />
			</div>
			<div className="relative max-w-[907px] flex-[0.7] ">
				<Asset {...right_asset?.right_asset} className=" h-full w-full object-cover" />
			</div>
		</div>
	);
};
export default DualAsset;
