/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { HoverButton, TextLink } from "~/components/elements/buttons/Button";
import WorkGridItem from "./WorkGridItem";

const LOAD_MORE_AMOUNT = 9;

const AllWorkGrid = (props) => {
	const { static_posts } = props;

	const { work: workPosts } = static_posts;
	const router = useRouter();

	const defaultWorkType = workPosts[0]?.["work-type"][0]?.slug;
	const defaultService = "All";

	const [selectedService, setSelectedService] = useState(defaultService) as any;
	const [selectedWorkType, setSelectedWorkType] = useState(defaultWorkType) as any;
	const [displayedPostsCount, setDisplayedPostsCount] = useState(LOAD_MORE_AMOUNT);

	useEffect(() => {
		const { query } = router;
		setSelectedWorkType(query.work_type || defaultWorkType);
		setSelectedService(query.service || defaultService);
	}, [router.query, defaultWorkType, defaultService, router]);

	const updateUrlParams = (service, workType) => {
		router.push(
			{
				pathname: router.pathname,
				query: { ...router.query, service, work_type: workType },
			},
			undefined,
			{ shallow: true }
		);
	};

	const handleServiceSelection = (slug) => {
		setSelectedService(slug);
		updateUrlParams(slug, selectedWorkType);
	};

	const handleWorkTypeSelection = (slug) => {
		setSelectedWorkType(slug);
		setSelectedService(defaultService);
		updateUrlParams(defaultService, slug);
	};
	const handleLoadMore = () => {
		setDisplayedPostsCount((prevCount) => prevCount + LOAD_MORE_AMOUNT);
	};

	const uniqueWorkTypes = new Map();
	workPosts?.forEach((work) => {
		work["work-type"]?.forEach((type) => {
			uniqueWorkTypes.set(type.name, { slug: type.slug, hoverName: type?.acf?.hover_style });
		});
	});

	const availableServices = workPosts
		.filter((work) => work["work-type"].some((type) => type.slug === selectedWorkType))
		.flatMap((work) => work.services)
		.reduce((acc, service) => acc.set(service.name, service.slug), new Map([["All", "All"]]));

	const workTypeNames = Array.from(uniqueWorkTypes.entries());
	const serviceNames = Array.from(availableServices.entries()) as any;
	const filteredAndSlicedWorkPosts = workPosts.filter((work) => {
		const serviceMatch = selectedService === "All" || work.services.some((service) => service.slug === selectedService);
		const workTypeMatch = work["work-type"].some((type) => type.slug === selectedWorkType);
		return serviceMatch && workTypeMatch;
	});

	const filteredWorkPosts = filteredAndSlicedWorkPosts.slice(0, displayedPostsCount);
	const allPostsDisplayed = displayedPostsCount >= filteredAndSlicedWorkPosts.length;

	return (
		<div>
			<div className="mb-8 flex flex-col items-center gap-y-5 md:mb-20 lg:flex-row lg:justify-between">
				<ul className="t-15  flex gap-4 font-bold lg:gap-2">
					{workTypeNames.map(([name, { slug, hoverName }], i) => (
						<li
							key={`workType-${i}`}
							className="block cursor-pointer"
							onClick={() => handleWorkTypeSelection(slug)}
							onKeyDown={() => handleWorkTypeSelection(slug)}
						>
							<HoverButton
								buttonClass={` whitespace-nowrap ${selectedWorkType === slug ? "!bg-cobalt !text-electric" : ""}`}
								externalFontTrigger={selectedWorkType === slug}
								aria-label={name}
								type="button"
								button={{
									background_color: "white",
									text_color: "black",
									hover_background_color: "cobalt",
									text_hover_color: "electric",
									size: "medium",
								}}
							>
								{hoverName || name}
							</HoverButton>
						</li>
					))}
				</ul>

				<div className="scroll-container relative w-full lg:w-auto">
					<div className="t-15  hide-scrollbars relative flex min-h-[40px] w-full gap-4 overflow-x-auto  px-2 font-bold sm:justify-center sm:px-0 lg:w-auto xl:gap-8">
						{serviceNames.map(([name, slug], i) => (
							<button
								aria-label={name}
								type="button"
								key={`service-${i}`}
								className=" block cursor-pointer transition-colors duration-200 hover:text-cobalt "
								onClick={() => handleServiceSelection(slug)}
							>
								<div className="relative whitespace-nowrap">
									<span dangerouslySetInnerHTML={{ __html: name }} />

									<div className="absolute bottom-[-6px] left-0 flex w-full justify-center">
										{selectedService === slug && (
											<motion.span
												layoutId="underline"
												transition={{
													layout: {
														type: "spring",
														stiffness: 300,
														damping: 28,
													},
												}}
												className=" h-[6px] justify-center will-change-transform"
											>
												<motion.span layout="position" className="block h-[6px] w-[6px] bg-cobalt" />
											</motion.span>
										)}
									</div>
								</div>
							</button>
						))}
					</div>
				</div>
			</div>
			<div className="grid gap-3 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:gap-x-8 xl:gap-y-20">
				{filteredWorkPosts.map((work, i) => (
					<WorkGridItem key={`work-${i}`} work={work} variant="3col" />
				))}{" "}
			</div>
			{!allPostsDisplayed && (
				<div className="mt-12 flex justify-center md:mt-32">
					<button type="button" aria-label="Load More" onClick={handleLoadMore} className="text-center">
						<TextLink underlineColour="black">{`<pst-bec>L</>oad Mo<pst-bec>r</>e`}</TextLink>
					</button>
				</div>
			)}
		</div>
	);
};
export default AllWorkGrid;
