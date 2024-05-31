import { motion } from "framer-motion";
import FontSwitcher from "./FontSwitcher";

const SplitTextFontSwitcher = ({
	text,
	delay = 0,
	stagger = 0.1,
	reverse = false,
	fontSwitchStartDelay = 1500,
	direction = "up",
	randomStagger = false,
	startAnimation = true,
}) => {
	const words = text.split(" ");
	const totalWords = words.length;

	const yDirection = direction === "down" ? "-0.2em" : direction === "none" ? 0 : "0.2em";

	return words.map((word, index) => {
		const delayIndex = reverse ? totalWords - 1 - index : index;

		return (
			<motion.span
				key={word + index}
				initial={{
					y: yDirection,
					opacity: 0,
				}}
				animate={{
					y: startAnimation ? 0 : yDirection,
					opacity: startAnimation ? 1 : 0,
				}}
				transition={{
					y: {
						delay: delay + delayIndex * stagger + 0.2,
						type: "spring",
						stiffness: 1200,
						damping: 15,
						mass: 0.2,
					},
					opacity: {
						duration: 0.05,
						delay: randomStagger ? Math.random() * 0.5 : delay + delayIndex * stagger + 0.2,
					},
				}}
				style={{ marginRight: index < totalWords - 1 ? "0.1em" : "0" }}
				className="inline-block"
			>
				<FontSwitcher startDelay={fontSwitchStartDelay} text={word + (index < totalWords - 1 ? " " : "")} />
			</motion.span>
		);
	});
};
export default SplitTextFontSwitcher;
