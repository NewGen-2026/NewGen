import { useState } from "react";
import WpImage from "~/components/elements/WpImage";
import { motion } from "framer-motion";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import clsx from "clsx";
import { Facebook, Instagram, TikTok, Twitch, YouTube } from "./Socials";

const socialVariants = {
	initial: {
		y: 48,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
	},
};

const CreatorCard = ({ className = "", creator, size = "default" }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={clsx(
				`bg-stone-10 relative h-full w-full transform-gpu overflow-hidden text-white`,
				size === "large" ? "aspect-[907/580]  max-w-[907px]" : "aspect-[437/580] max-w-[437px]",
				className
			)}
		>
			<WpImage className="h-full w-full object-cover" image={creator?.creator?.featured_image} />
			<div className="absolute inset-0 z-[10] flex w-full items-end justify-center p-8">
				<motion.div
					initial={{
						y: 0,
					}}
					animate={{
						y: isHovered ? -48 : 0,
					}}
					transition={{
						type: "spring",
						delay: isHovered ? 0 : 0.5,
						stiffness: 200,
						damping: 20,
					}}
					className="t-48 text-center font-heading font-black uppercase will-change-transform"
				>
					<FontSwitcher text={creator?.creator?.acf?.hover_name} hover isHovered={isHovered} />
				</motion.div>
			</div>
			{/* Todo: Conditional socials */}
			<div className="absolute inset-0 z-[10] flex w-full items-end justify-center p-8">
				<motion.div
					initial="initial"
					animate={isHovered ? "animate" : "initial"}
					transition={{
						staggerChildren: 0.1,
						delayChildren: 0.1,
						staggerDirection: isHovered ? 1 : -1,
					}}
					className="flex justify-center"
				>
					<SocialIcon variants={socialVariants}>
						<YouTube />
					</SocialIcon>
					<SocialIcon variants={socialVariants}>
						<Twitch />
					</SocialIcon>
					<SocialIcon variants={socialVariants}>
						<Facebook />
					</SocialIcon>
					<SocialIcon variants={socialVariants}>
						<Instagram />
					</SocialIcon>
					<SocialIcon variants={socialVariants}>
						<TikTok />
					</SocialIcon>
				</motion.div>
			</div>
			<div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black/100 to-black/0 opacity-40" />
		</motion.div>
	);
};

export default CreatorCard;

const SocialIcon = ({ children, variants }) => {
	return (
		<motion.div className="h-12 w-12 will-change-transform" variants={variants}>
			{children}
		</motion.div>
	);
};
