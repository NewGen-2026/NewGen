import { Button } from "~/components/elements/buttons/Button";
import clsx from "clsx";
import WorkGridItem from "./WorkGridItem";

const WorkGrid = (props) => {
	const { works, variant } = props;

	const isThreeCol = variant === "3col";

	return (
		<div>
			<div className={clsx("grid", isThreeCol ? "xl::gap-8 gap-4 lg:grid-cols-3" : `gap-4 sm:grid-cols-2 md:gap-8`)}>
				{works?.map((work, i) => <WorkGridItem key={`work-${i}`} work={work?.work} variant={variant} />)}
			</div>
			<div className="mt-8 flex w-full justify-center md:mt-24">
				<Button>All Projects</Button>
			</div>
		</div>
	);
};
export default WorkGrid;
