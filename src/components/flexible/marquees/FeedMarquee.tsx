import { useInView, motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import WpImage from "~/components/elements/WpImage";
import { Button } from "~/components/elements/buttons/Button";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";

const Marquee = dynamic(() => import("react-easy-marquee"), { ssr: false });

const FeedMarquee = (props) => {
	const { posts } = props;

	const ref = useRef(null);

	const breakpointCrossed = useBreakpointCrossed(768);

	const isInView = useInView(ref, {
		once: false,
	});

	const duration = breakpointCrossed ? 20000 : 58000;
	const height = breakpointCrossed ? "346px" : "640px";
	const pauseDuration = isInView ? duration : 0;

	return (
		<div>
			<div ref={ref} className="feed-marquee w-full md:min-h-[640px] ">
				<Marquee duration={pauseDuration} pauseOnHover axis="X" align="center" height={height} width="100%">
					{posts?.map((post, i) => <FeedSlide key={`post-${i}`} post={post} i={i} />)}
				</Marquee>
			</div>

			<div className="mt-12 flex justify-center md:mt-24">
				<Button>View all</Button>
			</div>
		</div>
	);
};
export default FeedMarquee;

const FeedSlide = ({ post, i }) => {
	const [isLiked, setIsLiked] = useState(false);
	const [openShare, setOpenShare] = useState(false);
	return (
		<div key={`post-${i}`} className="mx-2 flex w-[200px] flex-col justify-between md:mx-3 md:w-[396px]">
			<div className="mb-4 flex max-w-[340px] flex-1 justify-between gap-2 md:mb-8 md:gap-6">
				<div className="h-8 w-8 overflow-hidden rounded-full bg-energy md:h-12 md:w-12" />

				<div className="flex flex-1 flex-col flex-wrap justify-between whitespace-normal">
					<div>
						<div className="text-[15px] font-bold">Sammy Hardesty</div>
						<h3 className="t-24 mt-2 line-clamp-3 whitespace-normal font-black !leading-[-0.015rem]">{post?.heading}</h3>
					</div>

					<div className="mt-2 hidden gap-2 font-medium opacity-50 md:flex md:gap-[14px]">
						<span>#article</span>
						<span>#work</span>
						<span>#revolut</span>
						<span>#sidemen</span>
					</div>
				</div>
			</div>
			<div className="flex justify-between gap-2">
				<WpImage className="marquee-asset relative z-[5] w-full max-w-[168px] md:max-w-[340px]" image={post?.image} />
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
						onHoverEnd={() => setOpenShare(false)}
						className="relative z-[10]  h-5 w-5 hover:text-cobalt md:h-8 md:w-8"
					>
						<svg viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M19.8899 19.5991C12.047 19.5991 5.93648 24.4703 3.83398 26.7095C4.79326 18.3953 13.1456 11.4242 19.8899 11.4242V5.29297L30.1086 15.5117L19.8899 25.7304V19.5991Z"
								fill="currentColor"
							/>
						</svg>

						<AnimatePresence>
							{openShare && (
								<motion.div
									key={`share${i}`}
									initial={{
										clipPath: "inset(0% 100% 100% 0% round 0px)",
									}}
									animate={{
										clipPath: "inset(0% 0% 0% 0% round 6px)",
									}}
									exit={{
										clipPath: "inset(0% 100% 100% 0% round 0px)",
									}}
									className="absolute bottom-[-150%] left-[-45%] z-[10] h-[45px] w-[200px] flex-1 rounded bg-stone"
								/>
							)}
						</AnimatePresence>

						{isLiked && <LikeHearts />}
					</motion.span>
				</div>
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
				className="absolute inset-0 block"
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
				className="absolute inset-0 block"
			>
				<Heart />
			</motion.span>
		</>
	);
};
