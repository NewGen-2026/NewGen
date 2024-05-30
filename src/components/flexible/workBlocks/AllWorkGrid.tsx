/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { HoverButton, TextLink } from "~/components/elements/buttons/Button";
import WorkGridItem from "./WorkGridItem";

const LOAD_MORE_AMOUNT = 9;

const AllWorkGrid = (props) => {
	const { work: workPosts } = props;

	const router = useRouter();

	const defaultWorkType = "All";
	const defaultService = "All";
	const defaultSector = "All";

	const [selectedService, setSelectedService] = useState(defaultService) as any;
	const [selectedSector, setSelectedSector] = useState(defaultSector) as any;
	const [selectedWorkType, setSelectedWorkType] = useState("All") as any;
	const [displayedPostsCount, setDisplayedPostsCount] = useState(LOAD_MORE_AMOUNT);

	const [sectorManuallySet, setSectorManuallySet] = useState(false);

	useEffect(() => {
		const { query } = router;
		setSelectedWorkType(query.work_type || defaultWorkType);
		setSelectedService(query.service || defaultService);
		// Remove this after sectors filters are designed and use the commented line below
		if (!sectorManuallySet) {
			setSelectedSector(query.sector || defaultSector);
		}

		// setSelectedSector(query.sector || defaultSector);
	}, [router.query, defaultWorkType, defaultService, defaultSector, router, sectorManuallySet]);

	const updateUrlParams = (service, workType, sector) => {
		router.push(
			{
				pathname: router.pathname,
				query: { ...router.query, service, work_type: workType, sector },
			},
			undefined,
			{ shallow: true }
		);
	};

	const handleSectorSelection = (slug) => {
		setSelectedSector(slug);
		updateUrlParams(selectedService, selectedWorkType, slug);
	};

	const handleServiceSelection = (slug) => {
		setSelectedService(slug);
		updateUrlParams(slug, selectedWorkType, selectedSector);
	};

	const handleWorkTypeSelection = (slug) => {
		setSelectedWorkType(slug);
		// remove these lines after sectors filters are designed
		setSelectedSector("All");
		setSectorManuallySet(false);
		//

		if (slug !== "All") {
			setSelectedService(defaultService);
		}
		updateUrlParams(selectedService, slug, "All");
	};

	const handleLoadMore = () => {
		setDisplayedPostsCount((prevCount) => prevCount + LOAD_MORE_AMOUNT);
	};

	const uniqueWorkTypes = new Map([["All", { slug: "All", hoverName: "<pst-pil>A</>ll" }]]);
	workPosts?.forEach((work) => {
		work?.work["work-type"]?.forEach((type) => {
			uniqueWorkTypes.set(type.name, { slug: type.slug, hoverName: type?.acf?.hover_style });
		});
	});

	const uniqueSectors = new Map([["All", "All"]]);
	workPosts.forEach((work) => {
		work?.work.sector.forEach((sector) => {
			if (!uniqueSectors.has(sector.slug)) {
				uniqueSectors.set(sector.slug, sector.name);
			}
		});
	});

	const filteredPostsForServices = workPosts.filter((work) => {
		const workTypeMatch = selectedWorkType === "All" || work?.work["work-type"].some((type) => type.slug === selectedWorkType);
		const sectorMatch = selectedSector === "All" || work?.work.sector.some((sector) => sector.slug === selectedSector);
		return workTypeMatch && sectorMatch;
	});

	const filteredPostsForSectors = workPosts.filter((work) => {
		const serviceMatch = selectedService === "All" || work?.work.services.some((service) => service.slug === selectedService);
		const workTypeMatch = selectedWorkType === "All" || work?.work["work-type"].some((type) => type.slug === selectedWorkType);
		return serviceMatch && workTypeMatch;
	});

	const availableSectors = filteredPostsForSectors
		.flatMap((work) => work?.work.sector)
		.reduce(
			(acc, sector) => {
				acc.set(sector.slug, sector.name);
				return acc;
			},
			new Map([["All", "All"]])
		);

	const availableServices = filteredPostsForServices
		.flatMap((work) => work?.work.services)
		.reduce(
			(acc, service) => {
				const key = service.name;
				if (!acc.has(key)) {
					acc.set(key, service.slug);
				}
				return acc;
			},
			new Map([["All", "All"]])
		);

	const workTypeNames = Array.from(uniqueWorkTypes.entries());
	const serviceNames = Array.from(availableServices.entries()) as any;
	const filteredAndSlicedWorkPosts = workPosts.filter((work) => {
		const serviceMatch = selectedService === "All" || work?.work.services.some((service) => service.slug === selectedService);
		const workTypeMatch = selectedWorkType === "All" || work?.work["work-type"].some((type) => type.slug === selectedWorkType); // Check for 'all' slug
		const sectorMatch = selectedSector === "All" || work?.work.sector.some((sector) => sector.slug === selectedSector);
		return serviceMatch && workTypeMatch && sectorMatch;
	});

	const sectorOptions = Array.from(availableSectors, ([slug, name]) => ({ slug, name }));

	const filteredWorkPosts = filteredAndSlicedWorkPosts.slice(0, displayedPostsCount);
	const allPostsDisplayed = displayedPostsCount >= filteredAndSlicedWorkPosts.length;

	return (
		<div id="all-work-grid" className="scroll-mt-20">
			<div className="mb-8 flex flex-col flex-wrap items-center gap-y-5 md:mb-20 lg:flex-row lg:justify-between xl:flex-nowrap">
				<div className="hide-scrollbars w-full overflow-x-scroll md:w-auto">
					<ul className="t-15 hide-scrollbars flex w-full gap-4 overflow-x-scroll font-bold md:w-auto lg:gap-2">
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
				</div>

				<div className="scroll-container relative w-full lg:w-auto">
					<div className="t-15-large  hide-scrollbars relative flex min-h-[40px] w-full gap-4 overflow-x-auto  px-2 font-bold sm:justify-center sm:px-0 lg:w-auto xl:gap-8">
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
				{filteredWorkPosts?.length > 0 ? (
					filteredWorkPosts.map((work, i) => (
						<motion.div
							key={`work-${i}-${selectedWorkType}`}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{
								opacity: 1,
								scale: 1,
							}}
							transition={{
								delay: i * 0.05,
							}}
						>
							<WorkGridItem work={work?.work} variant="3col" />
						</motion.div>
					))
				) : (
					<div className="t-18 pl-8">No work found</div>
				)}
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
