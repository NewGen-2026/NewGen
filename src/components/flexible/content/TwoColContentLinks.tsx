import Link from "next/link";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { HoverButton } from "~/components/elements/buttons/Button";

const TwoColContentLinks = (props) => {
	const { heading, button, links } = props;

	return (
		<div className="flex w-full flex-col justify-between gap-8 gap-y-8 md:flex-row">
			<div className="flex-1 md:max-w-[907px]">
				<h1 className="t-120 max-w-[500px] font-black uppercase !text-black">
					<FontSwitcher text={heading} />
				</h1>
				<div className="mt-6 md:mt-10">
					<Link href={button?.link?.url}>
						<HoverButton button={button} />
					</Link>
				</div>
			</div>
			<div className="t-18 flex max-w-[437px] flex-1 flex-col gap-2 md:gap-4">
				{links?.map((link, i) => (
					<Link key={`link${i}`} href={link?.link?.url} className="transition-colors duration-200 hover:text-ketchup">
						{link?.link?.title}
					</Link>
				))}
			</div>
		</div>
	);
};
export default TwoColContentLinks;
