import { useState } from "react";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import Link from "next/link";
import CreatorCard from "../creatorBlocks/CreatorCard";

const RosterGrid = (props) => {
	const { roster } = props;

	return (
		<div className=" flex flex-wrap gap-2 sm:gap-4 md:gap-8 ">
			{roster?.map((creator, i) => (
				<div key={`creator${i}`} className={`${i === 6 ? "flex-[1_1_45%] lg:flex-[1_1_64%]" : "flex-[1_1_45%] lg:flex-[1_1_30%]"}  bg-energy`}>
					<CreatorCard className="!w-full !max-w-[unset] !flex-1" creator={creator} size={i === 6 ? "large" : "default"} />
				</div>
			))}
			<GridLink />
		</div>
	);
};
export default RosterGrid;

const GridLink = () => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link
			href="/roster"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="flex items-center justify-center bg-energy p-5 py-20 text-center text-boost transition-colors duration-200 hover:bg-boost hover:text-energy lg:aspect-[437/580] lg:flex-[1_1_30%]"
		>
			<div className="t-96 mx-auto w-full max-w-[338px] font-heading font-black uppercase">
				<FontSwitcher hover isHovered={isHovered} text="Vi<pil-pst>e</>w full r<pil-pst>o</>ster" />
			</div>
		</Link>
	);
};
