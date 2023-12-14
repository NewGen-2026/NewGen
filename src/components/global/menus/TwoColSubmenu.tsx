import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";

const TwoColSubmenu = (props) => {
	const {
		data: { left_col, right_col },
	} = props;

	return (
		<motion.div
			key="twoColMenu"
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
			transition={{
				delay: 0.2,
			}}
			className="mx-auto flex w-full  "
		>
			<LeftCol {...left_col} />
			<RightCol {...right_col} />
		</motion.div>
	);
};
export default TwoColSubmenu;

const LeftCol = ({ line_left, line_right, left_image, link }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link
			href={link || "/#"}
			className="relative flex aspect-[528/488] flex-1 items-end justify-center overflow-hidden bg-energy text-boost transition-opacity duration-200 hover:bg-boost hover:text-energy"
		>
			<div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="w-full">
				<div className="absolute inset-0 flex w-full items-center p-5 text-center">
					<div className="t-88-menu flex w-full justify-center font-heading font-black uppercase">
						<motion.span
							initial={{
								x: 0,
							}}
							animate={{
								x: "-0.4em",
							}}
							transition={{
								delay: 0.5,
							}}
						>
							<FontSwitcher hover isHovered={isHovered} text={line_left} />
						</motion.span>
						<motion.span
							initial={{
								x: 0,
							}}
							animate={{
								x: "0.4em",
							}}
							transition={{
								delay: 0.5,
							}}
						>
							<FontSwitcher hover isHovered={isHovered} text={line_right} />
						</motion.span>
					</div>
				</div>
				<motion.div
					initial={{
						opacity: 0,
						y: 50,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						opacity: {
							duration: 0.3,
							delay: 0.6,
						},
						delay: 0.6,
					}}
					className="w-full"
				>
					<WpImage image={left_image} priority className="relative mx-auto max-w-[57.8%]" />
				</motion.div>
			</div>
		</Link>
	);
};

const RightCol = ({ top_line_left, top_line_right, bottom_line, image, link }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link
			href={link || "/#"}
			className="relative  z-[10] flex aspect-[528/488] flex-1 items-end justify-center overflow-hidden  bg-electric text-cobalt transition-colors duration-200 hover:bg-cobalt hover:text-electric"
		>
			<div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="w-full">
				<div className="t-88-menu absolute inset-0 flex w-full items-center p-5 text-center  font-heading font-black uppercase !leading-[0.8]">
					<div className="flex w-full justify-center ">
						<div>
							<motion.span
								initial={{
									x: 0,
								}}
								animate={{
									x: "-0.4em",
								}}
								transition={{
									delay: 1,
								}}
								className="inline-block"
							>
								<FontSwitcher hover isHovered={isHovered} text={top_line_left} />
							</motion.span>
							<motion.span
								initial={{
									x: 0,
								}}
								animate={{
									x: "0.4em",
								}}
								transition={{
									delay: 1,
								}}
								className="inline-block"
							>
								<FontSwitcher hover isHovered={isHovered} text={top_line_right} />
							</motion.span>
							<div className="relative z-10">
								<FontSwitcher hover isHovered={isHovered} text={bottom_line} />
							</div>
						</div>
					</div>
				</div>
				<motion.div
					initial={{
						opacity: 0,
						y: 50,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						opacity: {
							duration: 0.3,
							delay: 1.1,
						},
						delay: 1.1,
					}}
					className="relative w-full"
				>
					<WpImage image={image} priority className="mx-auto max-w-[71.2%]" />
				</motion.div>
			</div>
		</Link>
	);
};
