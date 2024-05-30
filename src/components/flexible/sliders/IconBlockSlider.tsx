import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { FreeMode, Mousewheel } from "swiper/modules";
import { useRef } from "react";
import IconsRenderer from "~/components/elements/icons/IconsRenderer";
import { domAnimation, LazyMotion, m } from "framer-motion";
import IconBlockItem from "./IconBlockItem";

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
					slidesPerView={3.1}
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

				<div className="container mt-8 flex justify-end gap-6 md:mt-12">
					<m.button
						whileTap={{ scale: 0.9 }}
						onClick={() => {
							swiperRef.current.swiper.slidePrev();
						}}
					>
						<div className="h-4 w-4 rotate-[90deg]">
							<IconsRenderer icon="arrow" />
						</div>
					</m.button>

					<m.button
						whileTap={{ scale: 0.9 }}
						onClick={() => {
							swiperRef.current.swiper.slideNext();
						}}
					>
						<div className="h-4 w-4 rotate-[-90deg]">
							<IconsRenderer icon="arrow" />
						</div>
					</m.button>
				</div>
			</div>
		</LazyMotion>
	);
};
export default IconBlockSlider;
