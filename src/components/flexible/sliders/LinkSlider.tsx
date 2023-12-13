import { useState } from "react";
import { motion } from "framer-motion";
import { getTextColorClasses } from "~/utils/getColors";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { TextLink } from "~/components/elements/buttons/Button";

const LinkSlider = (props) => {
	const { items } = props;

	const [activeSlide, setActiveSlide] = useState(0);

	return (
		<div className="flex w-full flex-col-reverse justify-between gap-6 gap-y-5 sm:flex-row">
			<div className="flex max-w-[620px] flex-1 flex-col justify-between gap-6 text-center sm:text-left">
				<ul className="t-44 flex flex-col gap-1.5  font-heading font-black uppercase xl:gap-3">
					{items?.map((item, i) => (
						<li
							key={`title${i}`}
							className={`block whitespace-nowrap transition-colors duration-200 ${
								activeSlide === i ? getTextColorClasses(item?.hover_color || "boost") : "text-black"
							}`}
							onMouseEnter={() => setActiveSlide(i)}
						>
							<FontSwitcher hover isHovered={activeSlide === i} text={item?.heading} />
						</li>
					))}
				</ul>
				<div className="pointer-events-none relative min-h-[120px] max-w-[580px] sm:min-h-[80px]">
					{items?.map((item, i) => (
						<div
							key={`content${i}`}
							className={`t-22 absolute top-0 block font-medium  transition-opacity duration-200 sm:bottom-0 sm:top-[unset] ${
								activeSlide === i ? "opacity-100" : "opacity-0"
							}`}
						>
							<span className="block opacity-75">{item?.content}</span>
							<TextLink className="mt-4 !text-black md:mt-8">Learn more</TextLink>
						</div>
					))}
				</div>
			</div>
			<div className="max-w-[720px] flex-1 xl:translate-x-8">
				<div className="relative aspect-[720/680] w-full bg-stone/10">
					{items?.map((item, i) => (
						<motion.div key={`item${i}`} initial={{ opacity: 0 }} animate={{ opacity: activeSlide === i ? 1 : 0 }} className="absolute inset-0 h-full w-full">
							<WpImage image={item?.image} className="h-full w-full object-cover" />
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};
export default LinkSlider;
