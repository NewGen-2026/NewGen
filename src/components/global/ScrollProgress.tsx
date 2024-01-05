import { useScroll, useTransform, motion } from "framer-motion";
import { getBgColorClasses } from "~/utils/getColors";

const ScrollProgress = ({ color }) => {
	const { scrollYProgress } = useScroll();

	const x = useTransform(scrollYProgress, [0.05, 1], ["-100%", "0%"]);

	return (
		<div className="absolute bottom-[-2px] left-0 right-0 h-[2px] w-full overflow-hidden">
			<div className="relative h-full w-full overflow-hidden">
				<motion.div style={{ x }} className={`absolute inset-0 h-full w-full ${getBgColorClasses(color)}`} />
			</div>
		</div>
	);
};
export default ScrollProgress;
