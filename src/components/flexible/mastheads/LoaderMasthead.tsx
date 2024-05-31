import Asset from "~/components/elements/Asset";
import { motion, useInView } from "framer-motion";
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
		<div className="relative min-h-[280px] overflow-hidden  bg-black text-white lg:min-h-screen ">
			<div ref={containerRef} className="container absolute inset-0 flex items-center justify-center lg:h-screen">
				<div ref={logoRef} className="mx-auto w-full max-w-[60vw] md:max-w-[500px]">
					<LogoLoader videoLoaded={videoLoaded} />
				</div>
			</div>
			<div className="absolute inset-0 mx-auto h-full w-full max-w-[3000px] md:absolute ">
				<div className="h-full w-full">
					<div ref={assetRef} className="h-full w-full">
						<div ref={ref} className="h-full w-full">
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
								className="bg-stone/0.01 mx-auto  h-full w-full  will-change-transform "
							>
								<motion.div
									initial={{
										transform: "scale(1.1)",
									}}
									animate={{
										transform: videoLoaded ? "scale(1)" : "scale(1.1)",
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
				</div>
			</div>
		</div>
	);
};
export default LoaderMasthead;
