import { domAnimation, LazyMotion, m } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { FreeMode, Mousewheel } from "swiper/modules";
import { useRef } from "react";
import FeedPreview from "~/components/feed/FeedPreview";
import SliderNavigation from "./SliderNavigation";

const FeedSlider = ({ items }) => {
	const swiperRef = useRef(null);

	return (
		<LazyMotion features={domAnimation}>
			<div className="w-full">
				<Swiper
					ref={swiperRef}
					className="!overflow-visible"
					spaceBetween={48}
					loop
					slidesPerView={3.35}
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
							spaceBetween: 48,
						},
					}}
					mousewheel={{ forceToAxis: true, thresholdDelta: 0.2, sensitivity: 1.4 }}
				>
					{items.map((item, i) => (
						<SwiperSlide key={`item-${i}`} className="!h-auto w-full max-w-[396px]">
							<FeedPreview variant="slide" className="!w-full" imageClass="!w-full !max-w-none" {...item?.post} />
						</SwiperSlide>
					))}
				</Swiper>

				<SliderNavigation swiperRef={swiperRef} />
			</div>
		</LazyMotion>
	);
};
export default FeedSlider;
