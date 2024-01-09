/* eslint-disable no-shadow */
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import WpImage from "~/components/elements/WpImage";
import Link from "next/link";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import useAutoSlider from "~/hooks/useAutoSlider";

const activeHoverLayouts = {
	influencer: {
		color: "bg-boost",
		hoverTextColor: "text-energy",
		link: "/influencer-performance",
		button: {
			bgColor: "bg-energy",
			textColor: "!text-boost",
			text: `Expl<pst-pil>o</>re Se<pst-pil>r</>vices`,
		},
		blockColor: "bg-energy text-boost",
		font: "font-pilowlava  !leading-[0.5] !text-[0.92em]",
	},
	social: {
		color: "bg-cobalt",
		hoverTextColor: "text-electric",
		link: "/social-strategy",
		button: {
			bgColor: "bg-electric",
			textColor: "!text-cobalt",
			text: `Exp<pst-bec>l</>ore S<pst-bec>e</>rvices`,
		},
		blockColor: "bg-electric text-cobalt",
		font: "font-become  !leading-[0.8]",
	},
	creative: {
		color: "bg-forest",
		hoverTextColor: "text-sand",
		link: "/creative-and-studio",
		button: {
			bgColor: "bg-sand",
			textColor: "!text-forest",
			text: `Ex<pst-hal>p</>lore S<pst-hal>e</>rvices`,
		},
		blockColor: "bg-sand text-forest",
		font: "font-haltwins !leading-[0.8]",
	},
};

