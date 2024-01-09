import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";
import dynamic from "next/dynamic";
import WpImage from "../elements/WpImage";
import { Facebook, LinkedIn, TikTok, Twitter } from "../flexible/creatorBlocks/Socials";

const TwitterShareButton = dynamic(() => import("react-share").then((mod) => mod.TwitterShareButton), {
	ssr: false,
});

const LinkedinShareButton = dynamic(() => import("react-share").then((mod) => mod.LinkedinShareButton), {
	ssr: false,
});

type FeedPreviewProps = {
	className?: string;
	post?: any;
	i?: number;
	featured_image?: any;
	categories?: any[];
	permalink?: string;
	post_title?: string;
	variant?: "default" | "slide";
	acf?: any;
	post_tag?: any[];
	post_date_gmt?: string;
	author?: any;
};

const FeedPreview = ({
	className,
	post,
	i,
	featured_image,
	post_tag,
	post_date_gmt,
	author,
	permalink,
	post_title,
	variant = "default",
	acf,
}: FeedPreviewProps) => {
	const [isLiked, setIsLiked] = useState(false);
	const [openShare, setOpenShare] = useState(false);

	const slideVariant = variant === "slide";

	const link = acf?.is_external_link ? acf?.external_link : permalink;

	return (
		<div
			onMouseLeave={() => setOpenShare(false)}
			className={clsx(className, `flex flex-col justify-between `, slideVariant ? "mx-2 h-full w-[200px] md:mx-3 md:w-[396px]" : "w-full max-w-[502px]")}
		>
			<div className={clsx(`mb-4 flex flex-1 justify-between gap-2 md:mb-8 md:gap-6`, slideVariant ? " max-w-[340px]" : "max-w-[438px]")}>
				<div className={clsx(`h-8 w-8 flex-none overflow-hidden rounded-full bg-energy `, slideVariant ? "md:h-12 md:w-12" : "md:h-16 md:w-16")}>
					<WpImage image={author?.acf?.profile_picture} className="h-full w-full rounded-full object-cover" />
				</div>
				<Link
					href={link || "/#"}
					target={acf?.is_external_link ? "_blank" : "_self"}
					className={clsx(`flex flex-1 flex-col flex-wrap justify-between whitespace-normal`, slideVariant ? "" : "max-w-[350px]")}
				>
					<div>
						<div className="flex items-center gap-4">
							<div className="text-[15px] font-bold">{author?.name}</div>
							<div className="hidden text-[15px] font-medium opacity-50 md:block">{post_date_gmt}</div>
						</div>
						<h3
							className={clsx(
								` mt-1 line-clamp-3 whitespace-normal md:mt-2  `,
								slideVariant ? "t-24 font-black !leading-[-0.015rem]" : "t-30 font-bold !leading-[1.05]"
							)}
						>
							{post?.heading || post_title}
						</h3>
					</div>

					<div className="mt-2 hidden flex-wrap gap-2 gap-y-1 font-medium lowercase opacity-50 md:flex md:gap-[14px] md:gap-y-1 ">
						{post_tag?.map((tag, j) => <span key={`category${j}`}>#{tag?.name}</span>)}
					</div>
				</Link>
			</div>
			<div className={clsx(`flex justify-between gap-2`)}>
				<Link href={link || "/#"} target={acf?.is_external_link ? "_blank" : "_self"} className="block aspect-[438/615] w-full max-w-[438px]">
					<WpImage
						className={clsx(` relative z-[5]  h-full w-full bg-stone/20 object-cover `, slideVariant ? "marquee-asset max-w-[168px]  md:max-w-[340px]" : "")}
						image={post?.image || featured_image}
					/>
				</Link>
				<div className="flex flex-col gap-4">
					<motion.span
						initial="initial"
						whileHover="hover"
						animate="animate"
						whileTap="tap"
						onTapStart={() => setIsLiked(!isLiked)}
						className="h-5 w-5 md:h-8 md:w-8"
					>
						<motion.svg
							variants={{
								initial: {
									opacity: 1,
								},
								tap: {
									scale: 1.05,
								},
								hover: {
									opacity: 0.8,
								},
							}}
							width="100%"
							height="100%"
							viewBox="0 0 32 33"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M4.11618 16.9346L16 28.8185L27.8838 16.9346C29.2487 15.5701 30 13.756 30 11.8262C30 9.89636 29.2487 8.08227 27.8838 6.71774C26.5193 5.35321 24.7052 4.60156 22.7754 4.60156C20.8459 4.60156 19.0315 5.35321 17.6669 6.71774L16 8.38467L14.3331 6.71774C12.9685 5.35321 11.1544 4.60156 9.22462 4.60156C7.2948 4.60156 5.48071 5.35321 4.11618 6.71774C2.75164 8.08227 2 9.89636 2 11.8262C2 13.7557 2.75164 15.5701 4.11618 16.9346Z"
								fill="black"
							/>
							<motion.path
								variants={{
									initial: {
										scale: 0,
									},
									animate: {
										scale: isLiked ? 1 : 0,
									},
								}}
								fillRule="evenodd"
								clipRule="evenodd"
								d="M4.11618 16.9346L16 28.8185L27.8838 16.9346C29.2487 15.5701 30 13.756 30 11.8262C30 9.89636 29.2487 8.08227 27.8838 6.71774C26.5193 5.35321 24.7052 4.60156 22.7754 4.60156C20.8459 4.60156 19.0315 5.35321 17.6669 6.71774L16 8.38467L14.3331 6.71774C12.9685 5.35321 11.1544 4.60156 9.22462 4.60156C7.2948 4.60156 5.48071 5.35321 4.11618 6.71774C2.75164 8.08227 2 9.89636 2 11.8262C2 13.7557 2.75164 15.5701 4.11618 16.9346Z"
								fill="#F23428"
								className="!origin-[50%_80%]"
							/>
						</motion.svg>
					</motion.span>
					<motion.span
						initial="initial"
						whileHover="hover"
						animate="animate"
						whileTap="tap"
						onHoverStart={() => setOpenShare(true)}
						// onHoverEnd={() => setOpenShare(false)}
						className={`group relative h-5 w-5 hover:text-cobalt md:h-8 md:w-8 ${openShare ? "text-cobalt" : ""}`}
					>
						<svg viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M19.8899 19.5991C12.047 19.5991 5.93648 24.4703 3.83398 26.7095C4.79326 18.3953 13.1456 11.4242 19.8899 11.4242V5.29297L30.1086 15.5117L19.8899 25.7304V19.5991Z"
								fill="currentColor"
							/>
						</svg>

						{isLiked && <LikeHearts />}
					</motion.span>

					<motion.div
						initial="initial"
						animate={openShare ? "animate" : "initial"}
						variants={{
							initial: {
								transition: {
									staggerChildren: 0.1,
								},
							},
							animate: {
								transition: {
									staggerChildren: 0.1,
								},
							},
						}}
						onMouseLeave={() => setOpenShare(false)}
						className="flex flex-col gap-2 "
					>
						<SocialWrapper>
							<TwitterShareButton url={link}>
								<Twitter />
							</TwitterShareButton>
						</SocialWrapper>
						<SocialWrapper>
							<LinkedinShareButton url={link}>
								<LinkedIn />
							</LinkedinShareButton>
						</SocialWrapper>
						<SocialWrapper>
							<TikTok />
						</SocialWrapper>
					</motion.div>
				</div>
			</div>
			{variant === "default" && acf?.comments?.comments?.length > 1 && (
				<div className="mt-3 flex gap-2 md:mt-6 md:gap-4">
					<div className="max-w-[438px] flex-1 space-y-3">{acf?.comments?.comments?.map((comment, j) => <Comment key={`comment${j}`} {...comment} />)}</div>
					<div className="max-w-[20px] flex-1 md:max-w-[32px]" />
				</div>
			)}
		</div>
	);
};

const SocialWrapper = ({ children }) => {
	return (
		<motion.div
			variants={{
				initial: {
					opacity: 0,
					scale: 0,
				},
				animate: {
					opacity: 1,
					scale: 1,
					transition: {
						scale: {
							type: "spring",
							stiffness: 250,
							damping: 20,
						},
					},
				},
			}}
			className="group relative h-5 w-5 transition-colors duration-200 hover:text-cobalt md:h-8 md:w-8"
		>
			{children}
		</motion.div>
	);
};

const Comment = ({ image, name = "Stacey Dean", comment = "Nisl morbi faucibus fringilla lectus. 🔥" }) => {
	return (
		<div className="flex gap-2 md:gap-4 ">
			<div className="h-8 w-8 flex-none overflow-hidden rounded-full bg-electric will-change-transform md:h-12 md:w-12">
				<WpImage image={image} className="h-full w-full object-cover" />
			</div>
			<div className="w-full  bg-stone/20 px-3 py-4 md:p-4">
				<div className="t-18 font-medium">{name}</div>
				<div className="t-16 mt-2 font-medium text-[#4A4A4A] md:mt-3">{comment}</div>
			</div>
		</div>
	);
};

const Heart = () => {
	return (
		<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.11618 16.2237L16 28.1075L27.8838 16.2237C29.2487 14.8592 30 13.0451 30 11.1152C30 9.18542 29.2487 7.37134 27.8838 6.0068C26.5193 4.64227 24.7052 3.89062 22.7754 3.89062C20.8459 3.89062 19.0315 4.64227 17.6669 6.0068L16 7.67374L14.3331 6.0068C12.9685 4.64227 11.1544 3.89062 9.22462 3.89062C7.2948 3.89062 5.48071 4.64227 4.11618 6.0068C2.75164 7.37134 2 9.18542 2 11.1152C2 13.0448 2.75164 14.8592 4.11618 16.2237Z"
				fill="#F23428"
			/>
		</svg>
	);
};

const LikeHearts = () => {
	return (
		<>
			<motion.span
				key="heart-1"
				initial={{
					opacity: 0,
					scale: 0,
					y: 50,
					x: -50,
				}}
				animate={{
					opacity: [0, 0.7, 0],
					scale: [0, 4, 3],
					y: -300,
				}}
				transition={{
					y: {
						duration: 2,
					},
					scale: {
						duration: 1.5,
					},
					duration: 1,
				}}
				className="absolute inset-0 z-[10] block"
			>
				<Heart />
			</motion.span>

			<motion.span
				key="heart-2"
				initial={{
					opacity: 0,
					scale: 0,
					y: 50,
					x: 50,
				}}
				animate={{
					opacity: [0, 0.7, 0],
					scale: [0, 1, 3],
					y: -300,
				}}
				transition={{
					y: {
						duration: 1.6,
					},
					scale: {
						duration: 1.5,
					},
					duration: 1,
				}}
				className="absolute inset-0 block"
			>
				<Heart />
			</motion.span>
			<motion.span
				key="heart-3"
				initial={{
					opacity: 0,
					scale: 0,
					y: 50,
					x: 50,
				}}
				animate={{
					opacity: [0, 0.7, 0],
					scale: [0, 1, 3],
					y: -300,
				}}
				transition={{
					y: {
						duration: 1.6,
					},
					scale: {
						duration: 1.5,
					},
					duration: 1,
				}}
				className="absolute inset-0 block"
			>
				<Heart />
			</motion.span>
			<motion.span
				key="heart-4"
				initial={{
					opacity: 0,
					scale: 0,
					y: 100,
					x: 10,
				}}
				animate={{
					opacity: [0, 0.7, 0],
					scale: [0, 3, 5],
					y: -300,
				}}
				transition={{
					y: {
						duration: 1.8,
					},
					scale: {
						duration: 1.8,
					},
					duration: 1,
					delay: 0.1,
				}}
				className="absolute inset-0 z-[10] block"
			>
				<Heart />
			</motion.span>
		</>
	);
};

export default FeedPreview;
