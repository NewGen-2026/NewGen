import Link from "next/link";
import { useRouter } from "next/router";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { HoverButton } from "~/components/elements/buttons/Button";

const TwoColContentLinks = (props) => {
	const { heading, button, links } = props;

	const router = useRouter();

	const handleSelectChange = (event) => {
		router.push(event.target.value);
	};

	return (
		<div className="flex w-full flex-col justify-between gap-8 gap-y-8 md:flex-row">
			<div className="flex-1 md:max-w-[907px]">
				<h1 className="t-120 max-w-[500px] font-black uppercase !text-black">
					<FontSwitcher text={heading} />
				</h1>
				<div className="mt-6 flex flex-wrap items-center  gap-5 xss2:flex-nowrap md:mt-10">
					<Link href={button?.link?.url} className="whitespace-nowrap">
						<HoverButton button={button} />
					</Link>

					<div className="t-18 relative -ml-2 font-medium md:hidden">
						<select
							style={{
								backgroundImage: "unset",
							}}
							onChange={handleSelectChange}
							className="appearance-none border-none bg-transparent focus:ring-0   "
						>
							{/* <option value="" disabled selected>
								Select an option
							</option> */}

							{links?.map((link, i) => (
								<option key={`link${i}`} value={link?.link?.url}>
									{link?.link?.title}
								</option>
							))}
						</select>

						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-ketchup">
							<svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" />
							</svg>
						</div>
					</div>
				</div>
			</div>
			<div className="t-18 hidden max-w-[437px] flex-1 flex-col gap-2 md:flex md:gap-4">
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
