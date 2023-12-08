import { useState } from "react";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { Link } from "~/components/elements/links/Link";
import { getTextColorGroupHoverClasses } from "~/utils/getColors";

const LinkGrid = (props) => {
	const { items } = props;

	return (
		<div className="grid gap-5 gap-y-8 md:grid-cols-2 md:gap-6 lg:gap-8 lg:gap-x-8 xl:gap-y-24">
			{items?.map((item, i) => <GridItem key={`item${i}`} item={item} />)}
		</div>
	);
};
export default LinkGrid;

const GridItem = ({ item }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div className="group flex flex-1 flex-col" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			<Link href={item?.link || "/#"} className="flex h-full flex-col">
				<div className="bg-stone-5  aspect-[672/400] w-full">
					<WpImage image={item?.image} className="h-full w-full object-cover" />
				</div>
				<div className="flex flex-col justify-between">
					<h3 className={`t-48 group-hover mt-5 font-black uppercase md:mt-10 ${getTextColorGroupHoverClasses(item?.hover_color)}`}>
						<FontSwitcher text={item?.heading || "Title"} hover isHovered={isHovered} />
					</h3>

					<p className="t-20 mt-3 max-w-[555px] md:mt-8">{item?.content || "Description"}</p>
				</div>
			</Link>
		</div>
	);
};
