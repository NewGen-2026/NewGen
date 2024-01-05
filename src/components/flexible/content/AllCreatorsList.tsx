import { useEffect, useState } from "react";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import cms from "~/utils/cms";
import { motion } from "framer-motion";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";
import Link from "next/link";
import { TextLink } from "~/components/elements/buttons/Button";
import { Facebook, Instagram, TikTok, Twitch, Twitter, YouTube } from "../creatorBlocks/Socials";

const socialVariants = {
	initial: {
		x: 20,
		y: 30,
		opacity: 0,
	},
	animate: {
		x: -5,
		opacity: 1,
	},
	default: {
		x: 0,
		y: 0,
		opacity: 1,
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

const LOAD_MORE_AMOUNT = 2;

const AllCreatorsList = (props) => {
	const [creators, setCreators] = useState([]);
	const [displayedCreatorsCount, setDisplayedCreatorsCount] = useState(2);

	useEffect(() => {
		const fetchCreators = async () => {
			const response = await cms().postType("creator", 100);
			setCreators(response);
		};
		fetchCreators();
	}, []);

	const isBreakpointCrossed = useBreakpointCrossed(640);

	const handleLoadMore = () => {
		setDisplayedCreatorsCount((prevCount) => prevCount + LOAD_MORE_AMOUNT);
	};

	const allCreatorsDisplayed = displayedCreatorsCount >= creators.length;

	return (
		<>
			<div className="grid grid-cols-2 gap-2 gap-y-4 sm:gap-4 sm:gap-y-6 md:gap-8">
				{creators.slice(0, displayedCreatorsCount).map((creator, i) => (
					<CreatorItem key={`creator${i}`} creator={creator} isBreakpointCrossed={isBreakpointCrossed} />
				))}{" "}
			</div>

			{!allCreatorsDisplayed && (
				<div className="t-18 mt-32 flex justify-center font-heading font-black uppercase">
					<button type="button" aria-label="Load More" onClick={handleLoadMore} className="text-center">
						<TextLink underlineColour="white" className="text-white">{`Lo<pst-pil>a</>d Mo<pst-pil>r</>e`}</TextLink>
					</button>
				</div>
			)}
		</>
	);
};
export default AllCreatorsList;

const CreatorItem = ({ creator, isBreakpointCrossed }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="group flex flex-col items-center gap-2 gap-y-5 sm:flex-row md:gap-6 "
		>
			<div className="aspect-[191/253] w-full flex-none bg-energy sm:aspect-[unset] sm:h-24 sm:w-24">
				<WpImage image={creator?.featured_image} className="h-full w-full object-cover object-top" />
			</div>
			<div className="t-48-small relative flex h-full w-full flex-col items-center gap-y-1 text-center font-heading font-black uppercase transition-opacity duration-200 group-hover:opacity-100 sm:flex-row sm:gap-y-2 sm:text-left sm:opacity-50 md:justify-between">
				<motion.div
					initial="initial"
					animate={isBreakpointCrossed ? "animate" : isHovered ? "animate" : "initial"}
					variants={{
						initial: {
							y: 0,
						},
						animate: {
							y: isHovered ? -20 : 0,
						},
					}}
					transition={{
						delay: isHovered ? 0 : 0.4,
					}}
				>
					{isBreakpointCrossed ? creator?.post_title : <FontSwitcher hover isHovered={isHovered} text={creator?.acf?.hover_name} />}
				</motion.div>

				<motion.div
					initial="initial"
					animate={isBreakpointCrossed ? "default" : isHovered ? "animate" : "initial"}
					transition={{
						staggerChildren: isHovered ? 0.1 : 0.05,
						delayChildren: 0.1,
						staggerDirection: isHovered ? 1 : -1,
					}}
					className="inset-0 flex w-full items-center justify-center sm:absolute sm:justify-start "
				>
					{socialLinks.map(({ acfField, IconComponent }) => {
						const link = creator?.acf?.[acfField];
						if (!link) return null;

						return (
							<SocialIcon key={acfField} variants={socialVariants} link={link}>
								<IconComponent />
							</SocialIcon>
						);
					})}
				</motion.div>
			</div>
		</div>
	);
};

const SocialIcon = ({ children, variants, link = "/" }) => {
	return (
		<motion.div className="h-8 w-8 md:h-[38px] md:w-[38px]" variants={variants}>
			<Link href={link} className="transition-colors duration-200 hover:text-energy" target="_blank" rel="noopener noreferrer">
				{children}
			</Link>
		</motion.div>
	);
};
