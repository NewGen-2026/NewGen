import { useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { HoverButton } from "~/components/elements/buttons/Button";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";
import Link from "next/link";
import CreatorCard from "../creatorBlocks/CreatorCard";
import CreatorsSlider from "../sliders/CreatorsSlider";

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
	variant?: "slider" | "marquee" | "grid";
};
const CreatorMarquee = (props: CreatorMarqueeProps) => {
	const { creators, button, variant } = props;

	const ref = useRef(null);

	const breakpointCrossed = useBreakpointCrossed(768);

	const isInView = useInView(ref, {
		once: false,
	});

	if (variant === "grid") {
		return (
			<div className="container">
				<div className="flex w-full flex-wrap gap-2 sm:gap-5 xl:gap-8">
					{creators && creators.map((creator, i) => <CreatorCard key={`creator-${i}`} creator={creator} />)}
				</div>
			</div>
		);
	}

	return (
		<div>
			<div ref={ref} className="asset-marquee min-h-[399px] w-full md:min-h-[580px] laptop:min-h-[399px]  ">
				{variant === "slider" ? (
					<CreatorsSlider items={creators} />
				) : (
					<Marquee play={isInView} direction="left" className="" pauseOnHover speed={breakpointCrossed ? 100 : 50}>
						{creators?.map((creator, i) => (
							<div key={`creator-${i}`} className="mx-1 max-w-[300px] md:mx-3 md:max-w-[unset] laptop:max-w-[300px]">
								<CreatorCard creator={creator} />
							</div>
						))}
					</Marquee>
				)}
			</div>
			{button?.link && (
				<div className="mt-10 flex w-full justify-center md:mt-24">
					<Link href={button?.link?.url}>
						<HoverButton
							button={{
								color: button?.background_color || "black",
								text_color: "white",
								hover_background_color: "cobalt",
								text_hover_color: "electric",
								size: "wide",
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
