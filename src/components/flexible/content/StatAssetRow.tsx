import Asset from "~/components/elements/Asset";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { getBgColorClasses } from "~/utils/getColors";

const StatAssetRow = (props) => {
	const { variant } = props;

	return variant === "3col" ? <ThreeColVariant {...props} /> : <DefaultVariant {...props} />;
};
export default StatAssetRow;

const DefaultVariant = ({ left_asset, right_asset, left_stat_block, right_stat_block }) => {
	return (
		<div className="flex w-full flex-col flex-wrap gap-4 sm:flex-row md:flex-nowrap xl:min-h-[320px] xl:gap-8">
			<div className="flex flex-1 gap-4 sm:flex-row xl:gap-8">
				<div className="aspect-[240/320] max-w-[240px] flex-[0_1_35%] sm:flex-[0_1_240px]">
					<Asset {...left_asset} className="h-full w-full object-cover" />
				</div>
				<div className={`flex  flex-[0_1_60%] flex-col justify-between gap-6 p-4 sm:flex-[0_1_400px] ${getBgColorClasses(left_stat_block?.theme_color)}`}>
					<h3 className="t-120 font-black uppercase">
						<FontSwitcher text={left_stat_block?.stat} />
					</h3>
					<h4 className="t-24 font-heading font-black uppercase">{left_stat_block?.description}</h4>
				</div>
			</div>
			<div className="flex flex-1 flex-row-reverse gap-4 sm:flex-row xl:gap-8">
				<div className="aspect-[240/320] max-w-[240px] flex-[0_1_35%] sm:flex-[0_1_240px]">
					<Asset {...right_asset} className="h-full w-full object-cover" />
				</div>
				<div className={`flex  flex-[0_1_60%] flex-col justify-between gap-6 p-4 sm:flex-[0_1_400px] ${getBgColorClasses(left_stat_block?.theme_color)}`}>
					<h3 className="t-120 font-black uppercase">
						<FontSwitcher text={right_stat_block?.stat} />
					</h3>
					<h4 className="t-24 max-w-[429px] font-heading font-black uppercase">{right_stat_block?.description}</h4>
				</div>
			</div>
		</div>
	);
};

const ThreeColVariant = ({ right_asset, left_stat_block, right_stat_block }) => {
	return (
		<div className="flex w-full flex-col flex-wrap gap-4 sm:flex-row md:flex-nowrap xl:min-h-[397px] xl:gap-8">
			<div className={`flex  flex-[0_1_60%] flex-col justify-between gap-6 p-4 sm:flex-[1_1_494px] ${getBgColorClasses(left_stat_block?.theme_color)}`}>
				<h3 className="t-96 font-black uppercase">
					<FontSwitcher text={left_stat_block?.stat} />
				</h3>
				<h4 className="t-24 font-heading font-black uppercase">{left_stat_block?.description}</h4>
			</div>
			<div className="aspect-[324/397] flex-[0_1_100%] overflow-hidden md:max-w-[324px] md:flex-[0_1_35%] ">
				<Asset {...right_asset} className="h-full w-full object-cover" />
			</div>
			<div className={`flex  flex-[0_1_30%] flex-col justify-between gap-6 p-4 sm:flex-[1_1_494px] ${getBgColorClasses(left_stat_block?.theme_color)}`}>
				<h3 className="t-96 font-black uppercase">
					<FontSwitcher text={right_stat_block?.stat} />
				</h3>
				<h4 className="t-24 max-w-[429px] font-heading font-black uppercase">{right_stat_block?.description}</h4>
			</div>
		</div>
	);
};
