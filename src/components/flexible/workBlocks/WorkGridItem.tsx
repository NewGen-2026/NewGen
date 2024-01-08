import { memo, useState } from "react";
import { useMeasure } from "react-use";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";
import { Color, getBgColorClasses, getIsLightColor, getTextContrastColorClasses, getTextContrastColorClassesImportant } from "~/utils/getColors";
import { motion } from "framer-motion";
import Link from "next/link";

const WorkGridItem = ({ work, variant }) => {
	const [isHovered, setIsHovered] = useState(false);

	const [containerRef, { height: containerHeight }] = useMeasure() as any;
	const [headingRef, { height: headingHeight }] = useMeasure() as any;
	const [dataRef, { height: dataHeight }] = useMeasure() as any;

	const isBreakpointCrossed = useBreakpointCrossed(768);

	const isThreeCol = variant === "3col";

	const headingDistanceHover = isThreeCol ? -dataHeight - 20 : -containerHeight / 2 + headingHeight / 2;

	const logoClass = isHovered ? "invert" : "";

	return (
		<div
			onMouseEnter={() => setIsHovered(!isBreakpointCrossed)}
			onMouseLeave={() => setIsHovered(false)}
			className={`relative ${isThreeCol ? "aspect-[437/540]" : "aspect-1"}  w-full overflow-hidden  ${getBgColorClasses(
				work?.acf?.general?.theme_color
			)} ${getTextContrastColorClasses(isHovered ? work?.acf?.general?.theme_color : "black")}`}
		>
			<motion.div
				initial={{
					opacity: 0,
					y: "100%",
				}}
				animate={{
					opacity: isHovered ? 1 : 0,
					y: isHovered ? 0 : "100%",
				}}
				transition={{
					duration: 0.3,
					ease: "easeInOut",
				}}
				className={`pointer-events-none absolute inset-0 z-10 will-change-transform ${getBgColorClasses(work?.acf?.general?.theme_color)}`}
			/>
			<Link ref={containerRef} href={work?.permalink} className="flex h-full flex-col justify-between p-4 md:p-6">
				<div className="absolute inset-0 h-full w-full">
					<WpImage image={work?.featured_image} className="h-full w-full object-cover" />
				</div>
				<WpImage
					removeFadeIn
					className={`relative z-20 transition-[filter] duration-200 will-change-transform ${
						getIsLightColor(work?.acf?.general?.theme_color) ? logoClass : ""
					}`}
					image={work?.acf?.work_logos?.light_logo}
				/>

				{work?.acf?.work_masthead?.heading && (
					<motion.h3
						ref={headingRef}
						initial={{
							y: 0,
						}}
						animate={{
							y: isHovered ? headingDistanceHover : 0,
						}}
						transition={{
							type: "spring",
							stiffness: 220,
							damping: 24,
						}}
						className={`t-44 relative z-20 line-clamp-3 w-full max-w-[502.5px] font-black uppercase will-change-transform xl:line-clamp-none ${getTextContrastColorClassesImportant(
							isHovered ? work?.acf?.general?.theme_color : "black"
						)}`}
					>
						<FontSwitcher hover isHovered={isHovered} text={work?.acf?.work_masthead?.heading} />
					</motion.h3>
				)}

				<div className="absolute inset-0 hidden h-full w-full items-end p-6 md:flex">
					<motion.div
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: isHovered ? 1 : 0,
						}}
						ref={dataRef}
						className={`relative z-20 flex w-full flex-wrap gap-4 ${isThreeCol ? "flex-col" : "lg:flex-nowrap"}`}
					>
						<InfoBlock theme_color={work?.acf?.general?.theme_color} />
						{work?.services?.length > 0 && (
							<InfoBlock heading="Services" theme_color={work?.acf?.general?.theme_color}>
								{work?.services?.map((service, i) => (
									<span key={`service-${i}`} className="t-20 block font-black uppercase" dangerouslySetInnerHTML={{ __html: service?.name }} />
								))}
							</InfoBlock>
						)}
						{work?.sector?.length > 0 && (
							<InfoBlock heading="Sector" theme_color={work?.acf?.general?.theme_color}>
								{work?.sector?.map((sector, i) => (
									<span key={`sector-${i}`} className="t-20 block font-black uppercase" dangerouslySetInnerHTML={{ __html: sector?.name }} />
								))}
							</InfoBlock>
						)}
					</motion.div>
				</div>
			</Link>
		</div>
	);
};
export default memo(WorkGridItem);

type InfoBlockProps = {
	heading?: string;
	children?: any;
	theme_color?: Color;
};

const InfoBlock = ({ heading = "Client", children = "Revolut", theme_color = "cobalt" }: InfoBlockProps) => {
	return (
		<div className="flex-auto">
			<div className="text-[15px] font-bold leading-[1.5] opacity-70">{heading}</div>
			<div className={`t-20 mt-2 font-black uppercase !leading-[1] ${getTextContrastColorClassesImportant(theme_color)}`}>{children}</div>
		</div>
	);
};
