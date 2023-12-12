import { useState } from "react";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { motion } from "framer-motion";

const socialVariants = {
	initial: {
		y: 36,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
	},
};

const AllTeam = (props) => {
	const { team_members } = props;

	return (
		<div className="flex w-full flex-wrap gap-2 sm:gap-5 xl:gap-8">
			<div className="flex flex-[1_1_45%] items-center">
				<h2 className="t-120 font-black uppercase !leading-[1]">
					<FontSwitcher text="M<pst-grid-pst>e</>et the te<pst-grid-pst>a</>m" />
				</h2>
			</div>
			{team_members?.map((member, i) => <TeamMember key={`teamMember${i}`} member={member} />)}
		</div>
	);
};
export default AllTeam;

const TeamMember = ({ member }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="flex w-full flex-[1_1_45%] flex-col md:flex-[1_1_320px] xxl:flex-[0_1_320px]"
		>
			<div className="relative w-full overflow-hidden text-white md:flex-[0_1_400px]">
				<WpImage image={member?.team_member?.featured_image} className="h-full w-full object-cover" />

				<div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black/100 to-black/0 opacity-40" />

				<div className="absolute inset-0 flex items-end justify-center px-3 text-center md:px-6 md:py-[18px]">
					<div>
						<motion.div
							initial={{
								y: 36,
							}}
							animate={{
								y: isHovered ? 0 : 36,
							}}
							transition={{
								type: "spring",
								delay: isHovered ? 0 : 0.5,
								stiffness: 200,
								damping: 20,
							}}
						>
							<div className="t-24 font-heading font-black uppercase">
								{member?.team_member?.acf?.hover_name ? (
									<FontSwitcher text={member?.team_member?.acf?.hover_name} hover isHovered={isHovered} />
								) : (
									member?.team_member?.post_title
								)}
							</div>
							<div className="t-16 mt-[4px] font-medium text-stone">{member?.team_member?.acf?.job_title}</div>
						</motion.div>
						<motion.div
							initial="initial"
							animate={isHovered ? "animate" : "initial"}
							transition={{
								staggerChildren: 0.1,
								delayChildren: 0.1,
								staggerDirection: isHovered ? 1 : -1,
							}}
							className="flex justify-center gap-[10px]"
						>
							{member?.team_member?.acf?.linkedin && (
								<SocialIcon variants={socialVariants}>
									<LinkedIn />
								</SocialIcon>
							)}

							{member?.team_member?.acf?.twitter && (
								<SocialIcon variants={socialVariants}>
									<Twitter />
								</SocialIcon>
							)}
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
};

const SocialIcon = ({ children, variants }) => {
	return (
		<motion.div className="h-12 w-12 will-change-transform" variants={variants}>
			{children}
		</motion.div>
	);
};

const LinkedIn = () => {
	return (
		<svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M26.5984 26.0984H23.2698V20.4291C23.2698 18.8747 22.6792 18.0061 21.4489 18.0061C20.1105 18.0061 19.4113 18.91 19.4113 20.4291V26.0984H16.2034V15.2984H19.4113V16.7532C19.4113 16.7532 20.3758 14.9685 22.6676 14.9685C24.9584 14.9685 26.5984 16.3674 26.5984 19.2605V26.0984ZM12.3765 13.8843C11.2838 13.8843 10.3984 12.9919 10.3984 11.8914C10.3984 10.7908 11.2838 9.89844 12.3765 9.89844C13.4692 9.89844 14.354 10.7908 14.354 11.8914C14.354 12.9919 13.4692 13.8843 12.3765 13.8843ZM10.7201 26.0984H14.0651V15.2984H10.7201V26.0984Z"
				fill="white"
			/>
		</svg>
	);
};

const Twitter = () => {
	return (
		<svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clipPath="url(#clip0_616_8018)">
				<path
					d="M19.8611 16.8989L25.2182 10.8008H23.9492L19.2956 16.0946L15.5816 10.8008H11.2969L16.9144 18.8067L11.2969 25.2007H12.5659L17.477 19.6091L21.4001 25.2007H25.6848M13.0239 11.7379H14.9735L23.9482 24.3096H21.9982"
					fill="white"
				/>
			</g>
			<defs>
				<clipPath id="clip0_616_8018">
					<rect width="14.388" height="14.4" fill="white" transform="translate(11.2969 10.8008)" />
				</clipPath>
			</defs>
		</svg>
	);
};
