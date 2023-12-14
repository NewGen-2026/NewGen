import TextCard from "~/components/elements/text/TextCard";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import dynamic from "next/dynamic";

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
				swiper.autoplay.start();
			} else {
				swiper.autoplay.pause();
			}
		}
	}, [isInView, swiper]);

	return (
		<div className="pt-8 md:pt-12">
			<div className="container">
				<div className="flex w-full flex-col items-center justify-between gap-5 gap-y-8 md:flex-row">
					<div className="max-w-[704px] flex-1">
						<TextCard {...text_card} />
					</div>
					<div className="w-full flex-1 bg-stone/10 md:w-[unset] md:max-w-[555px]">
						<div className="aspect-[555/600]  w-full" />
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
