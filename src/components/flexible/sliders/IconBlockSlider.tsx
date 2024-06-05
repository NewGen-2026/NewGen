import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { FreeMode, Mousewheel } from "swiper/modules";
import { useRef } from "react";
import { domAnimation, LazyMotion, m } from "framer-motion";
import IconBlockItem from "./IconBlockItem";
import SliderNavigation from "./SliderNavigation";

const IconBlockSlider = ({ items }) => {
	const swiperRef = useRef(null);

	return (
		<LazyMotion features={domAnimation}>
			<div className="w-full">
				<Swiper
					ref={swiperRef}
					className="!overflow-visible"
					spaceBetween={32}
					loop
					slidesPerView="auto"
					modules={[FreeMode, Mousewheel]}
					freeMode={{
						enabled: true,
						momentum: true,
						minimumVelocity: 0.02,
						momentumRatio: 1,
						momentumVelocityRatio: 0.1,
					}}
					breakpoints={{
						"@0.00": {
							spaceBetween: 12,
							slidesPerView: 1.3,
						},
						"@0.75": {
							spaceBetween: 32,
						},
					}}
					mousewheel={{ forceToAxis: true, thresholdDelta: 0.2, sensitivity: 1.4 }}
				>
					{items.map((item, i) => (
						<SwiperSlide key={`item-${i}`} className="w-full max-w-[420px]">
							<IconBlockItem item={item} />
						</SwiperSlide>
					))}
				</Swiper>

				<SliderNavigation swiperRef={swiperRef} />
			</div>
		</LazyMotion>
	);
};
export default IconBlockSlider;
