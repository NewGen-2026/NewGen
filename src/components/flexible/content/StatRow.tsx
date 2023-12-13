import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";

const StatRow = (props) => {
	const { items } = props;
	return (
		<div className="flex flex-wrap justify-center gap-8 text-center sm:justify-start sm:text-start lg:flex-nowrap">
			{items?.map((item, i) => (
				<div key={`stat${i}`} className="lg:flex-[0_1_437px]">
					<h3 className="t-80 font-heading font-black uppercase">
						<FontSwitcher text={item?.stat} />
					</h3>
					<div className="t-24 mt-3 font-black uppercase">{item?.description}</div>
				</div>
			))}
		</div>
	);
};
export default StatRow;
