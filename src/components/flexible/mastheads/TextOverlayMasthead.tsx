import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { getBgColorClasses } from "~/utils/getColors";
import { motion } from "framer-motion";

const vairantThemeStyles = {
	talent: {
		imageClass: "max-w-[42.8%] translate-x-[-5%]",
	},
	creator: {
		imageClass: "max-w-[35%]",
	},
};

const TextOverlayMasthead = (props) => {
	const { variant } = props;

	const variantType = variant || "creator";
	return variantType === "about" ? <TextOnTopVariant {...props} variant={variantType} /> : <AssetAtBottomVariant {...props} variant={variantType} />;
};
export default TextOverlayMasthead;

const AssetAtBottomVariant = (props) => {
	const { background_color, top_line_left, top_line_right, middle_line, bottom_line, image, variant } = props;

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
									transition={{
										delay: 0.4,
									}}
									className="inline-block"
								>
									<FontSwitcher startDelay={600} text={top_line_left} />
								</motion.span>
								<motion.span
									initial={{
										x: "-0.5em",
									}}
									animate={{
										x: 0,
									}}
									transition={{
										delay: 0.4,
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
								<FontSwitcher startDelay={700} text={bottom_line} />
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
							delay: 0.6,
						},
						delay: 0.6,
					}}
					className="relative z-[5] flex w-full justify-center"
				>
					<WpImage image={image} priority className={`mx-auto ${vairantThemeStyles[variant]?.imageClass}`} />
				</motion.div>
			</div>
		</div>
	);
};

const TextOnTopVariant = (props) => {
	const { top_line, middle_line, bottom_line, image, variant } = props;

	return (
		<div className="pt-6 md:pt-0">
			<h1 className="t-144 text-center font-black uppercase !leading-[0.8]">
				<span className="relative z-10 block translate-x-[-12%]">
					<FontSwitcher startDelay={600} text={top_line} />
				</span>

				<span className="relative z-10 block translate-x-[14%]">
					<FontSwitcher text={middle_line} />
				</span>
				<span className="relative z-10 block translate-x-[-1%]">
					<FontSwitcher startDelay={700} text={bottom_line} />
				</span>
			</h1>

			<div className="-mt-3 md:-mt-[4.5rem]">
				<WpImage image={image} priority className={`mx-auto ${vairantThemeStyles[variant]?.imageClass}`} />
			</div>
		</div>
	);
};
