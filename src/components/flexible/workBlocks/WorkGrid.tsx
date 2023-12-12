import Link from "next/link";
import { useState } from "react";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { motion } from "framer-motion";
import { useMeasure } from "react-use";
import { getBgColorClasses } from "~/utils/getColors";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";
import { Button } from "~/components/elements/buttons/Button";
import clsx from "clsx";

const WorkGrid = (props) => {
	const { works, variant } = props;

	const isThreeCol = variant === "3col";

	return (
		<div>
			<div className={clsx("grid", isThreeCol ? "xl::gap-8 gap-4 lg:grid-cols-3" : `gap-4 sm:grid-cols-2 md:gap-8`)}>
				{works?.map((work, i) => <WorkGridItem key={`work-${i}`} work={work} variant={variant} />)}
			</div>
			<div className="mt-8 flex w-full justify-center md:mt-24">
				<Button>All Projects</Button>
			</div>
		</div>
	);
};
export default WorkGrid;

const WorkGridItem = ({ work, variant }) => {
	const [isHovered, setIsHovered] = useState(false);

	const [containerRef, { height: containerHeight }] = useMeasure() as any;
	const [headingRef, { height: headingHeight }] = useMeasure() as any;

	const isBreakpointCrossed = useBreakpointCrossed(768);

	const isThreeCol = variant === "3col";

	return (
		<div
			onMouseEnter={() => setIsHovered(!isBreakpointCrossed)}
			onMouseLeave={() => setIsHovered(false)}
			className={`relative ${isThreeCol ? "aspect-[437/540]" : "aspect-1"}  w-full overflow-hidden bg-stone/5 text-white will-change-transform`}
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
				className={`absolute inset-0 z-10 will-change-transform ${getBgColorClasses(work?.work?.acf?.general?.theme_color)}`}
			/>
			<Link ref={containerRef} href={work?.work?.permalink} className="flex h-full  flex-col justify-between p-4 md:p-6">
				<div className="absolute inset-0 h-full w-full">
					<WpImage image={work?.work?.featured_image} className="h-full w-full object-cover" />
				</div>
				<WpImage className="relative z-20" image={work?.work?.acf?.work_logos?.light_logo} />

				<motion.h3
					ref={headingRef}
					initial={{
						y: 0,
					}}
					animate={{
						y: isHovered ? -containerHeight / 2 + headingHeight / 2 : 0,
					}}
					transition={{
						type: "spring",
						stiffness: 220,
						damping: 24,
					}}
					className="t-44 relative z-20 w-full max-w-[502.5px] font-black uppercase will-change-transform"
				>
					<FontSwitcher hover isHovered={isHovered} text={work?.work?.acf?.work_masthead?.heading} />
				</motion.h3>

				<div className="absolute inset-0 hidden h-full w-full items-end p-6 md:flex">
					<motion.div
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: isHovered ? 1 : 0,
						}}
						className={`relative z-20 flex w-full flex-wrap gap-4  ${isThreeCol ? "" : "lg:flex-nowrap"}`}
					>
						<InfoBlock />
						<InfoBlock heading="Services" content="Influencer Marketing" />
						<InfoBlock heading="Sector" content="Technology" />
					</motion.div>
				</div>
			</Link>
		</div>
	);
};

const InfoBlock = ({ heading = "Client", content = "Revolut" }) => {
	return (
		<div className="flex-auto">
			<div className="text-[15px] font-bold leading-[1.5] opacity-70">{heading}</div>
			<div className="t-20 mt-2 font-black uppercase !leading-[1]">{content}</div>
		</div>
	);
};
