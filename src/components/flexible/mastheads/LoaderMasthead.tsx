import Asset from "~/components/elements/Asset";
import { motion, useInView } from "framer-motion";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { useMeasure, useWindowSize } from "react-use";
import { useContext, useEffect, useRef, useState } from "react";
import { VideoLoadedContext } from "~/utils/context";
import LogoLoader from "~/components/elements/animations/LogoLoader";

const LoaderMasthead = (props) => {
	const { asset } = props;

	const assetRef = useRef(null);
	const logoRef = useRef(null);
	const containerRef = useRef(null);

	const [initialY, setInitialY] = useState(0);
	const [initialYMobile, setInitialYMobile] = useState(0);
	const [animationComplete, setAnimationComplete] = useState(false);
	const { videoLoaded, setVideoLoaded } = useContext(VideoLoadedContext);

	const [ref, { height }] = useMeasure() as any;
	const { height: windowHeight, width: windowWidth } = useWindowSize();
	const isInView = useInView(containerRef, { once: false, amount: 0.6 });

	const handleVideoLoad = () => {
		setVideoLoaded(true);
	};

	useEffect(() => {
		if (!assetRef.current || !logoRef.current) return;
		if (height && typeof window !== "undefined") {
			const logoTopRelativeToViewport = logoRef.current.getBoundingClientRect().top;
			const logoHeight = logoRef.current.offsetHeight;
			const assetHeight = assetRef.current.offsetHeight;

			const calculatedY = logoTopRelativeToViewport + logoHeight / 2 - assetHeight / 2;
			setInitialYMobile(calculatedY);
		}
	}, [height, assetRef, logoRef, windowHeight]);

	useEffect(() => {
		if (!assetRef.current) return;
		if (height && typeof window !== "undefined") {
			const assetTopRelativeToViewport = assetRef.current.getBoundingClientRect().top;
			const calculatedY = -(windowHeight / 2 - (assetTopRelativeToViewport + height / 2));
			setInitialY(calculatedY);
		}
	}, [height, assetRef, windowHeight]);

	const assetInitialY = windowWidth < 1024 ? -initialYMobile : initialY;
	const assetYEndValue = videoLoaded ? 0 : -assetInitialY;

	return (
		<div className="relative overflow-hidden bg-black pb-20 text-white md:pb-32   lg:min-h-screen tiny-laptop:pb-20 ">
			<div ref={containerRef} className="container absolute inset-0 flex items-center justify-center lg:h-screen">
				<div ref={logoRef} className="mx-auto w-full max-w-[60vw] md:max-w-[500px]">
					<LogoLoader videoLoaded={videoLoaded} />
				</div>
			</div>
			<div className="mx-auto w-full max-w-[3000px]  ">
				<div className="">
					<div ref={assetRef} className="">
						<div ref={ref}>
							<motion.div
								initial={{
									clipPath: "inset(0% 50% 0% 50%)",
								}}
								animate={{
									clipPath: videoLoaded ? "inset(0% 0% 0% 0)" : "inset(0% 50% 0% 50%)",
									y: [animationComplete ? assetYEndValue : -assetInitialY, assetYEndValue],
								}}
								transition={{
									duration: 0.8,
									ease: "easeInOut",
									delay: 1.3,
									y: {
										delay: 3,
										type: "spring",
										stiffness: 180,
										damping: 23,
										onComplete: () => setAnimationComplete(true),
									},
								}}
								className="bg-stone/0.01 mx-auto aspect-[1920/1080] w-full will-change-transform laptop:max-h-[90vh]  "
							>
								<motion.div
									initial={{
										scale: 1.1,
									}}
									animate={{
										scale: videoLoaded ? 1 : 1.1,
									}}
									transition={{
										type: "spring",
										stiffness: 80,
										damping: 18,
										delay: 3,
									}}
									className="h-full w-full"
								>
									<div className="h-full w-full">
										<Asset {...asset} parentInView={isInView} onVideoLoad={handleVideoLoad} className="h-full w-full object-cover object-center" />
									</div>
								</motion.div>
							</motion.div>
						</div>
					</div>

					<div className="px-8">
						<h1 className="t-144-xxlarge mx-auto mt-20 max-w-[1376px] text-center font-black uppercase md:mt-32 tiny-laptop:mt-20">
							<span className="">
								<TextContainer startAnimation={videoLoaded} custom={4}>
									<FontSwitcher startDelay={3800} text="H<pst-grid-pst>e</>llo " />
								</TextContainer>{" "}
								<TextContainer startAnimation={videoLoaded} custom={3}>
									welcome
								</TextContainer>{" "}
								<br />
								<span className="whitespace-nowrap">
									<TextContainer startAnimation={videoLoaded} custom={3}>
										to
									</TextContainer>{" "}
									<TextContainer startAnimation={videoLoaded} custom={2}>
										{" "}
										<FontSwitcher startDelay={4000} text="newg<pst-grid-pst>e</>n" />
									</TextContainer>{" "}
								</span>
							</span>
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
};
export default LoaderMasthead;

const TextContainer = ({ children, custom = 0, startAnimation }) => {
	return (
		<div className="inline-flex ">
			<motion.span
				initial={{
					y: "0.2em",
					opacity: 0,
				}}
				animate={{
					y: startAnimation ? 0 : "0.2em",
					opacity: startAnimation ? 1 : 0,
					transition: { type: "spring", stiffness: 1200, damping: 15, mass: 0.2, delay: 3.5 + custom * 0.1 },
				}}
				style={{ display: "inline-flex", willChange: "transform" }}
			>
				{children}
			</motion.span>
		</div>
	);
};
