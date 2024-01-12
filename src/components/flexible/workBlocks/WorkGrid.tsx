import { HoverButton } from "~/components/elements/buttons/Button";
import clsx from "clsx";
import Link from "next/link";
import WorkGridItem from "./WorkGridItem";

const WorkGrid = (props) => {
	const { works, variant, button } = props;

	const isThreeCol = variant === "3col";

	return (
		<div>
			<div className={clsx("grid", isThreeCol ? "xl::gap-8 gap-4 lg:grid-cols-3" : `gap-4 sm:grid-cols-2 md:gap-8`)}>
				{works?.map((work, i) => <WorkGridItem key={`work-${i}`} work={work?.work} variant={variant} />)}
			</div>
			{button?.link?.title && (
				<div className="mt-8 flex w-full justify-center md:mt-24">
					{button?.link?.title && (
						<Link href={button?.link?.url || "/#"}>
							<HoverButton button={button}>{button?.link?.title || `All Pr<pst-rec>o</>jects`}</HoverButton>
						</Link>
					)}
				</div>
			)}
		</div>
	);
};
export default WorkGrid;
