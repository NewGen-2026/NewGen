import { useEffect, useState } from "react";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import cms from "~/utils/cms";
import { motion } from "framer-motion";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";
import { Facebook, Instagram, TikTok, Twitch, YouTube } from "../creatorBlocks/Socials";

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

const AllCreatorsList = (props) => {
	const [creators, setCreators] = useState([]);

	useEffect(() => {
		const fetchCreators = async () => {
			const response = await cms().postType("creator", 100);
			setCreators(response);
		};
		fetchCreators();
	}, []);

	const isBreakpointCrossed = useBreakpointCrossed(640);

	return (
		<>
			<div className="grid grid-cols-2 gap-4 gap-y-6 md:gap-8">
				{creators?.map((creator, i) => <CreatorItem key={`creator${i}`} creator={creator} isBreakpointCrossed={isBreakpointCrossed} />)}
			</div>
			<div className="t-18 mt-32 flex justify-center font-heading font-black uppercase">Load more</div>
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
			<div className="t-48 relative flex h-full w-full flex-col items-center justify-between gap-y-2 text-center font-heading font-black uppercase transition-opacity duration-200 group-hover:opacity-100 sm:flex-row sm:text-left sm:opacity-50">
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
		</div>
	);
};

const SocialIcon = ({ children, variants }) => {
	return (
		<motion.div className="h-8 w-8 md:h-[38px] md:w-[38px]" variants={variants}>
			{children}
		</motion.div>
	);
};
