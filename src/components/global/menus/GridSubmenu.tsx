import clsx from "clsx";
import { useState } from "react";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import IconsRenderer from "~/components/elements/icons/IconsRenderer";
import { getBgColorClasses, getBgContrastHoverColorClasses, getTextColorHoverClasses, getTextContrastColorClasses } from "~/utils/getColors";
import { motion } from "framer-motion";
import Link from "next/link";
import { TextLink } from "~/components/elements/buttons/Button";

const GridSubmenu = (props) => {
	const {
		data: { grid_items, bottom_link },
	} = props;

	return (
		<motion.div
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
			transition={{
				delay: 0.1,
			}}
			layout
			className="lg:min-h-[690px]"
		>
			<div className="grid grid-cols-3 gap-5">{grid_items?.map((item, i) => <GridItem key={`grid${i}`} {...item} />)}</div>
			<div className="py-10">
				<BottomLink {...bottom_link} />
			</div>
		</motion.div>
	);
};
export default GridSubmenu;

const GridItem = (props) => {
	const { theme_color, link, icon_icon, heading, content } = props;

	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link href={link} className="block">
			<div
				className={clsx(
					"group flex h-full max-h-[254px] w-full flex-col p-5 transition-colors duration-200",
					getBgColorClasses(theme_color),
					getBgContrastHoverColorClasses(theme_color),
					getTextContrastColorClasses(theme_color),
					getTextColorHoverClasses(theme_color)
				)}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div className={clsx(`h-10 w-10`, getTextColorHoverClasses(theme_color))}>
					<IconsRenderer icon={icon_icon} />
				</div>

				<div className={clsx(`t-32 mt-6 max-w-[230px] font-heading font-black uppercase`, getTextColorHoverClasses(theme_color))}>
					<FontSwitcher hover isHovered={isHovered} text={heading} />
				</div>
				<div className={clsx(`t-16 mt-5 max-w-[270px] font-medium !leading-[1.25]`, getTextColorHoverClasses(theme_color))}>{content}</div>
			</div>
		</Link>
	);
};

const BottomLink = ({ link, heading, content }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link href={link} className="block" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			<div className="flex w-full items-end justify-between xl:px-5">
				<div>
					<div className="t-48 font-heading font-black uppercase">
						<FontSwitcher hover isHovered={isHovered} text={heading} />
					</div>
					<div className="t-18 mt-4 font-medium opacity-70">{content}</div>
				</div>
				<div>
					<TextLink isParentHovered={isHovered} className="!text-black">{`Le<pst-rec>a</>rn mo<pst-rec>r</>e`}</TextLink>
				</div>
			</div>
		</Link>
	);
};
