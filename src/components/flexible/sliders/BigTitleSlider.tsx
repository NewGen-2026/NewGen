import { useState } from "react";
import { motion } from "framer-motion";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { getTextColorClasses } from "~/utils/getColors";

const BigTitleSlider = (props) => {
	const { items } = props;

	const [activeSlide, setActiveSlide] = useState(0);

	return (
		<div className="flex w-full flex-col justify-between gap-6 sm:flex-row">
			<div className="max-w-[672px] flex-1">
				<div className="relative aspect-[672/600] w-full bg-stone/10">
					{items?.map((item, i) => (
						<motion.div key={`item${i}`} initial={{ opacity: 0 }} animate={{ opacity: activeSlide === i ? 1 : 0 }} className="absolute inset-0 h-full w-full">
							<WpImage image={item?.image} className="h-full w-full object-cover" />
						</motion.div>
					))}
				</div>
			</div>
			<div className="flex max-w-[620px] flex-1 flex-col justify-between gap-6">
				<ul className="t-72 flex flex-col gap-2 font-heading font-black uppercase xl:gap-3">
					{items?.map((item, i) => (
						<li
							key={`title${i}`}
							className={`block whitespace-nowrap transition-colors duration-200 ${
								activeSlide === i ? getTextColorClasses(item?.hover_color) : "text-white/20"
							}`}
							onMouseEnter={() => setActiveSlide(i)}
						>
							<FontSwitcher hover isHovered={activeSlide === i} text={item?.title} />
						</li>
					))}
				</ul>
				<p className="pointer-events-none relative min-h-[120px] sm:min-h-[80px]">
					{items?.map((item, i) => (
						<span
							key={`content${i}`}
							className={`t-20 absolute top-0 block font-medium transition-opacity duration-200 sm:bottom-0 sm:top-[unset] ${
								activeSlide === i ? "opacity-100" : "opacity-0"
							}`}
						>
							{item?.content}
						</span>
					))}
				</p>
			</div>
		</div>
	);
};
export default BigTitleSlider;
