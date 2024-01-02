import clsx from "clsx";
import { getBgColorClasses, getIsLightColor } from "~/utils/getColors";
import WpImage from "../elements/WpImage";
import FontSwitcher from "../elements/animations/helpers/FontSwitcher";
import Asset from "../elements/Asset";
import WorkFlexibleContent from "../flexible/workBlocks/WorkFlexibleContent";
import WorkGridItem from "../flexible/workBlocks/WorkGridItem";

const WorkPost = (props) => {
	const { page } = props;
	const { work_logos, work_masthead, general, work_content, more_work } = page;

	return (
		<>
			<section className={clsx("pb-8 pt-24 md:pt-[160px]", getBgColorClasses(general?.theme_color))}>
				<div className="container">
					<div className="mx-auto w-full max-w-[958px] text-center">
						<WpImage image={getIsLightColor(general?.theme_color) ? work_logos?.dark_logo : work_logos?.light_logo} className="mx-auto" />
						<h1 className="t-80 mt-6 font-black uppercase md:mt-14">
							<FontSwitcher text={work_masthead?.heading} />
						</h1>
					</div>
					<div className="mt-8 aspect-[1376/774] max-h-[780px] w-full md:mt-[72px] xl:min-h-[720px]">
						<Asset {...work_masthead?.asset} className="h-full w-full " />
					</div>
				</div>
			</section>

			<section>
				{work_content?.work_block?.length && (
					<div className="">
						<WorkFlexibleContent {...work_content} />
					</div>
				)}
			</section>
			{more_work?.work?.length && (
				<section>
					<div className="container">
						<div className="grid gap-4 sm:grid-cols-2 md:gap-8">
							{more_work?.work?.map((work, i) => <WorkGridItem key={`work-${i}`} work={work?.post} variant="2col" />)}
						</div>
					</div>
				</section>
			)}
		</>
	);
};
export default WorkPost;
