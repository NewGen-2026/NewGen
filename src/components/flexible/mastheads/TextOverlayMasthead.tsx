import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { getBgColorClasses } from "~/utils/getColors";
import { motion } from "framer-motion";

const variantThemeStyles = {
	talent: {
		imageClass: "max-w-[42.8%] translate-x-[-5%]",
	},
	creator: {
		imageClass: "max-w-[35%]",
	},
};

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
					<WpImage image={image} priority className={`mx-auto ${variantThemeStyles[variant]?.imageClass}`} />
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
				<WpImage image={image} priority className={`mx-auto ${variantThemeStyles[variant]?.imageClass}`} />
			</div>
		</div>
	);
};

const AssetInCenterVariant = (props) => {
	const { top_line_left, top_line_right, middle_line_left, middle_line_right, second_middle_line, bottom_line, content, image } = props;
	return (
		<div className="relative flex flex-col pt-24 md:min-h-[800px] md:pb-32 md:pt-[300px]">
			<h1 className="t-120 text-center font-black uppercase !leading-[0.9]">
				<div className="relative z-0 flex  justify-center gap-[0.1em] md:gap-[1em]">
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
				<div className="relative  flex justify-center gap-[0.1em] md:gap-[1.8em]">
					<motion.span
						initial={{
							x: "0.9em",
						}}
						animate={{
							x: 0,
						}}
						transition={{
							delay: 0.4,
						}}
						className="inline-block"
					>
						<FontSwitcher startDelay={600} text={middle_line_left} />
					</motion.span>
					<motion.span
						initial={{
							x: "-0.9em",
						}}
						animate={{
							x: 0,
						}}
						transition={{
							delay: 0.4,
						}}
						className="relative z-10 inline-block"
					>
						<FontSwitcher text={middle_line_right} />
					</motion.span>
				</div>
				<span className="relative z-10 block ">
					<FontSwitcher startDelay={700} text={second_middle_line} />
				</span>
				<span className="relative z-0 block ">
					<FontSwitcher startDelay={700} text={bottom_line} />
				</span>
			</h1>

			<p className="t-20 mx-auto mt-7 max-w-[750px] text-center font-medium text-electric opacity-80 md:mt-14">{content}</p>

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
				className="inset-0 z-[5] mt-7 flex w-full items-center justify-center md:absolute md:mt-0"
			>
				<div className="w-full max-w-[75%] translate-y-[5%] md:max-w-[35.11%] md:translate-x-[2%] md:translate-y-[-18%]">
					<WpImage image={image} priority className="mx-auto w-full  object-contain" />
				</div>
			</motion.div>
		</div>
	);
};

const variantComponents = {
	about: TextOnTopVariant,
	work: AssetInCenterVariant,
};

const getVariantComponent = (variant, props) => {
	const Component = variantComponents[variant] || AssetAtBottomVariant;
	return <Component {...props} variant={variant} />;
};

const TextOverlayMasthead = (props) => {
	const { variant = "creator" } = props;
	return getVariantComponent(variant, props);
};
export default TextOverlayMasthead;
