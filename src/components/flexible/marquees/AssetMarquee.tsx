import { useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";

const Marquee = dynamic(() => import("react-fast-marquee"), { ssr: false });
const Asset = dynamic(() => import("~/components/elements/Asset"), { ssr: false });

const AssetMarquee = (props) => {
	const { assets, height } = props;

	const ref = useRef(null);

	const breakpointCrossed = useBreakpointCrossed(768);

	const isInView = useInView(ref, {
		once: false,
	});

	const maxHeight = height === "medium" ? "max-h-[330px]" : "max-h-[185px]";

	return (
		<div ref={ref} className="asset-marquee min-h-[200px] w-full">
			<Marquee play={isInView} direction="left" className="" speed={breakpointCrossed ? 100 : 50}>
				{assets?.map((asset, i) => (
					<div key={`asset-${i}`} className="mx-3">
						<Asset className={`marquee-asset ${maxHeight} w-full object-contain `} {...asset?.asset} />
					</div>
				))}
				{assets?.map((asset, i) => (
					<div key={`asset2-${i}`} className="mx-3">
						<Asset className={`marquee-asset ${maxHeight} w-full object-contain `} {...asset?.asset} />
					</div>
				))}
			</Marquee>
		</div>
	);
};
export default AssetMarquee;
