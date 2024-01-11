import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { getBgColorClasses } from "~/utils/getColors";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Stat from "./Stat";

const TwoColStatContent = (props) => {
	const { heading, content, stat_block } = props;

	const ref = useRef(null);

	const isInView = useInView(ref, {
		once: false,
	});

	return (
		<div ref={ref} className="flex w-full flex-col justify-between gap-6 md:flex-row">
			<div className="flex flex-col justify-between gap-y-3 md:flex-[0_1_469px] md:gap-y-6">
				<h3 className="t-48 font-black uppercase ">
					<FontSwitcher text={heading} />
				</h3>
				<p className="t-20 max-w-[440px] font-medium">{content}</p>
			</div>
			<div className={`flex flex-[0_1_30%] flex-col justify-between gap-6 p-4 sm:flex-[0_1_790px] ${getBgColorClasses(stat_block?.theme_color)}`}>
				<div className="flex flex-[1_1_180px] flex-col justify-between md:flex-[1_1_480px]">
					<h3 className="t-96 font-black uppercase">
						<Stat {...stat_block} startCount={isInView} />
					</h3>
					<h4 className="t-24 max-w-[429px] font-heading font-black uppercase">{stat_block?.description}</h4>
				</div>
			</div>
		</div>
	);
};
export default TwoColStatContent;
