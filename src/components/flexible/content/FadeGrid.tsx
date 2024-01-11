import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Asset from "~/components/elements/Asset";
import WpImage from "~/components/elements/WpImage";

const FadeGrid = ({ items }) => {
	const ref = useRef(null);

	const isInView = useInView(ref);

	const [displayedItems, setDisplayedItems] = useState(
		Array(8)
			.fill(null)
			.map((_, i) => i % items.length)
	);
	const [opacities, setOpacities] = useState(Array(8).fill(1));

	useEffect(() => {
		let interval;

		const updateItems = () => {
			const cellIndex = Math.floor(Math.random() * 8);
			let newItemIndex;
			do {
				newItemIndex = Math.floor(Math.random() * items.length);
			} while (displayedItems.includes(newItemIndex));

			setOpacities((currentOpacities) => {
				const newOpacities = [...currentOpacities];
				newOpacities[cellIndex] = 0;
				return newOpacities;
			});

			setTimeout(() => {
				setDisplayedItems((currentItems) => {
					const newItems = [...currentItems];
					newItems[cellIndex] = newItemIndex;
					return newItems;
				});
				setOpacities((currentOpacities) => {
					const newOpacities = [...currentOpacities];
					newOpacities[cellIndex] = 1;
					return newOpacities;
				});
			}, 500);
		};

		if (isInView) {
			interval = setInterval(updateItems, 2000);
		}

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [items.length, displayedItems, isInView]);

	return (
		<div ref={ref} className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:gap-8">
			{displayedItems.map((itemIndex, i) => (
				<motion.div
					key={i}
					animate={{ opacity: opacities[i] }}
					transition={{ duration: 0.5 }}
					className="relative flex aspect-[320/340] w-full items-center justify-center"
				>
					<Asset {...items[itemIndex].asset} className="h-full w-full object-cover" />
					{items[itemIndex].add_logo && (
						<motion.div
							animate={{ opacity: opacities[i] }}
							transition={{
								delay: 0.5,
								duration: 0.5,
							}}
							className={clsx(
								`absolute inset-0 flex h-full w-full justify-center p-4 md:p-6`,
								items[itemIndex].logo_position === "bottom" ? "items-end" : "items-center"
							)}
						>
							<div className="mx-auto w-full max-w-[80%] md:max-w-none">
								<WpImage
									image={items[itemIndex].logo}
									className="mx-auto max-h-[30px]
								 object-contain object-center md:max-h-none"
								/>
							</div>
						</motion.div>
					)}
				</motion.div>
			))}
		</div>
	);
};

export default FadeGrid;
