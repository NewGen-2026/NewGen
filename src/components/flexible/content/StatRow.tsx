import clsx from "clsx";
import { useRef } from "react";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { getBgColorClasses } from "~/utils/getColors";

const StatRow = (props) => {
	const { items, has_contained_background_color = false, background } = props;

	const ref = useRef(null);

	return (
		<div
			ref={ref}
			className={clsx(
				"flex flex-wrap items-center justify-center gap-8 text-center lg:flex-nowrap",
				has_contained_background_color && "px-4 pb-16 pt-8 md:px-10 md:pb-24 md:pt-20",
				has_contained_background_color && getBgColorClasses(background?.background_color)
			)}
		>
			{items?.map((item, i) => (
				<div key={`stat${i}`} className="lg:flex-[0_1_437px]">
					<h3 className="t-80 font-heading font-black uppercase">
						<FontSwitcher text={item?.stat} />
					</h3>
					<div className="t-24 mt-3 font-black uppercase">{item?.description}</div>
				</div>
			))}
		</div>
	);
};
export default StatRow;
