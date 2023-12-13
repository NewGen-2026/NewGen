import { useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import WpImage from "~/components/elements/WpImage";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";

const Marquee = dynamic(() => import("react-fast-marquee"), { ssr: false });

const IconBlockMarquee = (props) => {
	const { items } = props;

	const ref = useRef(null);

	const breakpointCrossed = useBreakpointCrossed(768);

	const isInView = useInView(ref, {
		once: false,
	});

	return (
		<div ref={ref} className="icon-block-marquee w-full md:min-h-[240px] ">
			<Marquee play={isInView} direction="left" className="!items-start" pauseOnHover speed={breakpointCrossed ? 100 : 50}>
				{items?.map((item, i) => (
					<div key={`item-${i}`} className="mx-3 w-full max-w-[420px] md:mx-8">
						<div>
							<WpImage image={item?.icon} className=" h-14 w-14 " />
						</div>
						<div className="mt-10">
							<div className="t-32 font-heading font-black uppercase">{item?.heading}</div>
							<div className="t-18 mt-5 max-w-[385px] font-medium !leading-[1.35] opacity-70">{item?.content}</div>
						</div>
					</div>
				))}
			</Marquee>
		</div>
	);
};
export default IconBlockMarquee;
