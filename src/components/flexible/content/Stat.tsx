import CountUp from "~/components/elements/animations/helpers/CountUp";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";

type StatProps = {
	startCount?: boolean;
	stat_prepend: string;
	stat: number;
	stat_append: string;
};

const Stat = ({ startCount, stat_prepend, stat, stat_append }: StatProps) => {
	return (
		<>
			{stat_prepend && <FontSwitcher text={stat_prepend} />}
			{stat && <CountUp stat={stat} startCount={startCount} />}
			{stat_append && <FontSwitcher text={stat_append} />}
		</>
	);
};
export default Stat;
