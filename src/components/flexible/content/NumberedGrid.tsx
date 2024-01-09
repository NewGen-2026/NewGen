import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { getBgColorClasses } from "~/utils/getColors";

const NumberedGrid = (props) => {
	const { items, variant, background } = props;

	return variant === "cards" ? <CardsVariant items={items} background={background?.color} /> : <DefaultVariant items={items} />;
};
export default NumberedGrid;

const DefaultVariant = ({ items }) => {
	return (
		<div className="flex flex-wrap gap-6 gap-y-12 md:gap-y-20 lg:grid lg:grid-cols-3 xl:gap-[70px]">
			{items?.map((item, i) => (
				<div key={`stat${i}`} className="text-center md:text-left lg:flex-[0_1_412px]">
					<h3 className="t-120 font-heading font-black uppercase">
						<FontSwitcher text={item?.number} startDelay={i * 400} />
					</h3>
					<div className="mt-5 md:mt-10">
						{item?.heading && (
							<h4 className="t-32 font-heading font-black uppercase">
								<FontSwitcher text={item?.heading} />
							</h4>
						)}
						<p className="t-20-small mt-4 md:mt-7">{item?.content}</p>
					</div>
				</div>
			))}
		</div>
	);
};

const CardsVariant = ({ items, background }) => {
	return (
		<div className="mx-[-15px] flex grid-cols-3 flex-wrap gap-4 md:mx-0 md:grid lg:gap-8">
			{items?.map((item, i) => (
				<div key={`stat${i}`} className={`p-6 lg:flex-[0_1_412px] ${getBgColorClasses(background)}`}>
					<h3 className="t-48 font-heading font-black uppercase">
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
