import { useIsomorphicLayoutEffect, useScroll, useSpring, useTransform, motion, useVelocity, MotionValue } from "framer-motion";
import { createRef, forwardRef, useEffect, useRef, useState } from "react";
import { useMeasure, useWindowSize } from "react-use";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";

const HijackScroller = (props) => {
	const { items } = props;

	const scrollRef = useRef(null);
	const itemRefs = useRef([]) as any;

	const [ref, { width, height }] = useMeasure() as any;

	const { height: windowHeight, width: windowWidth } = useWindowSize();

	const [totalWidth, setTotalWidth] = useState(0);
	const [top, setTop] = useState(0);

	itemRefs.current = items.map((_: any, i: string | number) => itemRefs.current[i] || createRef());

	useIsomorphicLayoutEffect(() => {
		const newTotalWidth = itemRefs.current.reduce((sum: any, itemRef: { current: { offsetWidth: any } }) => {
			return sum + (itemRef.current ? itemRef.current.offsetWidth : 0);
		}, 0);
		setTotalWidth(newTotalWidth);
	}, [items, width, height]);

	const { scrollYProgress } = useScroll({
		target: scrollRef,
		offset: ["start end", "end start"],
	});

	const gapOffset = windowWidth > 1024 ? 96 : windowWidth < 769 ? 45 : 160;

	const xBase = useTransform(scrollYProgress, [windowWidth > 2000 ? 0.18 : 0.2, 0.65], [0, -totalWidth + width - gapOffset]);
	const xSpring = useSpring(xBase, { stiffness: 250, damping: 30 });

	useEffect(() => {
		const newTop = windowHeight / 2 - height / 2 + 10;
		setTop(newTop);
	}, [windowHeight, height]);

	return (
		<div
			ref={scrollRef}
			style={{
				height: totalWidth,
			}}
			className="overflow-x-clip px-[15px] md:px-8"
		>
			<motion.div
				style={{
					top: top || "unset",
				}}
				className="sticky "
			>
				<motion.div ref={ref} style={{ x: xSpring }} className="flex gap-4 whitespace-nowrap will-change-transform md:gap-8">
					{items?.map((item: any, i: number) => (
						<ScrollItem key={`item-${i}`} ref={itemRefs.current[i]} item={item} i={i} lastItem={items.length - 1} scrollProgress={xBase} />
					))}
				</motion.div>
			</motion.div>
		</div>
	);
};
export default HijackScroller;

interface ScrollItemProps {
	item: any;
	i: number;
	lastItem: number;
	scrollProgress: MotionValue;
}

const ScrollItem = forwardRef<HTMLDivElement, ScrollItemProps>(({ item, i, lastItem, scrollProgress }, ref) => {
	const scrollVelocity = useVelocity(scrollProgress);

	const headingXBase = useTransform(scrollVelocity, [2000, 0, -2000], [-50, 0, 50], { clamp: false });
	const headingXSpring = useSpring(headingXBase, { stiffness: 200, damping: 30 });

	const contentXBase = useTransform(scrollVelocity, [2000, 0, -2000], [-55, 0, 55], { clamp: false });
	const contentXSpring = useSpring(contentXBase, { stiffness: 200, damping: 30 });

	return (
		<motion.div
			ref={ref}
			style={{
				marginRight: i === lastItem ? "5vw" : 0,
			}}
			className="!h-auto min-h-[250px] min-w-[90vw] sm:min-h-[350px] md:!min-h-[443px] md:min-w-[55vw] laptop:min-w-[45vw]"
		>
			<div className="w-full bg-stone/20">
				<WpImage image={item?.image} />
			</div>
			<div className="mt-5 max-w-[744px] md:mt-[65px] laptop:mt-8">
				<motion.h3
					style={{
						x: headingXSpring,
					}}
					className="t-64 font-black uppercase"
				>
					<FontSwitcher text={item?.heading} />
				</motion.h3>
				<motion.div
					style={{
						x: contentXSpring,
					}}
					className="t-18 mt-3 whitespace-normal font-medium !leading-[1.35] opacity-70 md:mt-6"
				>
					{item?.content}
				</motion.div>
			</div>
		</motion.div>
	);
});
