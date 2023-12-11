import { useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { HoverButton } from "~/components/elements/buttons/Button";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";
import CreatorCard from "../creatorBlocks/CreatorCard";

const Marquee = dynamic(() => import("react-fast-marquee"), { ssr: false });

const CreatorMarquee = (props) => {
	const { creators } = props;

	const ref = useRef(null);

	const breakpointCrossed = useBreakpointCrossed(768);

	const isInView = useInView(ref, {
		once: false,
	});

	return (
		<div>
			<div ref={ref} className="asset-marquee min-h-[580px] w-full ">
				<Marquee play={isInView} direction="left" className="" pauseOnHover speed={breakpointCrossed ? 100 : 50}>
					{creators?.map((creator, i) => (
						<div key={`creator-${i}`} className="mx-3">
							<CreatorCard creator={creator} />
						</div>
					))}
				</Marquee>
			</div>
			<div className="mt-24 flex w-full justify-center">
				<HoverButton>{`See the r<pst-rec>o</>ster`}</HoverButton>
			</div>
		</div>
	);
};
export default CreatorMarquee;
