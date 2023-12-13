import WpImage from "~/components/elements/WpImage";

const Offices = (props) => {
	const { items } = props;
	return (
		<div className="grid grid-cols-2 gap-2 md:gap-4 md-large:grid-cols-4 xl:gap-8 ">
			{items?.map((item, i) => (
				<div key={`office${i}`} className="relative aspect-[320/380] bg-black/10 text-white md-large:max-w-[320px]">
					<WpImage image={item?.image} className=" h-full w-full object-cover" />
					<div className="absolute inset-0 flex w-full items-end px-3 py-3 md:px-5 md:py-6  xl:p-6">
						<div className="t-32 font-heading font-black uppercase">{item?.title}</div>
					</div>
				</div>
			))}
		</div>
	);
};
export default Offices;
