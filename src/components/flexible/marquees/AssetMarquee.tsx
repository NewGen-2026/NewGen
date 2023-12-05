import dynamic from "next/dynamic";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";

const Marquee = dynamic(() => import("react-easy-marquee"), { ssr: false });
const Asset = dynamic(() => import("~/components/elements/Asset"), { ssr: false });

const AssetMarquee = (props) => {
	const { assets } = props;

	const breakpointCrossed = useBreakpointCrossed(768);

	return (
		<div className="asset-marquee min-h-[200px] w-full ">
			<Marquee duration={breakpointCrossed ? 12000 : 10000} axis="X" align="center" height="200px" width="100%">
				{assets?.map((asset, i) => (
					<div key={`asset-${i}`} className="mx-3 w-[296px]">
						<Asset className="marquee-asset w-[296px]" {...asset?.asset} />
					</div>
				))}
			</Marquee>
		</div>
	);
};
export default AssetMarquee;
