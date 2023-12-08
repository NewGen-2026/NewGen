import Asset from "~/components/elements/Asset";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { getBgColorClasses } from "~/utils/getColors";

const StatAssetRow = (props) => {
	const { left_asset, right_asset, left_stat_block, right_stat_block } = props;

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
					<h4 className="t-24 font-heading font-black uppercase">{right_stat_block?.description}</h4>
				</div>
			</div>
		</div>
	);
};
export default StatAssetRow;
