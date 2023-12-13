import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import Asset from "~/components/elements/Asset";
import { FreeMode, Mousewheel } from "swiper/modules";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";

const AssetSliderInner = ({ items }) => {
	return (
		<Swiper
			className="!overflow-visible"
			spaceBetween={32}
			loop
			slidesPerView={2.3}
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
				<SwiperSlide key={`item-${i}`} className="w-full max-w-[555px]">
					<AssetSlide item={item} />
				</SwiperSlide>
			))}
			{items.map((item, i) => (
				<SwiperSlide key={`item-${i}`} className="w-full max-w-[555px]">
					<AssetSlide item={item} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};
export default AssetSliderInner;

const AssetSlide = ({ item }) => {
	return (
		<>
			<div className="aspect-[555/313] w-full">
				<Asset {...item?.asset} className=" h-full w-full object-cover" />
			</div>
			<div className="t-32 mt-10 max-w-[520px] font-heading font-black uppercase">{item?.caption && <FontSwitcher text={item?.caption} />}</div>
		</>
	);
};
