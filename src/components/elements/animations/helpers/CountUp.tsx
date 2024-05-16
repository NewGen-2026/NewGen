/* eslint-disable consistent-return */
import { useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect } from "react";

type CountUpProps = {
	stat: number;
	startCount: boolean;
};

const CountUp = (props: CountUpProps) => {
	const { stat, startCount } = props;

	const count = useMotionValue(0);

	const formatNumber = (number) => {
		if (number % 1 === 0) {
			return number?.toString();
		}
		if (stat % 1 === 0) {
			return Math.round(number).toString();
		}
		return number?.toFixed(1);
	};

	const number = useTransform(count, (latest) => formatNumber(latest));

	const createRandomSequence = (target) => {
		const sequence = [0];
		const maxJumps = 5;

		const averageIncrement = target / maxJumps;

		while (sequence[sequence.length - 1] < target) {
			const lastValue = sequence[sequence.length - 1];

			let nextValue = Math.min(lastValue + Math.random() * averageIncrement * 1.5, target);

			if (nextValue - lastValue < averageIncrement / 2) {
				nextValue = Math.min(lastValue + averageIncrement, target);
			}

			sequence.push(parseFloat(nextValue.toFixed(1)));
		}

		if (sequence[sequence.length - 1] !== target) {
			sequence[sequence.length - 1] = target;
		}

		return sequence;
	};

	useEffect(() => {
		if (startCount) {
			const sequence = createRandomSequence(stat);
			let i = 0;
			const interval = setInterval(() => {
				if (i < sequence.length) {
					count.set(sequence[i]);
					i += 1;
				} else {
					clearInterval(interval);
				}
			}, 1000 / sequence.length);

			return () => clearInterval(interval);
		}
	}, [count, startCount, stat]);

	return <motion.div className="inline">{number}</motion.div>;
};

export default CountUp;