const ServicesOverview = (props) => {
	const ref = useRef(null);

	const [activeHover, setActiveHover] = useState("influencer");
	const [buttonHovered, setButtonHovered] = useState(false);
	const [overrideHover, setOverrideHover] = useState(null);

	const { creative_layout, influencer_layout, social_layout } = props;

	const layouts = useMemo(
		() => [
			{
				id: "influencer",
				leftImage: influencer_layout?.influencer_left_image,
				rightImage: influencer_layout?.influencer_right_image,
				statBlock: influencer_layout?.stat_block,
			},
			{
				id: "social",
				leftImage: social_layout?.social_left_image,
				rightImage: social_layout?.social_right_image,
				statBlock: social_layout?.stat_block,
			},
			{
				id: "creative",
				leftImage: creative_layout?.creative_left_image,
				rightImage: creative_layout?.creative_right_image,
				statBlock: creative_layout?.stat_block,
			},
		],
		[creative_layout, influencer_layout, social_layout]
	);

	const activeSlide = useAutoSlider(ref, layouts?.length, {
		intervalDuration: 6000,
		startDelay: 0,
		overrideActiveSlide: overrideHover,
	});

	useEffect(() => {
		setActiveHover(layouts[activeSlide]?.id);
	}, [activeSlide, layouts]);

	const handleHoverChange = (newHover) => {
		setActiveHover(newHover);
		const newOverrideSlide = layouts.findIndex((layout) => layout.id === newHover);
		setOverrideHover(newOverrideSlide);
	};

	const parseSentence = (sentence) => {
		return sentence
			.split("||")
			.map((segment, index) => {
				if (index % 2 === 1) {
					return <HoverWord key={index} word={segment} activeWord={activeHover} setActiveHover={handleHoverChange} />;
				}
				return segment.split(" ").map((word, wordIndex) => (
					<span key={`${index}-${wordIndex}`}>
						{word}
						{wordIndex < segment.split(" ").length - 1 ? " " : ""}
					</span>
				));
			})
			.flat();
	};

	const sentence =
		"From ||in|f|luencer|| marketing to razor-sharp ||socia|l|| & thumb-stopping ||cre|a|tive||, we get whole generations excited about your brand";

	return (
		<div ref={ref} className="relative overflow-hidden py-16 md:py-[88px]">
			<motion.div className={`pointer-events-none absolute inset-0 transition-colors duration-300 ease-in-out  ${activeHoverLayouts[activeHover]?.color}`} />
			<motion.div layout className="container relative z-[5]">
				<motion.div layout className="relative z-[5] mx-auto  w-full max-w-[1139px]  text-center">
					<motion.h2
						layout
						className={`t-56 break relative z-[5] flex flex-wrap justify-center gap-[0.1em] hyphens-none font-heading font-black uppercase ${
							activeHover === "" ? "text-stone " : "text-white delay-200"
						}`}
					>
						{parseSentence(sentence)}
					</motion.h2>
					<div className="mt-12 flex justify-center md:mt-[72px]">
						<button
							onMouseEnter={() => setButtonHovered(true)}
							onMouseLeave={() => setButtonHovered(false)}
							type="button"
							className={clsx(
								`t-18 inline-block min-w-[11.25em] select-none appearance-none bg-black px-[17.5px] pb-[19px] pt-[21px] font-black uppercase !leading-[0.95] !tracking-[-0.0225rem]  transition-colors duration-300`,
								activeHover === "" && "hover bg-black text-white ",
								activeHoverLayouts[activeHover]?.button?.bgColor,
								activeHoverLayouts[activeHover]?.button?.textColor
							)}
						>
							<FontSwitcher
								text={activeHoverLayouts[activeHover]?.button?.text || `Expl<pst-pil>o</>re Se<pst-pil>r</>vices`}
								hover
								isHovered={buttonHovered}
							/>
						</button>
					</div>
				</motion.div>
				<div className="mt-16 flex flex-wrap gap-2 sm:gap-5 md:mt-[72px] lg:gap-8">
					<div className={`relative aspect-[438/348] w-full flex-[1_1_45%] overflow-hidden sm:flex-1 ${activeHoverLayouts[activeHover]?.blockColor}`}>
						{layouts.map((layout) => (
							<motion.div key={layout.id} className="absolute inset-0 h-full w-full" animate={{ opacity: activeHover === layout.id ? 1 : 0 }}>
								<WpImage image={layout.leftImage} className="h-full w-full object-cover" />
							</motion.div>
						))}
					</div>
					<div className={`relative aspect-[438/348] flex-[1_1_45%] overflow-hidden sm:flex-1 ${activeHoverLayouts[activeHover]?.blockColor}`}>
						{layouts.map((layout) => (
							<motion.div key={layout.id} className="absolute inset-0 h-full w-full" animate={{ opacity: activeHover === layout.id ? 1 : 0 }}>
								<WpImage image={layout.rightImage} className="h-full w-full object-cover" />
							</motion.div>
						))}
					</div>
					<div
						className={`relative flex min-h-[120px] flex-[1_1_438px] flex-col justify-between gap-6 overflow-hidden p-4 sm:aspect-[438/348] sm:flex-1 md:min-h-[200px] md:p-6 ${activeHoverLayouts[activeHover]?.blockColor}`}
					>
						{layouts.map((layout, i) => (
							<motion.div
								key={layout.id}
								className="absolute inset-0 flex flex-col justify-between gap-6 overflow-hidden p-4 md:p-6"
								animate={{ opacity: activeHover === layout.id ? 1 : 0 }}
								transition={{ duration: 0.3 }}
							>
								<h3 className="t-96 font-heading font-black uppercase">
									{layout.statBlock?.stat}
									<span className={clsx(activeHoverLayouts[layout.id]?.font)}>k</span>+
								</h3>
								<p className="t-24 font-heading font-black uppercase">{layout.statBlock?.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default ServicesOverview;

const HoverWord = ({ word, setActiveHover, activeWord }) => {
	const originalWord = word.replace(/\|/g, "");
	const isActive = activeWord === originalWord;
	const font = activeHoverLayouts[originalWord]?.font || "font-pilowlava";

	const parseWord = (word) =>
		word.split("|").map((part, index) => {
			const isSpecialFont = index % 2 === 1 && isActive;
			return (
				<motion.span
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					key={index}
					className={clsx(
						isSpecialFont ? `${font}` : "",
						"transition-colors duration-300",
						isActive ? activeHoverLayouts[originalWord]?.hoverTextColor : "text-white/75"
					)}
				>
					<Link href={activeHoverLayouts[originalWord]?.link || "/"}>{part}</Link>
				</motion.span>
			);
		});

	return (
		<motion.span
			onMouseEnter={() => setActiveHover(originalWord)}
			className={clsx("transition-colors duration-300", isActive ? activeHoverLayouts[originalWord]?.hoverTextColor : "text-black")}
		>
			{parseWord(word)}
		</motion.span>
	);
};
