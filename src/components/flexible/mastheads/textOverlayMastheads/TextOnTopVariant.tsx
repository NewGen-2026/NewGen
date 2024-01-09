import WpImage from "~/components/elements/WpImage";
import SplitTextFontSwitcher from "~/components/elements/animations/helpers/SplitTextFontSwitcher";

const TextOnTopVariant = (props) => {
	const { top_line, middle_line, bottom_line, image } = props;

	return (
		<div className="pt-6 md:pt-0">
			<h1 className="t-144 text-center font-black uppercase !leading-[0.8]">
				<span className="relative z-10 block translate-x-[-12%]">
					<SplitTextFontSwitcher delay={0.1} reverse stagger={0.6} fontSwitchStartDelay={700} text={top_line} />
				</span>

				<span className="relative z-10 block translate-x-[14%]">
					<SplitTextFontSwitcher text={middle_line} delay={0.2} stagger={0.2} direction="down" />
				</span>
				<span className="relative z-10 block translate-x-[-1%]">
					<SplitTextFontSwitcher delay={1} fontSwitchStartDelay={900} text={bottom_line} direction="down" />
				</span>
			</h1>
			<div className="mx-[-15px] -mt-3 bg-stone/10 md:mx-0 md:-mt-[4.5rem]">
				<WpImage image={image} priority className="mx-auto" />
			</div>
		</div>
	);
};

export default TextOnTopVariant;
