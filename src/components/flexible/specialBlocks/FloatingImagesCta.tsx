import clsx from "clsx";
import { useMotionValue, useSpring, motion, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { HoverButton } from "~/components/elements/buttons/Button";
import { getBgColorClasses } from "~/utils/getColors";

const FloatingImagesCta = (props) => {
	const { background_color, heading, button, top_left_asset, top_right_asset, bottom_left_asset, bottom_right_asset } = props;
	const ref = useRef(null);

	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const springConfig = { damping: 50, stiffness: 30 };

	const springX = useSpring(x, springConfig);
	const springY = useSpring(y, springConfig);

	const handleMouseMove = (e) => {
		const rect = e.target.getBoundingClientRect();
		const mouseX = e.clientX - rect.left - rect.width / 2;
		const mouseY = e.clientY - rect.top - rect.height / 2;

		x.set(mouseX / 65);
		y.set(mouseY / 65);
	};

	return (
		<div
			ref={ref}
			onMouseMove={handleMouseMove}
			className={clsx(
				"relative mx-[-15px] flex items-center justify-center overflow-hidden px-5 py-[150px] xs:py-[216px] md:mx-0",
				getBgColorClasses(background_color)
			)}
		>
			<div>
				<h2 className="t-80 pointer-events-none mx-auto w-full max-w-[500px] text-center font-black uppercase !text-black ">
					<FontSwitcher text={heading} />
				</h2>

				{button?.link?.url && (
					<div className="mt-6 flex justify-center md:mt-10">
						<Link href={button?.link?.url}>
							<HoverButton button={button} />
						</Link>
					</div>
				)}
			</div>

			<motion.div
				style={{
					x: springX,
					y: springY,
				}}
				className="pointer-events-none absolute inset-0 h-full w-full"
			>
				<motion.div
					style={{
						x: useTransform(springX, (latest) => latest * 2),
						y: useTransform(springY, (latest) => latest * 5),
					}}
					className="absolute left-[8%] top-[-2%] aspect-[357/260] w-full max-w-[40%] bg-stone/20 sm:max-w-[26%]"
				>
					<WpImage image={top_left_asset} className="h-full w-full object-cover" />
				</motion.div>
				<div className="absolute right-[7%] top-[5%] aspect-[303/330] w-full max-w-[22%] bg-stone/20">
					<WpImage image={top_right_asset} className="h-full w-full object-cover" />
				</div>
				<div className="absolute bottom-[2%] left-[10%] aspect-[212/225] w-full max-w-[25%] bg-stone/20 sm:bottom-[20%] sm:max-w-[15.4%]">
					<WpImage image={bottom_left_asset} className="h-full w-full object-cover" />
				</div>
				<motion.div
					style={{
						x: useTransform(springX, (latest) => -latest * 2),
						y: useTransform(springY, (latest) => -latest * 5),
					}}
					className="absolute bottom-[-1%] right-[5%] aspect-[296/148] w-full max-w-[35%] bg-stone/20 sm:right-[17%] sm:max-w-[21.5%]"
				>
					<WpImage image={bottom_right_asset} className="h-full w-full object-cover" />
				</motion.div>
			</motion.div>
		</div>
	);
};
export default FloatingImagesCta;
