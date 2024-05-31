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

const delayOrder = [1, 1, 1, 3, 3, 3];

const fadeUpVariants = {
	initial: {
		opacity: 0,
		transform: "translateY(20px)",
	},
	animate: {
		opacity: 1,
		transform: "translateY(0px)",
	},
};

const GridSubmenu = (props) => {
	const {
		data: { grid_items, bottom_link },
		isMobile,
	} = props;

	const delayMap = grid_items.map((_, index) => delayOrder[index % 6]);

	return (
		<motion.div
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
			transition={{
				delay: 0.2,
			}}
			className="py-6 md:px-4 md:py-4 lg:min-h-[690px] "
		>
			<div className="grid gap-4 md:grid-cols-3 md:gap-5">
				{grid_items?.map((item, i) => <GridItem key={`grid${i}`} isMobile={isMobile} i={i} {...item} delayMap={delayMap} />)}
			</div>
			<div className="pt-8 md:pt-10">
				<BottomLink {...bottom_link} isMobile={isMobile} />
			</div>
		</motion.div>
	);
};
export default GridSubmenu;

const textEase = [0.68, 0, 0.15, 0.78];

const GridItem = (props) => {
	const { theme_color, link, icon_icon, heading, content, isMobile, i, delayMap } = props;

	const [isHovered, setIsHovered] = useState(false);

	const staggerDelay = delayMap[i] * 0.1 + 0.2;

	return (
		<Link href={link} className="block">
			<motion.div
				initial="initial"
				animate="animate"
				className={clsx(
					"group relative flex h-full max-h-[254px] w-full flex-col overflow-hidden p-5 transition-colors duration-200",
					getBgContrastHoverColorClasses(theme_color),
					getTextContrastColorClasses(isMobile ? getBgContrastColorName(theme_color) : theme_color),
					getTextColorHoverClasses(theme_color)
				)}
			>
				<motion.div
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					initial={{ opacity: 0, transform: "translateX(-100%)" }}
					animate={{ opacity: 1, transform: "translateX(0%)" }}
					transition={{
						delay: staggerDelay,
						transform: {
							ease: "easeInOut",
							duration: 0.4,
							delay: staggerDelay,
						},
					}}
					className={clsx(
						`absolute inset-0 !origin-bottom`,
						getBgColorClasses(isMobile ? getBgContrastColorName(theme_color) : theme_color),
						getBgContrastHoverColorClasses(theme_color)
					)}
				/>

				<motion.div
					variants={fadeUpVariants}
					transition={{
						delay: staggerDelay + 0.2,
						ease: textEase,
						duration: 0.4,
					}}
					className={clsx(`pointer-events-none h-10 w-10`, getTextColorHoverClasses(theme_color))}
				>
					<IconsRenderer icon={icon_icon} />
				</motion.div>

				<motion.div
					variants={fadeUpVariants}
					transition={{
						delay: staggerDelay + 0.3,
						ease: textEase,
						duration: 0.4,
					}}
					className={clsx(`t-32-menu pointer-events-none mt-4 max-w-[230px] font-heading font-black uppercase  md:mt-6`, getTextColorHoverClasses(theme_color))}
				>
					<FontSwitcher hover isHovered={isHovered || isMobile} text={heading} />
				</motion.div>
				<motion.div
					variants={fadeUpVariants}
					transition={{
						delay: staggerDelay + 0.4,
						ease: textEase,
						duration: 0.4,
					}}
					className={clsx(`t-16 pointer-events-none mt-3 max-w-[270px] font-medium !leading-[1.25] md:mt-5`, getTextColorHoverClasses(theme_color))}
				>
					{content}
				</motion.div>
			</motion.div>
		</Link>
	);
};

const BottomLink = ({ link, heading, content, isMobile }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link href={link} className="block px-4 !text-black md:px-0" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			<motion.div initial="initial" animate="animate" className="flex w-full items-end justify-between xl:px-5">
				<div>
					<motion.div
						variants={fadeUpVariants}
						transition={{
							delay: 0.3,
						}}
						className="t-48-large max-w-[300px] font-heading font-black uppercase !leading-[1.05] md:max-w-none"
					>
						<FontSwitcher hover isHovered={isHovered || isMobile} text={heading} />
					</motion.div>
					<motion.div
						variants={fadeUpVariants}
						transition={{
							delay: 0.4,
						}}
						className="t-18-small mt-3 font-medium opacity-70 md:mt-4"
					>
						{content}
					</motion.div>
				</div>
				<motion.div
					variants={fadeUpVariants}
					transition={{
						delay: 0.5,
					}}
					className="hidden md:block"
				>
					<TextLink isParentHovered={isHovered} className="!text-black">{`Le<pst-rec>a</>rn mo<pst-rec>r</>e`}</TextLink>
				</motion.div>
			</motion.div>
		</Link>
	);
};
