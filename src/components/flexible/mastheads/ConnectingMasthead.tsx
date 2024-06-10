import { useEffect, useRef, useState } from "react";
import WpImage from "~/components/elements/WpImage";
import { getBgColorClasses } from "~/utils/getColors";
import { motion, useInView } from "framer-motion";
import getFontClass from "~/utils/getFontClass";
import dynamic from "next/dynamic";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";

const MastheadLogoSlider = dynamic(() => import("../sliders/MastheadLogoSlider"), { ssr: false });

const ConnectingMasthead = (props) => {
	const { top_line, middle_line_left, middle_line_right, bottom_line, items } = props;

	const ref = useRef(null);

	const isInView = useInView(ref);

	const [swiper, setSwiper] = useState(null);
	const [activeSlide, setActiveSlide] = useState(null);

	const duplicatedItems = [...items, ...items, ...items];

	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const [autoplayStarted, setAutoplayStarted] = useState(false);

	useEffect(() => {
		const initialLoadDelay = 1000;
		const timer = setTimeout(() => {
			setIsInitialLoad(false);
		}, initialLoadDelay);

		return () => clearTimeout(timer);
	}, []);

	const handleSlideChange = (s) => {
		if (!isInitialLoad) {
			setAutoplayStarted(true);
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

	useEffect(() => {
		if (!swiper) return;
		if (isInitialLoad) {
			swiper.autoplay.stop();
		} else if (isInView) {
			swiper?.autoplay?.start();
		} else {
			swiper?.autoplay?.pause();
		}
	}, [isInView, swiper, isInitialLoad]);

	const logoOpacity = isInitialLoad || !autoplayStarted ? "!opacity-100 !brightness-0" : "opacity-50 !brightness-0";

	const filterClassMap = {
		candy: "filter-candy",
		electric: "filter-electric",
		sand: "filter-sand",
	};

	return (
		<div ref={ref} className={`pb-5 pt-32 transition-colors duration-200 md:pt-52 laptop:pt-40 ${getBgColorClasses(items[activeSlide]?.active_color)}`}>
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

			<div className="mx-auto mt-12 max-h-[87.5px] max-w-[1440px] md:mt-[175px]  xl:min-h-[87.5px] tiny-laptop:mt-12 laptop:mt-12 ">
				<MastheadLogoSlider
					items={items}
					setSwiper={setSwiper}
					handleSlideChange={handleSlideChange}
					activeSlide={activeSlide}
					duplicatedItems={duplicatedItems}
					handleLogoClick={handleLogoClick}
					logoOpacity={logoOpacity}
					filterClassMap={filterClassMap}
					autoplayStarted={autoplayStarted}
				/>
			</div>
		</div>
	);
};
export default ConnectingMasthead;

const Title = ({ top_line, middle_line_left, middle_line_right, bottom_line, items, activeSlide }) => {
	return (
		<h1 className="t-144 text-center font-black uppercase">
			<span className="relative z-[0] block">
				<FontSwitcher text={top_line} />
				{/* {top_line} */}
				{/* C<span className={`${getFontClass(items[activeSlide]?.hover_font)}`}>o</span>nnecting */}
			</span>
			<div className="relative inline-flex">
				<motion.span
					className="relative inline-block"
					initial={{
						x: 0,
					}}
					animate={{
						x: activeSlide !== null ? "-0.5em" : 0,
					}}
				>
					{middle_line_left}
				</motion.span>
				<motion.span
					initial={{
						x: 0,
					}}
					animate={{
						x: activeSlide !== null ? "0.5em" : 0,
					}}
					className="relative inline-block"
				>
					{middle_line_right}
					{/* <span>wh</span>
					<span className={`${getFontClass(items[activeSlide]?.hover_font)}`}>a</span>
					<span>{`t's`}</span> */}
				</motion.span>
				<div className="absolute inset-0 left-[-17%] flex items-center justify-center">
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
							className="absolute inset-0 top-[-10px] mx-auto flex w-full max-w-[18%] items-center justify-center md:max-w-[150px]"
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
