import WpImage from "~/components/elements/WpImage";

const LogoGrid = (props) => {
	const { logos } = props;

	return <div className="flex justify-center gap-5 md:justify-start md:gap-10">{logos?.map((item, i) => <WpImage key={`logo${i}`} image={item?.logo} />)}</div>;
};
export default LogoGrid;
