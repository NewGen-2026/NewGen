import { useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";

const Marquee = dynamic(() => import("react-easy-marquee"), { ssr: false });
const Asset = dynamic(() => import("~/components/elements/Asset"), { ssr: false });

const AssetMarquee = (props) => {
	const { assets } = props;

	const ref = useRef(null);

	const breakpointCrossed = useBreakpointCrossed(768);

	const isInView = useInView(ref, {
		once: false,
	});

	const duration = breakpointCrossed ? 40000 : 25000;
	const pauseDuration = isInView ? duration : 0;

	return (
		<div ref={ref} className="asset-marquee min-h-[200px] w-full ">
			<Marquee duration={pauseDuration} axis="X" align="center" height="200px" width="100%">
				{assets?.map((asset, i) => (
					<div key={`asset-${i}`} className="mx-3 w-[296px]">
						<Asset className="marquee-asset w-[296px]" {...asset?.asset} />
					</div>
				))}
				{assets?.map((asset, i) => (
					<div key={`asset2-${i}`} className="mx-3 w-[296px]">
						<Asset className="marquee-asset w-[296px]" {...asset?.asset} />
					</div>
				))}
			</Marquee>
		</div>
	);
};
export default AssetMarquee;
