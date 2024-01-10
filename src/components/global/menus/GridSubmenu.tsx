import clsx from "clsx";
import { useState } from "react";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import IconsRenderer from "~/components/elements/icons/IconsRenderer";
import {
	getBgColorClasses,
	getBgContrastColorName,
	getBgContrastHoverColorClasses,
	getTextColorHoverClasses,
	getTextContrastColorClasses,
} from "~/utils/getColors";
import { motion } from "framer-motion";
import Link from "next/link";
import { TextLink } from "~/components/elements/buttons/Button";

const GridSubmenu = (props) => {
	const {
		data: { grid_items, bottom_link },
		isMobile,
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
			// layout
			className="py-6 md:py-0 lg:min-h-[690px]"
		>
			<div className="grid gap-4 md:grid-cols-3 md:gap-5">{grid_items?.map((item, i) => <GridItem key={`grid${i}`} isMobile={isMobile} {...item} />)}</div>
			<div className="py-8 md:py-10">
				<BottomLink {...bottom_link} isMobile={isMobile} />
			</div>
		</motion.div>
	);
};
export default GridSubmenu;

const GridItem = (props) => {
	const { theme_color, link, icon_icon, heading, content, isMobile } = props;

	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link href={link} className="block">
			<div
				className={clsx(
					"group flex h-full max-h-[254px] w-full flex-col p-5 transition-colors duration-200",
					getBgColorClasses(isMobile ? getBgContrastColorName(theme_color) : theme_color),
					getBgContrastHoverColorClasses(theme_color),
					getTextContrastColorClasses(isMobile ? getBgContrastColorName(theme_color) : theme_color),
					getTextColorHoverClasses(theme_color)
				)}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div className={clsx(`h-10 w-10`, getTextColorHoverClasses(theme_color))}>
					<IconsRenderer icon={icon_icon} />
				</div>

				<div className={clsx(`t-32-menu mt-4 max-w-[230px] font-heading font-black uppercase md:mt-5 md:mt-6`, getTextColorHoverClasses(theme_color))}>
					<FontSwitcher hover isHovered={isHovered || isMobile} text={heading} />
				</div>
				<div className={clsx(`t-16 mt-3 max-w-[270px] font-medium !leading-[1.25] md:mt-5`, getTextColorHoverClasses(theme_color))}>{content}</div>
			</div>
		</Link>
	);
};

const BottomLink = ({ link, heading, content, isMobile }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link href={link} className="block px-4 md:px-0" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			<div className="flex w-full items-end justify-between xl:px-5">
				<div>
					<div className="t-48-large max-w-[300px] font-heading font-black uppercase !leading-[1.05] md:max-w-none">
						<FontSwitcher hover isHovered={isHovered || isMobile} text={heading} />
					</div>
					<div className="t-18-small mt-3 font-medium opacity-70 md:mt-4">{content}</div>
				</div>
				<div className="hidden md:block">
					<TextLink isParentHovered={isHovered} className="!text-black">{`Le<pst-rec>a</>rn mo<pst-rec>r</>e`}</TextLink>
				</div>
			</div>
		</Link>
	);
};
