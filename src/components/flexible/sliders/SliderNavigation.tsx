import IconsRenderer from "~/components/elements/icons/IconsRenderer";
import { m } from "framer-motion";

const SliderNavigation = ({ swiperRef }) => {
	return (
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
	);
};
export default SliderNavigation;
