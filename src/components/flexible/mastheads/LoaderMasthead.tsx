import Asset from "~/components/elements/Asset";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { useMeasure, useWindowSize } from "react-use";
import { useEffect, useRef, useState } from "react";

const LoaderMasthead = (props) => {
	const { asset } = props;

	const assetRef = useRef(null);
	const { scrollY } = useScroll();

	const assetScaleBase = useTransform(scrollY, [0, 400], [0.95, 1]);
	const assetScaleSpring = useSpring(assetScaleBase, { stiffness: 200, damping: 30, mass: 1 });
	const [initialY, setInitialY] = useState(0);
	const [animationComplete, setAnimationComplete] = useState(false);

	const [ref, { height }] = useMeasure() as any;
	const { height: windowHeight } = useWindowSize();

	useEffect(() => {
		if (!assetRef.current) return;
		if (height && typeof window !== "undefined") {
			const assetTopRelativeToViewport = assetRef.current.getBoundingClientRect().top;
			const calculatedY = -(windowHeight / 2 - (assetTopRelativeToViewport + height / 2));
			setInitialY(calculatedY);
		}
	}, [height, ref, windowHeight]);

	return (
		<div className="relative min-h-screen overflow-hidden bg-black pt-44 text-white">
			<div className="absolute inset-0 flex h-screen items-center justify-center">
				<LogoLoader />
			</div>
			<div className="mx-auto w-full max-w-[3000px]  ">
				<div className="">
					<div className="px-8">
						<h1 className="t-144 mx-auto max-w-[1376px] text-center font-black uppercase">
							<span className="whitespace-nowrap">
								<TextContainer custom={4}>
									<FontSwitcher startDelay={4800} text="W<pst-grid-pst>e</>lcome" />
								</TextContainer>{" "}
								<TextContainer custom={3}>to</TextContainer> <TextContainer custom={2}>the</TextContainer> <br />
							</span>
							<span className="whitespace-nowrap">
								<TextContainer custom={1}>new</TextContainer>{" "}
								<TextContainer custom={0}>
									<FontSwitcher startDelay={5000} text="gener<pst-grid-pst>a</>tion" />
								</TextContainer>
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
									clipPath: "inset(0% 0% 0% 0)",
									y: [animationComplete ? 0 : -initialY, 0],
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
										scale: 1.4,
									}}
									animate={{
										scale: 1,
									}}
									transition={{
										type: "spring",
										stiffness: 80,
										damping: 18,
										delay: 1.3,
									}}
									className="h-full w-full"
								>
									<div className="h-full w-full">
										<Asset {...asset} className="h-full w-full object-cover" />
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

const LogoLoader = () => {
	return (
		<motion.div initial="initial" animate="animate" className="text-[8.2vw]">
			<motion.span
				initial={{
					x: 0,
					opacity: 1,
				}}
				animate={{
					x: -500,
					opacity: 0,
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
					x: 500,
					opacity: 0,
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
					transition: { type: "spring", stiffness: 1000, damping: 30, mass: 0.2, delay: 4.5 + custom * 0.15 },
				}}
				style={{ display: "inline-flex", willChange: "transform" }}
			>
				{children}
			</motion.span>
		</div>
	);
};
