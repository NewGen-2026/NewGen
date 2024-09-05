import clsx from "clsx";
import { useState } from "react";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { Link } from "~/components/elements/links/Link";
import { getTextColorGroupHoverClasses } from "~/utils/getColors";
import { motion } from "framer-motion";

const LinkGrid = (props) => {
	const { items, variant } = props;

	return (
		<div
			className={clsx(
				"grid",
				variant === "3col" ? "gap-4 gap-y-10 md:grid-cols-3 md:gap-8" : ` gap-5 gap-y-8 md:grid-cols-2 md:gap-6 lg:gap-8 lg:gap-x-8 xl:gap-y-24`
			)}
		>
			{items?.map((item, i) => <GridItem key={`item${i}`} item={item} variant={variant} />)}
		</div>
	);
};
export default LinkGrid;

const GridItem = ({ item, variant }) => {
	const [isHovered, setIsHovered] = useState(false);

	const threeColVariant = variant === "3col";

	return (
		<div
			className={` ${item?.link ? "group" : ""} flex flex-1 flex-col`}
			onMouseEnter={() => setIsHovered(!!item?.link)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<IsLinkWrapper link={item?.link} className="flex h-full flex-col">
				<div className="mx-[-15px] md:mx-0">
					<div className="bg-stone-5 aspect-[672/400] w-full overflow-hidden">
						<motion.div
							initial={{ scale: 1 }}
							animate={{
								scale: isHovered ? 1.05 : 1,
							}}
							transition={{
								type: "spring",
								stiffness: 200,
								damping: 22,
							}}
							className="h-full w-full "
						>
							<WpImage image={item?.image} className="h-full w-full object-cover" />
						</motion.div>
					</div>
				</div>
				<div className={`flex ${threeColVariant ? "" : "flex-1"}  flex-col justify-between`}>
					<h3
						className={`${threeColVariant ? "t-44" : "t-48 "} ${
							item?.heading_max_width ? "max-w-[312px]" : ""
						} group-hover mt-5 font-black uppercase md:mt-10 ${getTextColorGroupHoverClasses(item?.hover_color)}`}
					>
						<FontSwitcher text={item?.heading || "Title"} hover isHovered={isHovered} />
					</h3>

					<p className={`${threeColVariant ? "t-18 !leading-[1.35]" : "t-20 "} mt-3 max-w-[555px] font-medium opacity-75 md:mt-8`}>
						{item?.content || "Description"}
					</p>
				</div>
			</IsLinkWrapper>
		</div>
	);
};

const IsLinkWrapper = ({ className = "", link, children }) => {
	if (link)
		return (
			<Link href={link || "/#"} className={className}>
				{children}
			</Link>
		);
	return children;
};
