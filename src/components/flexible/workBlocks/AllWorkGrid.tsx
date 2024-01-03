import { useState } from "react";
import { motion } from "framer-motion";
import WorkGridItem from "./WorkGridItem";

const AllWorkGrid = (props) => {
	const { static_posts } = props;

	const { work: workPosts, creator: creatorPosts } = static_posts;

	const [selectedService, setSelectedService] = useState("All");

	const uniqueServices = new Map([["All", "All"]]);

	workPosts?.forEach((work) => {
		work?.services?.forEach((service) => {
			uniqueServices.set(service.name, service.slug);
		});
	});

	const serviceNames = Array.from(uniqueServices.entries());

	const filteredWorkPosts =
		selectedService === "All" ? workPosts : workPosts.filter((work) => work.services.some((service) => service.slug === selectedService));

	return (
		<div>
			<div className="mb-20 flex justify-end">
				<div className="t-15  hidden gap-4 font-bold md:flex lg:gap-8">
					{serviceNames.map(([name, slug], i) => (
						<button aria-label={name} type="button" key={`service-${i}`} className="relative block cursor-pointer " onClick={() => setSelectedService(slug)}>
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
						</button>
					))}
				</div>
			</div>
			<div className="grid gap-3 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:gap-x-8 xl:gap-y-20">
				{filteredWorkPosts.map((work, i) => (
					<WorkGridItem key={`work-${i}`} work={work} variant="3col" />
				))}{" "}
			</div>
		</div>
	);
};
export default AllWorkGrid;
