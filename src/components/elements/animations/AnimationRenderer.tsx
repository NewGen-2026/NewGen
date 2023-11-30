import dynamic from "next/dynamic";
import HomepageMastheadAnimation from "./HomepageMastheadAnimation";

type AnimationRendererProps = {
	animation: string;
};

function AnimationRenderer({ animation }: AnimationRendererProps) {
	switch (animation) {
		case "homepageMasthead":
			return <HomepageMastheadContainer />;

		default:
			return null;
	}
}
export default AnimationRenderer;

function HomepageMastheadContainer() {
	return (
		<div className="mx-auto  xl:min-h-[618px]">
			<HomepageMastheadAnimation />
		</div>
	);
}
