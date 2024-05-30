import { useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import { HoverButton } from "~/components/elements/buttons/Button";
import FeedPreview from "~/components/feed/FeedPreview";
import FeedSlider from "../sliders/FeedSlider";

const Marquee = dynamic(() => import("react-fast-marquee"), { ssr: false });

const FeedMarquee = (props) => {
	const { posts, hide_button = false, variant } = props;

	const ref = useRef(null);

	const isInView = useInView(ref, {
		once: false,
	});

	return (
		<div>
			<div ref={ref} className={`feed-marquee w-full  md:min-h-[640px] ${variant === "slider" ? "container" : ""}  `}>
				{variant === "slider" ? (
					<FeedSlider items={posts} />
				) : (
					<Marquee play={isInView} direction="left" pauseOnHover>
						{posts?.map((post, i) => <FeedPreview variant="slide" key={`post-${i}`} {...post?.post} i={i} />)}
					</Marquee>
				)}
			</div>
			{!hide_button && (
				<div className="mt-12 flex justify-center md:mt-24 tiny-laptop:mt-16">
					<Link href="/blog-and-podcasts">
						<HoverButton
							button={{
								size: "medium",
								background_color: "black",
								text_color: "white",
								hover_background_color: "cobalt",
								text_hover_color: "electric",
							}}
						>
							{`Vi<pst-grid>e</>w all`}
						</HoverButton>
					</Link>
				</div>
			)}
		</div>
	);
};
export default FeedMarquee;
