import TextCard from "~/components/elements/text/TextCard";

const ThreeColText = (props) => {
	const { cols } = props;

	return (
		<div className="flex flex-wrap gap-6 gap-y-10 lg:gap-12">
			{cols?.map((col, i) => (
				<div key={`col-${i}`} className="flex-[1_1_50%] md:flex-1">
					<TextCard {...col?.text_card} />
				</div>
			))}
		</div>
	);
};
export default ThreeColText;
