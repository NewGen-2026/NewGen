import WpImage from "~/components/elements/WpImage";

const IconBlockItem = ({ item }) => {
	return (
		<div className="mx-3 w-full max-w-[420px] md:mx-8">
			<div>
				<WpImage image={item?.icon} className=" h-14 w-14 " />
			</div>
			<div className="mt-10">
				<div className="t-32 font-heading font-black uppercase">{item?.heading}</div>
				<div className="t-18 mt-5 max-w-[385px] font-medium !leading-[1.35] opacity-70">{item?.content}</div>
			</div>
		</div>
	);
};

export default IconBlockItem;
