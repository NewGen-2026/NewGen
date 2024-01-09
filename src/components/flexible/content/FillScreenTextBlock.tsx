import clsx from "clsx";
import { getBgColorClasses } from "~/utils/getColors";
import { motion, useInView, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import SplitTextFontSwitcher from "~/components/elements/animations/helpers/SplitTextFontSwitcher";

const FillScreenTextBlock = (props) => {
	const { text, theme_color, max_width } = props;

	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});
	const isInView = useInView(ref, {
		once: true,
		amount: 0.5,
	});

	const clipBaseTransform = useTransform(scrollYProgress, [0, 0.5], [2.3, 0]);
	const clipSpring = useSpring(clipBaseTransform, { stiffness: 200, damping: 20 });

	const clipTemplate = useMotionTemplate`inset(${clipSpring}% ${clipSpring}% ${clipSpring}% ${clipSpring}%)`;

	return (
		<motion.div
			ref={ref}
			style={{
				clipPath: clipTemplate,
			}}
			className={clsx("flex w-full items-center justify-center px-5 py-24 sm:py-44 md:min-h-screen md:py-[230px]", getBgColorClasses(theme_color))}
		>
			<h2
				style={{
					maxWidth: `${max_width}px`,
				}}
				className="t-96 mx-auto w-full text-center font-black uppercase"
			>
				<SplitTextFontSwitcher
					text={text}
					startAnimation={isInView}
					fontSwitchStartDelay={Math.floor(Math.random() * (900 - 600 + 1)) + 600}
					randomStagger
					direction="none"
					delay={0.2}
				/>
			</h2>
		</motion.div>
	);
};
export default FillScreenTextBlock;
