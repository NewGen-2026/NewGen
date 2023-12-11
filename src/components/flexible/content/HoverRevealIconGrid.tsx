import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";
import IconsRenderer from "~/components/elements/icons/IconsRenderer";
import { getBgColorClasses, getBgContrastHoverColorClasses, getTextColorHoverClasses, getTextContrastColorClasses } from "~/utils/getColors";

const HoverRevealIconGrid = (props) => {
	const { items, theme_color } = props;
	const [activeHover, setActiveHover] = useState(null);

	return (
		<motion.div layout className="flex flex-col gap-4 lg:flex-row">
			{items?.map((item, i) => (
				<motion.div
					key={`item${i}`}
					layout
					onMouseEnter={() => setActiveHover(i)}
					onMouseLeave={() => setActiveHover(null)}
					className={clsx(
						`group relative flex flex-col overflow-hidden px-5 py-5 transition-colors duration-200 md:py-8 lg:py-10 xl:p-10 `,
						activeHover === i ? "w-full flex-auto xl:flex-[1_0_658px]" : "lg:flex-[1_1_448px]",
						getBgColorClasses(theme_color),
						getTextContrastColorClasses(theme_color),
						getBgContrastHoverColorClasses(theme_color),
						getTextColorHoverClasses(theme_color)
					)}
				>
					<motion.div
						layout="position"
						className={`h-16 w-16 transition-colors duration-200  ${getTextContrastColorClasses(theme_color)} ${getTextColorHoverClasses(theme_color)} `}
					>
						<IconsRenderer icon={item?.icon_icon} />
					</motion.div>
					<motion.div layout="position" className="mt-8 flex h-full flex-col justify-between lg:mt-24 lg:w-[400px] xl:w-[578px]">
						<h3 className={`t-44 max-w-[400px] font-black uppercase ${getTextColorHoverClasses(theme_color)}`}>{item?.heading}</h3>
						<div className="t-18 mt-5 font-medium lg:mt-8">{item?.content}</div>
					</motion.div>

					<div className="absolute bottom-0 right-[-2px] top-0 w-[20%] bg-gradient-to-l from-boost/100 to-boost/0 will-change-transform group-hover:opacity-0" />
				</motion.div>
			))}
		</motion.div>
	);
};
export default HoverRevealIconGrid;
