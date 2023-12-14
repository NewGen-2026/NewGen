import Asset from "~/components/elements/Asset";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { useMeasure, useWindowSize } from "react-use";
import { useContext, useEffect, useRef, useState } from "react";
import { VideoLoadedContext } from "~/utils/context";

const LoaderMasthead = (props) => {
	const { asset } = props;

	const assetRef = useRef(null);
	const containerRef = useRef(null);
	const { scrollY } = useScroll();

	const assetScaleBase = useTransform(scrollY, [0, 400], [0.95, 1]);
	const assetScaleSpring = useSpring(assetScaleBase, { stiffness: 200, damping: 30, mass: 1 });

	const [initialY, setInitialY] = useState(0);
	const [animationComplete, setAnimationComplete] = useState(false);
	const { videoLoaded, setVideoLoaded } = useContext(VideoLoadedContext);

	const handleVideoLoad = () => {
		setVideoLoaded(true);
	};

	const [ref, { height }] = useMeasure() as any;
	const { height: windowHeight } = useWindowSize();
	const isInView = useInView(containerRef, { once: false, amount: 0.6 });

	useEffect(() => {
		if (!assetRef.current) return;
		if (height && typeof window !== "undefined") {
			const assetTopRelativeToViewport = assetRef.current.getBoundingClientRect().top;
			const calculatedY = -(windowHeight / 2 - (assetTopRelativeToViewport + height / 2));
			setInitialY(calculatedY);
		}
	}, [height, assetRef, windowHeight]);

	const assetYEndValue = videoLoaded ? 0 : -initialY;

	return (
		<div ref={containerRef} className="relative min-h-screen overflow-hidden bg-black pt-44 text-white">
			<div className="absolute inset-0 flex h-screen items-center justify-center">
				<LogoLoader videoLoaded={videoLoaded} />
			</div>
			<div className="mx-auto w-full max-w-[3000px]  ">
				<div className="">
					<div className="px-8">
						<h1 className="t-144 mx-auto max-w-[1376px] text-center font-black uppercase">
							<span className="whitespace-nowrap">
								<TextContainer custom={4}>
									<FontSwitcher startDelay={4800} text="F<pst-grid-pst>i</>nd" />
								</TextContainer>{" "}
								<TextContainer custom={3}>your</TextContainer>{" "}
								<TextContainer custom={2}>
									{" "}
									<FontSwitcher startDelay={5000} text="n<pst-grid-pst>e</>w" />
								</TextContainer>{" "}
								<br />
							</span>
						</h1>
					</div>
					<div ref={assetRef} className="mt-[72px]">
						<div ref={ref}>
							<motion.div
								style={{ scale: assetScaleSpring }}
								initial={{
									clipPath: "inset(0% 50% 0% 50%)",
								}}
								animate={{
									clipPath: videoLoaded ? "inset(0% 0% 0% 0)" : "inset(0% 50% 0% 50%)",
									y: [animationComplete ? assetYEndValue : -initialY, assetYEndValue],
								}}
								transition={{
									duration: 0.8,
									ease: "easeInOut",
									delay: 1.3,
									y: {
										delay: 4,
										type: "spring",
										stiffness: 180,
										damping: 23,
										onComplete: () => setAnimationComplete(true),
									},
								}}
								className="bg-stone/0.01 mx-auto aspect-[1920/1080] max-h-[90vh] w-full "
							>
								<motion.div
									initial={{
										scale: 0.8,
									}}
									animate={{
										scale: videoLoaded ? 1 : 0.8,
									}}
									transition={{
										type: "spring",
										stiffness: 80,
										damping: 18,
										delay: 1.4,
									}}
									className="h-full w-full"
								>
									<div className="h-full w-full">
										<Asset {...asset} parentInView={isInView} onVideoLoad={handleVideoLoad} className="h-full w-full object-cover" />
									</div>
								</motion.div>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default LoaderMasthead;

const logoLoaderVariants = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: [null, 1, 0],
	},
};

const LogoLoader = ({ videoLoaded }) => {
	return (
		<motion.div initial="initial" animate="animate" className="text-[8.2vw]">
			<motion.span
				initial={{
					x: 0,
					opacity: 1,
				}}
				animate={{
					x: videoLoaded ? -500 : 0,
					opacity: videoLoaded ? 0 : 1,
				}}
				transition={{
					duration: 0.4,
					delay: 1.5,
				}}
				className="inline-block font-heading font-black"
			>
				NEW
			</motion.span>
			<motion.div
				initial={{
					x: 0,
					opacity: 1,
				}}
				animate={{
					x: videoLoaded ? 500 : 0,
					opacity: videoLoaded ? 0 : 1,
				}}
				transition={{
					duration: 0.4,
					delay: 1.5,
				}}
				className=" relative inline-block"
			>
				<motion.div
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					transition={{
						duration: 0.4,
						delay: 1.2,
					}}
					className="absolute inset-0  "
				>
					<span className="font-">G</span>
					<span className="font-gridular">E</span>
					<span className="font-recoleta">N</span>
				</motion.div>
				<motion.span
					variants={logoLoaderVariants}
					transition={{
						duration: 0.4,
						delay: 0.9,
					}}
					className="absolute inset-0 font-gridular "
				>
					GEN
				</motion.span>
				<motion.span
					variants={logoLoaderVariants}
					transition={{
						duration: 0.4,
						delay: 0.6,
					}}
					className="absolute inset-0 font-pilowlava "
				>
					GEN
				</motion.span>
				<motion.span
					initial={{
						opacity: 1,
					}}
					animate={{
						opacity: 0,
					}}
					transition={{
						duration: 0.4,
						delay: 0.3,
					}}
					className="font-haltwins "
				>
					GEN
				</motion.span>
			</motion.div>
		</motion.div>
	);
};

const TextContainer = ({ children, custom = 0 }) => {
	return (
		<div className="inline-flex overflow-hidden">
			<motion.span
				initial={{
					y: 50,
					opacity: 0,
				}}
				animate={{
					y: 0,
					opacity: 1,
					transition: { type: "spring", stiffness: 1000, damping: 15, mass: 0.3, delay: 4.5 + custom * 0.15 },
				}}
				style={{ display: "inline-flex", willChange: "transform" }}
			>
				{children}
			</motion.span>
		</div>
	);
};
