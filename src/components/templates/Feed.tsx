import dynamic from "next/dynamic";

const FeedList = dynamic(() => import("../feed/FeedList"), { ssr: false });

const Feed = (props) => {
	const { page } = props;

	return (
		<div className="container min-h-screen pt-24 md:pt-44">
			<FeedList posts={page?.posts} />
		</div>
	);
};
export default Feed;
