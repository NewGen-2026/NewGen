import { domAnimation, LazyMotion, m } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { FreeMode, Mousewheel } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";
import SliderNavigation from "./SliderNavigation";
import CreatorCard from "../creatorBlocks/CreatorCard";

const useResponsiveSwiper = () => {
	const { width, height } = useWindowSize();
	const [swiperSettings, setSwiperSettings] = useState({
		slidesPerView: 1,
		spaceBetween: 40,
	});

	useEffect(() => {
		if (width > 1280 && height < 755) {
			setSwiperSettings({
				slidesPerView: 3.6,
				spaceBetween: 24,
			});
		} else if (width > 768) {
			setSwiperSettings({
				slidesPerView: 3.1,
				spaceBetween: 32,
			});
		} else if (width > 300) {
			setSwiperSettings({
				slidesPerView: 1.3,
				spaceBetween: 12,
			});
		} else {
			setSwiperSettings({
				slidesPerView: 1.3,
				spaceBetween: 12,
			});
		}
	}, [width, height]);

	return swiperSettings;
};

const CreatorsSlider = ({ items }) => {
	const swiperRef = useRef(null);

	const { slidesPerView, spaceBetween } = useResponsiveSwiper();

	return (
		<LazyMotion features={domAnimation}>
			<div className="container">
				<Swiper
					ref={swiperRef}
					className="!overflow-visible"
					spaceBetween={spaceBetween}
					loop
					slidesPerView={slidesPerView}
					modules={[FreeMode, Mousewheel]}
					freeMode={{
						enabled: true,
						momentum: true,
						minimumVelocity: 0.02,
						momentumRatio: 1,
						momentumVelocityRatio: 0.1,
					}}
					mousewheel={{ forceToAxis: true, thresholdDelta: 0.2, sensitivity: 1.4 }}
				>
					{items.map((item, i) => (
						<SwiperSlide key={`item-${i}`} className="!h-auto w-full">
							<CreatorCard creator={item} />
						</SwiperSlide>
					))}
				</Swiper>

				<SliderNavigation swiperRef={swiperRef} />
			</div>
		</LazyMotion>
	);
};

export default CreatorsSlider;
