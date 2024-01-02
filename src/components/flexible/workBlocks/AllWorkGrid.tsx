import WorkGridItem from "./WorkGridItem";

const AllWorkGrid = (props) => {
	const { static_posts } = props;

	const { work: workPosts, creator: creatorPosts } = static_posts;
	return (
		<div>
			<div className="grid gap-3 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:gap-x-8 xl:gap-y-20">
				{workPosts?.map((work, i) => <WorkGridItem key={`work-${i}`} work={work} variant="3col" />)}
			</div>
		</div>
	);
};
export default AllWorkGrid;
