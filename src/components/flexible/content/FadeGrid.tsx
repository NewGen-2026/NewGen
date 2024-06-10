import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Asset from "~/components/elements/Asset";
import WpImage from "~/components/elements/WpImage";

const FadeGrid = ({ items }) => {
	const ref = useRef(null);

	const isInView = useInView(ref, {
		once: true,
	});

	const getRandomDelay = (min, max) => Math.random() * (max - min) + min;

	return (
		<div ref={ref} className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:gap-8">
			{items.map((item, i) => {
				const isLink = !!item?.link;
				const Tag = isLink ? Link : "div";
				return (
					<Tag href={isLink ? item?.link : null} className="block">
						<motion.div
							key={i}
							animate={{ opacity: isInView ? 1 : 0 }}
							transition={{
								duration: 0.5,
								delay: getRandomDelay(0, 0.5) + 0.4,
							}}
							className="relative flex aspect-[320/340] w-full items-center justify-center tiny-laptop:aspect-[1]"
						>
							<Asset {...item.asset} className="h-full w-full object-cover" />
							{item.add_logo && (
								<motion.div
									animate={{ opacity: 1 }}
									transition={{
										delay: 0.5,
										duration: 0.5,
									}}
									className={clsx(
										`absolute inset-0 flex h-full w-full justify-center p-4 md:p-6`,
										item.logo_position === "bottom" ? "items-end" : "items-center"
									)}
								>
									<div className="mx-auto w-full max-w-[80%] md:max-w-none">
										<WpImage
											image={item.logo}
											className="mx-auto max-h-[110px]
								 object-contain object-center md:max-h-none"
										/>
									</div>
								</motion.div>
							)}
						</motion.div>
					</Tag>
				);
			})}
		</div>
	);
};

export default FadeGrid;
