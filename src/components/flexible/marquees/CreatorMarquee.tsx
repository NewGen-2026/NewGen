import { useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { HoverButton } from "~/components/elements/buttons/Button";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";
import Link from "next/link";
import CreatorCard from "../creatorBlocks/CreatorCard";

const Marquee = dynamic(() => import("react-fast-marquee"), { ssr: false });

type CreatorMarqueeProps = {
	creators: any;
	button?: {
		link?: {
			title: string;
			url: string;
		};
		background_color?: "black" | "white";
	};
};
const CreatorMarquee = (props: CreatorMarqueeProps) => {
	const { creators, button } = props;

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
			{button?.link && (
				<div className="mt-24 flex w-full justify-center">
					<Link href={button?.link?.url}>
						<HoverButton
							button={{
								color: button?.background_color || "black",
								size: "wide",
								type: "solid",
							}}
						>
							{button?.link?.title}
						</HoverButton>
					</Link>
				</div>
			)}
		</div>
	);
};
export default CreatorMarquee;
