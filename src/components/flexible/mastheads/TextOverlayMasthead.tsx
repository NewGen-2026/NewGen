import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { getBgColorClasses } from "~/utils/getColors";
import { motion } from "framer-motion";

const TextOverlayMasthead = (props) => {
	const { background_color, top_line_left, top_line_right, middle_line, bottom_line, image } = props;

	return (
		<div className={`relative flex flex-col justify-center gap-y-8 pt-24 md:flex-row md:items-end md:pt-28 ${getBgColorClasses(background_color)}`}>
			<div className="mx-auto w-full max-w-[1440px]">
				<div className="inset-0 flex items-center md:absolute">
					<div className="container md:pt-20">
						<h1 className="t-144 text-center font-black uppercase">
							<div className="relative z-0 flex justify-center gap-[0.1em] md:gap-[1em]">
								<motion.span
									initial={{
										x: "0.5em",
									}}
									animate={{
										x: 0,
									}}
									className="inline-block"
								>
									<FontSwitcher startDelay={200} text={top_line_left} />
								</motion.span>
								<motion.span
									initial={{
										x: "-0.5em",
									}}
									animate={{
										x: 0,
									}}
									className="inline-block"
								>
									<FontSwitcher text={top_line_right} />
								</motion.span>
							</div>
							<span className="relative z-10 block">
								<FontSwitcher text={middle_line} />
							</span>
							<span className="relative z-10 block">
								<FontSwitcher startDelay={300} text={bottom_line} />
							</span>
						</h1>
					</div>
				</div>

				<motion.div
					initial={{
						opacity: 0,
						y: 50,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						opacity: {
							duration: 0.3,
							delay: 0.2,
						},
						delay: 0.2,
					}}
					className="relative z-[5] flex w-full justify-center"
				>
					<WpImage image={image} priority className="mx-auto max-w-[35%]" />
				</motion.div>
			</div>
		</div>
	);
};
export default TextOverlayMasthead;
