import clsx from "clsx";
import { getBgColorClasses, getIsLightColor } from "~/utils/getColors";
import getFontSize from "~/utils/getFontSize";
import WpImage from "../elements/WpImage";
import FontSwitcher from "../elements/animations/helpers/FontSwitcher";
import Asset from "../elements/Asset";
import WorkFlexibleContent from "../flexible/workBlocks/WorkFlexibleContent";
import WorkGridItem from "../flexible/workBlocks/WorkGridItem";

const WorkPost = (props) => {
	const { page } = props;
	const { work_logos, work_masthead, general, work_content, more_work } = page;

	const logoHeights = {
		default: "max-h-[50px]",
		medium: "max-h-[65px]",
		large: "max-h-[85px]",
	};

	return (
		<>
			<section className={clsx("pb-8 pt-24 md:pt-[160px]", getBgColorClasses(general?.theme_color))}>
				<div className="container">
					<div
						style={{
							maxWidth: `${work_masthead?.heading_max_width}px`,
						}}
						className="mx-auto w-full text-center"
					>
						<WpImage
							image={
								work_masthead?.overrride_masthead_logo && work_masthead?.masthead_logo
									? work_masthead?.masthead_logo
									: getIsLightColor(general?.theme_color)
									? work_logos?.dark_logo
									: work_logos?.light_logo
							}
							className={clsx(`mx-auto object-contain`, logoHeights[work_masthead?.logo_height])}
						/>
						<h1 className={clsx(`mt-6 font-black uppercase md:mt-14`, getFontSize(work_masthead?.heading_font_size || "80"))}>
							<FontSwitcher text={work_masthead?.heading} />
						</h1>
					</div>
					<div className="mt-8 aspect-[1376/774] max-h-[780px] w-full md:mt-[72px] xl:min-h-[720px]">
						<Asset priority quality={85} {...work_masthead?.asset} className="h-full w-full " />
					</div>
				</div>
			</section>

			<section className="bg-white">
				{work_content?.work_block?.length && (
					<div className="">
						<WorkFlexibleContent {...work_content} />
					</div>
				)}
			</section>
			{more_work?.work?.length && (
				<section className="mt-16 bg-white md:mt-44 laptop:mt-32">
					<div className="container">
						<h2 className="t-44 mb-8 uppercase md:mb-[88px] ">More work</h2>
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
