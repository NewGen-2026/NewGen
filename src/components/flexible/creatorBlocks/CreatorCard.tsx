import { useEffect, useState } from "react";
import WpImage from "~/components/elements/WpImage";
import { motion } from "framer-motion";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import clsx from "clsx";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";
import Link from "next/link";
import { Facebook, Instagram, TikTok, Twitch, Twitter, YouTube } from "./Socials";

const socialVariants = {
	initial: {
		y: 48,
		opacity: 0,
		transition: {
			type: "spring",
			stiffness: 500,
			damping: 18,
			mass: 0.3,
			opacity: {
				duration: 0.1,
			},
		},
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 500,
			damping: 16,
			mass: 0.3,
			opacity: {
				duration: 0.2,
			},
		},
	},
};

const socialLinks = [
	{ platform: "YouTube", acfField: "youtube", IconComponent: YouTube },
	{ platform: "Twitch", acfField: "twitch", IconComponent: Twitch },
	{ platform: "Facebook", acfField: "facebook", IconComponent: Facebook },
	{ platform: "Twitter", acfField: "twitter", IconComponent: Twitter },
	{ platform: "Instagram", acfField: "instagram", IconComponent: Instagram },
	{ platform: "TikTok", acfField: "tiktok", IconComponent: TikTok },
];

const CreatorCard = ({ className = "", creator, size = "default" }) => {
	const [isHovered, setIsHovered] = useState(false);

	const breakpointCrossed = useBreakpointCrossed(768);

	useEffect(() => {
		if (breakpointCrossed) {
			setIsHovered(true);
		} else {
			setIsHovered(false);
		}
	}, [breakpointCrossed]);

	const yDistance = breakpointCrossed ? -35 : -48;

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
			<div className="absolute inset-0 z-[10] flex w-full items-end justify-center p-2 md:p-8">
				<motion.div
					initial={{
						y: 0,
					}}
					animate={{
						y: isHovered ? yDistance : 0,
					}}
					transition={{
						type: "spring",
						delay: isHovered ? 0 : 0.4,
						stiffness: 220,
						damping: 20,
						mass: 0.7,
					}}
					className="t-48-small text-center font-heading font-black uppercase will-change-transform"
				>
					<FontSwitcher text={creator?.creator?.acf?.hover_name} hover isHovered={isHovered} />
				</motion.div>
			</div>
			<div className="absolute inset-0 z-[10] flex w-full items-end justify-center p-2 md:p-8">
				<motion.div
					initial="initial"
					animate={isHovered ? "animate" : "initial"}
					transition={{
						staggerChildren: 0.075,
						delayChildren: 0.1,
						staggerDirection: isHovered ? 1 : -1,
					}}
					className="flex justify-center"
				>
					{socialLinks.map(({ acfField, IconComponent }) => {
						const link = creator?.creator?.acf?.[acfField];
						if (!link) return null;

						return (
							<SocialIcon key={acfField} variants={socialVariants} link={link}>
								<IconComponent />
							</SocialIcon>
						);
					})}
				</motion.div>
			</div>
			<div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black/100 to-black/0 opacity-40" />
		</motion.div>
	);
};

export default CreatorCard;

const SocialIcon = ({ children, variants, link = "/" }) => {
	return (
		<motion.div className="h-8 w-8 will-change-transform sm:h-10 sm:w-10 md:h-12 md:w-12" variants={variants}>
			<Link href={link} target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 hover:text-boost">
				{children}
			</Link>
		</motion.div>
	);
};
