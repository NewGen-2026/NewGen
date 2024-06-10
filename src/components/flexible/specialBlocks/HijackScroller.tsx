import { motion } from "framer-motion";
import { forwardRef, useRef } from "react";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Mousewheel } from "swiper/modules";
import SliderNavigation from "../sliders/SliderNavigation";

const HijackScroller = (props) => {
	const { items } = props;
	const swiperRef = useRef(null);

	return (
		<div>
			<Swiper
				ref={swiperRef}
				className="!overflow-visible"
				slidesPerView={3}
				spaceBetween={15}
				grabCursor
				modules={[Mousewheel, FreeMode]}
				pagination={{ clickable: true }}
				direction="horizontal"
				mousewheel={{ forceToAxis: true, thresholdDelta: 0.2, sensitivity: 1.4 }}
				breakpoints={{
					"@0.00": {
						slidesPerView: 1.1,
						spaceBetween: 15,
					},
					"@0.6": {
						slidesPerView: 1.3,
						spaceBetween: 15,
					},
					"@1.00": {
						slidesPerView: 1.725,
						spaceBetween: 32,
					},
				}}
			>
				{items?.map((item, i) => (
					<SwiperSlide
						key={`item-${i}`}
						className="!flex !h-auto min-h-[580px] flex-col overflow-hidden  sm:min-h-[350px] md:min-h-[788px] tiny-laptop:min-h-[580px]"
					>
						<ScrollItem key={`item-${i}`} item={item} />
					</SwiperSlide>
				))}
			</Swiper>

			<div className="mt-6 md:hidden">
				<SliderNavigation swiperRef={swiperRef} />
			</div>
		</div>
	);
};
export default HijackScroller;

interface ScrollItemProps {
	item: any;
}

const ScrollItem = forwardRef<HTMLDivElement, ScrollItemProps>(({ item }, ref) => {
	return (
		<motion.div ref={ref} className="h-full min-h-[250px] min-w-[90vw] sm:min-h-[350px] md:!min-h-[443px] md:min-w-[55vw] laptop:min-w-[45vw]">
			<div className="aspect-[790/519] w-full bg-stone/20 tiny-laptop:max-h-[400px] ">
				<WpImage image={item?.image} className="h-full w-full object-cover" />
			</div>
			<div className="mt-5 max-w-[744px] md:mt-[65px] laptop:mt-8">
				<h3 className="t-64 font-black uppercase">
					<FontSwitcher text={item?.heading} />
				</h3>
				<div className="t-18 mt-3 whitespace-normal font-medium !leading-[1.35] opacity-70 md:mt-6">{item?.content}</div>
			</div>
		</motion.div>
	);
});
