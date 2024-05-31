import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import WpImage from "~/components/elements/WpImage";

const MastheadTransitionSlider = ({ items, setSwiper, handleSlideChange, activeSlide }) => {
	return (
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
				delay: 3500,
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
			{items.map((item, i) => (
				<SwiperSlide
					key={`logo-${i}-2`}
					// onClick={() => handleLogoClick(i % items.length)}
					className={`w-full max-w-[150px]  transition-opacity  duration-200 md:max-w-[206px] ${activeSlide === i % items.length ? "" : "opacity-50"}`}
				>
					<WpImage image={item?.logo} priority={i === 0} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};
export default MastheadTransitionSlider;
