import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import slugify from "slugify";
import { useEffect, useState } from "react";

const LegalLandingPage = (props) => {
	const { masthead, content_blocks } = props;
	return (
		<>
			<div className="bg-electric pb-16 pt-24 md:pb-[118px] md:pt-44">
				<div className="container">
					<div className="max-w-[860px]">
						<h1 className="t-80 font-black uppercase">
							<FontSwitcher text={masthead?.heading} loop={false} />
						</h1>
						<div className="t-20 mt-5 font-medium opacity-70 md:mt-10">Last updated: {masthead?.last_updated}</div>
					</div>
				</div>
			</div>

			<div className="container my-20 flex w-full justify-between gap-6">
				<div className="max-w-[821px] flex-1 space-y-5 md:space-y-10">
					{content_blocks?.length &&
						content_blocks.map((block, i) => (
							<div id={slugify(block?.heading, { lower: true })} key={`contentBlock${i}`} className="flex scroll-mt-20 flex-col gap-6">
								<h3 className="t-32 font-black">{block?.heading}</h3>
								<div className="t-20 prose font-medium !leading-[1.3]" dangerouslySetInnerHTML={{ __html: block?.content }} />
							</div>
						))}
				</div>
				<div className="hidden flex-col lg:flex">
					<ScrollNav blocks={content_blocks} />
				</div>
			</div>
		</>
	);
};
export default LegalLandingPage;

const ScrollNav = ({ blocks }) => {
	const [activeAnchor, setActiveAnchor] = useState(slugify(blocks[0]?.heading, { lower: true }));
	const [isUserScroll, setIsUserScroll] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (isUserScroll) return;

			let newActiveId = activeAnchor;
			const firstBlockThreshold = 150;
			const firstBlockElement = blocks.length > 0 && document.getElementById(slugify(blocks[0]?.heading, { lower: true }));
			const firstBlockRect = firstBlockElement && firstBlockElement.getBoundingClientRect();

			if (!firstBlockElement || (firstBlockRect && window.scrollY <= firstBlockRect.top + window.pageYOffset - firstBlockThreshold)) {
				newActiveId = blocks[0]?.heading;
			} else {
				const activeBlock = blocks.find((block: any) => {
					const element = document.getElementById(slugify(block?.heading, { lower: true }));
					if (element) {
						const bounding = element.getBoundingClientRect();
						return bounding.top >= 0 && bounding.top <= window.innerHeight / 2;
					}
					return false;
				});

				if (activeBlock) {
					newActiveId = slugify(activeBlock?.heading, { lower: true });
				}
			}

			if (newActiveId !== activeAnchor) {
				setActiveAnchor(newActiveId);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [blocks, activeAnchor, isUserScroll]);

	const scrollToAnchor = (anchorId: string) => {
		setActiveAnchor(anchorId);
		setIsUserScroll(true);
		const element = document.getElementById(anchorId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
			setTimeout(() => {
				setIsUserScroll(false);
			}, 1000);
		}
	};

	return (
		<div className="sticky top-20">
			<div className="t-15 flex flex-col gap-6 font-medium">
				{blocks?.length &&
					blocks.map((block, i) => (
						<a
							key={`contentBlock${i}`}
							href={`#${slugify(block?.heading, { lower: true })}`}
							onClick={(e) => {
								e.preventDefault();
								scrollToAnchor(slugify(block?.heading, { lower: true }));
							}}
							className={`transition-colors duration-200 hover:text-cobalt
							${activeAnchor === slugify(block?.heading, { lower: true }) ? "!text-cobalt" : ""}
							`}
						>
							{block?.heading}
						</a>
					))}
			</div>
		</div>
	);
};
