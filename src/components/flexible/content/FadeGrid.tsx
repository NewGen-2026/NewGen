import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Asset from "~/components/elements/Asset";

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
			}, 1000);
		};

		if (isInView) {
			interval = setInterval(updateItems, 3000);
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
				<motion.div key={i} animate={{ opacity: opacities[i] }} transition={{ duration: 1 }} className="aspect-[320/340] w-full">
					<Asset {...items[itemIndex].asset} className="h-full w-full object-cover" />
				</motion.div>
			))}
		</div>
	);
};

export default FadeGrid;
