import TextCard from "~/components/elements/text/TextCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import WpImage from "~/components/elements/WpImage";

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
			<div className="mx-auto mt-8 w-full max-w-[1440px] md:mt-12">
				<Swiper
					className="!pointer-events-none w-full"
					onSwiper={setSwiper}
					onSlideChange={(s) => handleSlideChange(s)}
					// slidesPerView={7}
					loop
					noSwiping
					centeredSlides
					modules={[Autoplay]}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					breakpoints={{
						"@0.00": {
							slidesPerView: 4,
							spaceBetween: -20,
						},
						"@0.6": {
							slidesPerView: 7,
							spaceBetween: 0,
						},
					}}
				>
					{items.map((item, i) => (
						<SwiperSlide
							key={`logo-${i}`}
							// onClick={() => handleLogoClick(i % items.length)}
							className={`w-full max-w-[150px]  transition-opacity  duration-200 md:max-w-[206px] ${activeSlide === i % items.length ? "" : "opacity-50"}`}
						>
							<WpImage image={item?.logo} priority={i === 0} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};
export default SliderMasthead;
