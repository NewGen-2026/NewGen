import { useState } from "react";
import FontSwitcher from "../elements/animations/helpers/FontSwitcher";

const CTA = () => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div className="container mb-12 mt-8 md:mt-20">
			<div
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className={`w-full  ${
					isHovered ? "bg-electric text-cobalt" : "bg-cobalt text-electric"
				} t-144 px-5 py-20 text-center font-heading font-black uppercase transition-colors duration-200 md:py-32`}
			>
				<h2>
					<FontSwitcher hover isHovered={isHovered} text="G<pst-grid>e</>t in to<pst-grid>u</>ch" />
				</h2>
			</div>
		</div>
	);
};
export default CTA;
