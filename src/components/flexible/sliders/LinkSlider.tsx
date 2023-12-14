import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { getBgColorClasses, getTextColorClasses } from "~/utils/getColors";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { TextLink } from "~/components/elements/buttons/Button";
import useAutoSlider from "~/hooks/useAutoSlider";

const LinkSlider = (props) => {
	const { items } = props;

	const ref = useRef(null);
	const [overrideSlide, setOverrideSlide] = useState(null);
	const [ishovered, setIshovered] = useState(null);

	const activeSlide = useAutoSlider(ref, items?.length, {
		intervalDuration: 6000,
		startDelay: 0,
		overrideActiveSlide: overrideSlide,
	});

	const isInViewOnce = useInView(ref, { once: true });

	return (
		<div ref={ref} className="flex w-full flex-col-reverse justify-between gap-6 gap-y-5 sm:flex-row">
			<div className="flex max-w-[620px] flex-1 flex-col justify-between gap-6 text-center sm:text-left">
				<ul className="t-44 flex flex-col gap-1.5  font-heading font-black uppercase xl:gap-3">
					{items?.map((item, i) => (
						<li key={`title${i}`} className="inline-block">
							<button
								type="button"
								className={`relative inline-block max-w-max overflow-hidden whitespace-nowrap uppercase transition-colors duration-200
							${activeSlide === i ? getTextColorClasses("black" || "boost") : "text-black"}
							`}
								onClick={() => setOverrideSlide(i)}
								onMouseEnter={() => setIshovered(i)}
								onMouseLeave={() => setIshovered(i)}
							>
								<FontSwitcher hover isHovered={activeSlide === i || ishovered === i} text={item?.heading} />
								{isInViewOnce && (
									<motion.div
										initial={{
											x: "-100%",
										}}
										animate={{
											x: activeSlide === i ? "0%" : "-100%",
										}}
										transition={{
											duration: activeSlide === i ? 6 : 0.4,
										}}
										className={`absolute inset-0 mix-blend-screen ${getBgColorClasses(item?.hover_color)}`}
									/>
								)}
							</button>
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
