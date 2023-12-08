import { useEffect, useRef, useState } from "react";
import WpImage from "~/components/elements/WpImage";
import { getBgColorClasses } from "~/utils/getColors";
import { motion } from "framer-motion";
import getFontClass from "~/utils/getFontClass";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const ConnectingMasthead = (props) => {
	const { top_line, middle_line_left, middle_line_right, bottom_line, items } = props;

	const [swiper, setSwiper] = useState(null);
	const [activeSlide, setActiveSlide] = useState(null);

	const duplicatedItems = [...items, ...items, ...items];

	const [isInitialLoad, setIsInitialLoad] = useState(true);

	useEffect(() => {
		const initialLoadDelay = 1500;
		const timer = setTimeout(() => {
			setIsInitialLoad(false);
		}, initialLoadDelay);

		return () => clearTimeout(timer);
	}, []);

	const handleSlideChange = (s) => {
		if (!isInitialLoad) {
			const totalUniqueItems = items.length;
			const correctActiveIndex = (s.realIndex + totalUniqueItems) % totalUniqueItems;
			setActiveSlide(correctActiveIndex);
		}
	};
	const handleLogoClick = (index) => {
		if (swiper) {
			swiper.slideTo(index);
		}
	};

	const logoOpacity = !isInitialLoad ? "opacity-50" : "opacity-100";

	const filterClassMap = {
		candy: "filter-candy",
		electric: "filter-electric",
		sand: "filter-sand",
	};

	return (
		<div className={`pb-5 pt-32 transition-colors duration-200 md:pt-52 ${getBgColorClasses(items[activeSlide]?.active_color)}`}>
			<div className="container">
				<Title
					top_line={top_line}
					middle_line_left={middle_line_left}
					middle_line_right={middle_line_right}
					bottom_line={bottom_line}
					items={items}
					activeSlide={activeSlide}
				/>
			</div>

			<div className="mx-auto mt-12 max-w-[1440px]  md:mt-[175px] ">
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
						delay: !isInitialLoad ? 2500 : 1500,
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
							className={`w-full max-w-[150px]  transition-opacity ${
								activeSlide === i % items.length ? filterClassMap[items[activeSlide]?.active_color] : ""
							}  duration-200 md:max-w-[206px] ${activeSlide === i % items.length ? "" : logoOpacity}`}
						>
							<WpImage image={item?.logo} priority />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};
export default ConnectingMasthead;

const Title = ({ top_line, middle_line_left, middle_line_right, bottom_line, items, activeSlide }) => {
	return (
		<h1 className="t-144 text-center font-black uppercase">
			<span className="relative z-[0] block">
				C<span className={`${getFontClass(items[activeSlide]?.hover_font)}`}>o</span>nnecting
			</span>
			<div className="relative inline-flex">
				<motion.span
					className="relative inline-block"
					initial={{
						x: 0,
					}}
					animate={{
						x: activeSlide !== null ? -50 : 0,
					}}
				>
					{middle_line_left}
				</motion.span>
				<motion.span
					initial={{
						x: 0,
					}}
					animate={{
						x: activeSlide !== null ? 50 : 0,
					}}
					className="relative inline-block"
				>
					<span>wh</span>
					<span className={`${getFontClass(items[activeSlide]?.hover_font)}`}>a</span>
					<span>{`t's`}</span>
				</motion.span>
				<div className="absolute inset-0 flex items-center justify-center">
					{items?.map((item, i) => (
						<motion.div
							key={`logoLoader${i}`}
							variants={{
								initial: {
									opacity: 0,
									scale: 0,
								},
								animate: {
									opacity: 1,
									scale: 1,
								},
							}}
							initial="initial"
							animate={activeSlide === i ? "animate" : "initial"}
							className="absolute inset-0 mx-auto flex w-full max-w-[20.3%] items-center justify-center"
						>
							<WpImage image={item?.feature_image} priority />
						</motion.div>
					))}
				</div>
			</div>
			<span className="relative z-[20] block ">{bottom_line}</span>
		</h1>
	);
};
