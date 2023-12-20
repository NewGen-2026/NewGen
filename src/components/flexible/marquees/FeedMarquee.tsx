import { useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { Button } from "~/components/elements/buttons/Button";
import FeedPreview from "~/components/feed/FeedPreview";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";

const Marquee = dynamic(() => import("react-easy-marquee"), { ssr: false });

const FeedMarquee = (props) => {
	const { posts } = props;

	const ref = useRef(null);

	const breakpointCrossed = useBreakpointCrossed(768);

	const isInView = useInView(ref, {
		once: false,
	});

	const duration = breakpointCrossed ? 20000 : 58000;
	const height = breakpointCrossed ? "346px" : "640px";
	const pauseDuration = isInView ? duration : 0;

	return (
		<div>
			<div ref={ref} className="feed-marquee w-full md:min-h-[640px] ">
				<Marquee duration={pauseDuration} pauseOnHover axis="X" align="center" height={height} width="100%">
					{posts?.map((post, i) => <FeedPreview variant="slide" key={`post-${i}`} post={post} i={i} />)}
				</Marquee>
			</div>

			<div className="mt-12 flex justify-center md:mt-24">
				<Button>View all</Button>
			</div>
		</div>
	);
};
export default FeedMarquee;
