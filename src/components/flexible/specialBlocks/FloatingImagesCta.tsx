import clsx from "clsx";
import Link from "next/link";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { HoverButton } from "~/components/elements/buttons/Button";
import { getBgColorClasses } from "~/utils/getColors";

const FloatingImagesCta = (props) => {
	const { background_color, heading, button, top_left_asset, top_right_asset, bottom_left_asset, bottom_right_asset } = props;

	return (
		<div
			className={clsx(
				"relative mx-[-15px] flex items-center justify-center overflow-hidden px-5 py-[150px] xs:py-[216px] md:mx-0",
				getBgColorClasses(background_color)
			)}
		>
			<div>
				<h2 className="t-80 mx-auto w-full max-w-[500px] text-center font-black uppercase !text-black">
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
			<div className="absolute left-[8%] top-[-2%] aspect-[357/260] w-full max-w-[40%] bg-stone/20 sm:max-w-[26%]">
				<WpImage image={top_left_asset} className="h-full w-full object-cover" />
			</div>
			<div className="absolute right-[7%] top-[5%] aspect-[303/330] w-full max-w-[22%] bg-stone/20">
				<WpImage image={top_right_asset} className="h-full w-full object-cover" />
			</div>
			<div className="absolute bottom-[2%] left-[10%] aspect-[212/225] w-full max-w-[25%] bg-stone/20 sm:bottom-[20%] sm:max-w-[15.4%]">
				<WpImage image={bottom_left_asset} className="h-full w-full object-cover" />
			</div>
			<div className="absolute bottom-[-1%] right-[5%] aspect-[296/148] w-full max-w-[35%] bg-stone/20 sm:right-[17%] sm:max-w-[21.5%]">
				<WpImage image={bottom_right_asset} className="h-full w-full object-cover" />
			</div>
		</div>
	);
};
export default FloatingImagesCta;
