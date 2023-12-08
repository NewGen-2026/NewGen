/* eslint-disable no-unsafe-optional-chaining */
import Asset from "~/components/elements/Asset";
import TextCard from "~/components/elements/text/TextCard";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TwoColTextAsset = (props) => {
	const { content, media, options } = props;
	const ref = useRef(null);

	const isInView = useInView(ref, { once: false });

	const [activeIndex, setActiveIndex] = useState(0);
	const [overlayY, setOverlayY] = useState("100%");
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setIsTransitioning(true);

			setTimeout(() => {
				setActiveIndex((prevIndex) => (prevIndex + 1) % media?.assets.length);
				setOverlayY("-100%");
			}, 500);

			setTimeout(() => {
				setOverlayY("100%");
				setIsTransitioning(false);
			}, 2000);
		}, 3000);

		return () => clearInterval(interval);
	}, [media?.assets.length]);

	return (
		<div
			ref={ref}
			className={`flex  items-center justify-between gap-6 gap-y-12 ${options?.reverse_mobile ? "flex-col-reverse" : "flex-col"} ${
				options?.reverse ? "md-large:flex-row-reverse" : "md-large:flex-row"
			}`}
		>
			<div className={` w-auto  md:max-w-[50%] ${options?.reverse ? "xl:mr-3" : ""}`}>
				<TextCard {...content?.text_card} className={` ${options?.reverse ? "ml-auto" : "mr-auto"}`} breakpoint={890} />
			</div>

			<div className="w-full max-w-[672px] md:flex-1">
				<div className="relative aspect-[672/672] w-full overflow-hidden bg-stone/10">
					{media?.assets &&
						media?.assets?.map((asset, index) => (
							<motion.div
								key={`asset${index}`}
								style={{
									zIndex: activeIndex === index ? (isTransitioning ? 2 : 3) : 1,
								}}
								initial={{ y: "100%" }}
								animate={{ y: activeIndex === index ? 0 : "100%" }}
								transition={{
									type: "spring",
									stiffness: 120,
									damping: 20,
									delay: index === activeIndex ? 0.2 : 1.1,
								}}
								className="absolute inset-0 h-full w-full"
							>
								<Asset {...asset} className="h-full w-full object-cover" />
							</motion.div>
						))}

					<motion.div
						initial={{ y: "100%" }}
						animate={{ y: overlayY }}
						transition={{ duration: 0.8 }}
						style={{
							zIndex: 2,
						}}
						className="absolute inset-0 bg-electric"
					/>
				</div>
			</div>
		</div>
	);
};
export default TwoColTextAsset;
