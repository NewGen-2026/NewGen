import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";

const NumberedGrid = (props) => {
	const { items } = props;
	return (
		<div className="flex flex-wrap gap-6 gap-y-12 md:gap-y-20 lg:grid lg:grid-cols-3 xl:gap-[70px]">
			{items?.map((item, i) => (
				<div key={`stat${i}`} className="lg:flex-[0_1_412px]">
					<h3 className="t-120 font-heading font-black uppercase">
						<FontSwitcher text={item?.number} />
					</h3>
					<div className="mt-5 md:mt-10">
						{item?.heading && (
							<h4 className="t-32 font-heading font-black uppercase">
								<FontSwitcher text={item?.heading} />
							</h4>
						)}
						<p className="t-20 mt-4 md:mt-7">{item?.content}</p>
					</div>
				</div>
			))}
		</div>
	);
};
export default NumberedGrid;
