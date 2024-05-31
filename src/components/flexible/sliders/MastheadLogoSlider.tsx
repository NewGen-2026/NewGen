import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import WpImage from "~/components/elements/WpImage";

const MastheadLogoSlider = ({
	items,
	setSwiper,
	handleSlideChange,
	activeSlide,
	duplicatedItems,
	handleLogoClick,
	logoOpacity,
	filterClassMap,
	autoplayStarted,
}) => {
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
				delay: autoplayStarted ? 2500 : 500,
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
			{duplicatedItems.map((item, i) => (
				<SwiperSlide
					key={`logo-${i}`}
					onClick={() => handleLogoClick(i % items.length)}
					className={`w-full max-w-[150px]  transition-opacity  duration-200 md:max-w-[206px] ${activeSlide === i % items.length ? "" : logoOpacity}`}
				>
					<div className="aspect-[206/87] w-full">
						<WpImage image={item?.logo} priority className="h-full w-full object-contain" />
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
};
export default MastheadLogoSlider;
