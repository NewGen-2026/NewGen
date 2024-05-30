import { useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";
import IconBlockItem from "../sliders/IconBlockItem";

const Marquee = dynamic(() => import("react-fast-marquee"), { ssr: false });
const IconBlockSlider = dynamic(() => import("../sliders/IconBlockSlider"), { ssr: false });

const IconBlockMarquee = (props) => {
	const { items, variant } = props;

	const ref = useRef(null);

	const breakpointCrossed = useBreakpointCrossed(768);

	const isInView = useInView(ref, {
		once: false,
	});

	return (
		<div ref={ref} className="icon-block-marquee w-full md:min-h-[240px] ">
			{variant === "slider" ? (
				<IconBlockSlider items={items} />
			) : (
				<Marquee play={isInView} direction="left" className="!items-start" pauseOnHover speed={breakpointCrossed ? 100 : 50}>
					{items?.map((item, i) => <IconBlockItem key={`item-${i}`} item={item} />)}
				</Marquee>
			)}
		</div>
	);
};
export default IconBlockMarquee;
