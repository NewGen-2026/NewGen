import FeedList from "~/components/feed/FeedList";

const FeedListFlexible = (props) => {
	const { static_posts } = props;

	const { post: posts } = static_posts;

	return (
		<div>
			<FeedList posts={posts} />
		</div>
	);
};
export default FeedListFlexible;
