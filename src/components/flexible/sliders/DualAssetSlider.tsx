import WpImage from "~/components/elements/WpImage";
import TransitionSlider from "./TransitionSlider";

const DualAssetSlider = (props) => {
	const { left_slider, right_slider } = props;

	return (
		<div className="flex flex-col justify-between gap-8 md:h-[480px] md:flex-row">
			<TransitionSlider intervalDuration={4000} className="relative min-h-[280px] max-w-[907px] flex-1 overflow-hidden bg-stone/20 md:min-h-[unset]">
				{left_slider?.left_images?.length > 1 &&
					left_slider?.left_images.map((image, i) => <WpImage key={`leftImage${i}`} image={image?.left_image} className=" h-full w-full object-cover" />)}
			</TransitionSlider>
			<TransitionSlider startDelay={500} intervalDuration={7000} className="relative hidden flex-1 bg-stone/20 md:block md:min-h-[unset] md:max-w-[437px]">
				{right_slider?.right_images?.length > 1 &&
					right_slider?.right_images.map((image, i) => <WpImage key={`rightImage${i}`} image={image?.image} className=" h-full w-full object-cover" />)}
			</TransitionSlider>
		</div>
	);
};
export default DualAssetSlider;
