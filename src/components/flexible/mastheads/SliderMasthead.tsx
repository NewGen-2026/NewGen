import TextCard from "~/components/elements/text/TextCard";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import dynamic from "next/dynamic";
import WpImage from "~/components/elements/WpImage";
import { getBgColorClasses } from "~/utils/getColors";

const MastheadTransitionSlider = dynamic(() => import("../sliders/MastheadTransitionSlider"), { ssr: false });

const SliderMasthead = (props) => {
	const { items, text_card, subheading } = props;

	const ref = useRef(null);

	const isInView = useInView(ref);

	const [swiper, setSwiper] = useState(null);
	const [activeSlide, setActiveSlide] = useState(null);

	const handleSlideChange = (s) => {
		const totalUniqueItems = items.length;
		const correctActiveIndex = (s.realIndex + totalUniqueItems) % totalUniqueItems;
		setActiveSlide(correctActiveIndex);
	};

	useEffect(() => {
		if (!swiper) return;
		if (swiper) {
			if (isInView) {
				swiper?.autoplay?.start();
			} else {
				swiper?.autoplay?.pause();
			}
		}
	}, [isInView, swiper]);

	return (
		<div className="pt-8 md:pt-12 tiny-laptop:pt-4">
			<div className="container">
				<div className="flex w-full flex-col justify-between gap-5 gap-y-8 md:flex-row">
					<div className="flex max-w-[704px] flex-1 flex-col items-center gap-y-5 md:items-start md:justify-between">
						<h1 className="t-15 font-bold uppercase">{subheading}</h1>
						<div className="flex w-full flex-1 items-center justify-center md:justify-start">
							<TextCard {...text_card} containerClass="!mx-0" />
						</div>
					</div>
					<div className="mx-[-15px] flex-1 md:mx-0  md:w-[unset] md:max-w-[555px]">
						<div className=" w-full flex-1 bg-stone/10 md:w-[unset] md:max-w-[555px]">
							<div className="relative aspect-[555/600] w-full overflow-hidden ">
								{items &&
									items?.map((item, i) => (
										<motion.div
											key={`image${i}`}
											initial={{ opacity: 0 }}
											animate={{ opacity: activeSlide === i ? 1 : 0 }}
											transition={{ delay: 0.3 }}
											className="absolute inset-0 h-full w-full bg-stone/20"
										>
											<WpImage image={item?.image} priority className="h-full w-full object-cover" />
										</motion.div>
									))}
								{activeSlide !== null && (
									<motion.div
										key={activeSlide}
										initial={{ y: "100%" }}
										animate={{ y: [null, "0%", "-100%"] }}
										transition={{
											duration: 0.8,
											ease: "easeInOut",
										}}
										className={`absolute inset-0 z-10 ${getBgColorClasses(items[activeSlide]?.transition_color || "boost")}`}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mx-auto mt-8 w-full max-w-[1440px] md:mt-12 xl:min-h-[87.5px]">
				<MastheadTransitionSlider items={items} setSwiper={setSwiper} handleSlideChange={handleSlideChange} activeSlide={activeSlide} />
			</div>
		</div>
	);
};
export default SliderMasthead;
