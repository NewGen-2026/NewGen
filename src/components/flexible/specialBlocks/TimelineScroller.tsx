import { useScroll, motion, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";

const TimelineScroller = (props) => {
	const { heading, items } = props;
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end center"],
	});

	const yBase = useTransform(scrollYProgress, [0, 1], [-100, 0]);
	const ySpring = useSpring(yBase, { stiffness: 300, damping: 20, mass: 0.5 });

	const yTemplate = useMotionTemplate`translateY(${ySpring}%)`;

	return (
		<motion.div ref={ref} className="flex w-full flex-col justify-between gap-6 md:flex-row">
			<div className="flex-1 md:max-w-[555px]">
				<div className="sticky top-[15vh]">
					<h2 className="t-96 font-black uppercase">{heading}</h2>
					<div className="mt-8 md:mt-44 laptop:mt-20">
						<div className="aspect-[555/359] w-full bg-stone/10 xl:min-h-[359px]">
							<WpImage image={items[0]?.image} className="h-full w-full object-cover" />
						</div>
					</div>
				</div>
			</div>
			<div className="relative flex w-[2px] flex-col overflow-hidden bg-stone/10">
				<motion.div
					style={{
						transform: yTemplate,
					}}
					className="absolute inset-0 h-full w-full bg-white"
				/>
			</div>

			<div className="flex max-w-[555px] flex-1 flex-col gap-16 md:gap-[120px]">
				{items.map((item, i) => (
					<div key={`item${i}`} className="flex flex-col gap-4">
						<h3 className="t-48 font-black uppercase">
							<FontSwitcher text={item?.heading} />
						</h3>
						<p className="t-20 font-medium">{item?.content}</p>
					</div>
				))}
			</div>
		</motion.div>
	);
};
export default TimelineScroller;
