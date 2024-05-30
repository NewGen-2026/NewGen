import Link from "next/link";
import { useState } from "react";
import { TextLink } from "~/components/elements/buttons/Button";
import WpImage from "~/components/elements/WpImage";

const Offices = (props) => {
	const { items } = props;

	return (
		<div className="grid grid-cols-2 gap-2 md:gap-4 md-large:grid-cols-4 xl:gap-8 ">
			{items?.map((item, i) => <OfficeBlock item={item} key={`office${i}`} />)}
		</div>
	);
};
export default Offices;

const OfficeBlock = ({ item }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<IsLink
			onMouseEnter={() => setIsHovered(!!item?.link?.url)}
			onMouseLeave={() => setIsHovered(false)}
			item={item}
			className="relative aspect-[320/380] bg-black/10 text-white md-large:max-w-[320px]"
		>
			<WpImage image={item?.image} className=" h-full w-full object-cover" />
			<div className="absolute inset-0 flex w-full items-end px-3 py-3 md:px-5 md:py-6 xl:p-6">
				<div
					className={`t-32  font-heading font-black uppercase transition-transform duration-300 ease-in-out md:translate-y-0 md:group-hover:-translate-y-8 ${
						item?.link?.url ? "-translate-y-6" : ""
					}`}
				>
					{item?.title}
				</div>
				{item?.link?.url && (
					<div className="absolute bottom-2 transition-opacity delay-75 duration-200 group-hover:opacity-100 md:bottom-5 md:opacity-0 ">
						<div className="-ml-2 scale-[0.8] md:ml-0 md:scale-100">
							<TextLink isParentHovered={isHovered} underlineColour="white">
								{item?.link?.title || `<pst-bec>L</>earn Mo<pst-bec>r</>e`}
							</TextLink>
						</div>
					</div>
				)}
			</div>
		</IsLink>
	);
};

const IsLink = ({ item, children, className, ...other }) => {
	if (item?.link?.url) {
		return (
			<Link href={item?.link?.url} {...other} className={`${className} group`}>
				{children}
			</Link>
		);
	}

	return <div className={className}>{children}</div>;
};
