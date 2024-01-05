import Link from "next/link";
import React from "react";
import { getBgColorClasses } from "~/utils/getColors";
import FooterLogoAnimation from "../elements/animations/FooterLogoAnimation";

const themeStyles = {
	boost: {
		isLight: true,
		hoverColor: "hover:text-energy",
		focusClasses: "focus:border-energy",
	},
	cobalt: {
		isLight: true,
		hoverColor: "hover:text-electric",
		focusClasses: "focus:border-energy",
	},
	black: {
		isLight: true,
		hoverColor: "hover:text-electric",
		focusClasses: "focus:border-white",
	},
	candy: {
		isLight: false,
		hoverColor: "hover:text-ketchup",
		focusClasses: "focus:border-ketchup",
	},
	white: {
		isLight: false,
		hoverColor: "hover:text-cobalt",
		focusClasses: "focus:border-cobalt",
	},
};

export default function Footer(props) {
	const { footer_menu, pageOptions, addresses, legal_links } = props;

	const footer_theme = pageOptions?.footer_theme || "white";

	const isLight = themeStyles[footer_theme]?.isLight;

	return (
		<footer className={`${getBgColorClasses(footer_theme)} my-[-1px] pb-8 pt-8 md:pb-0 md:pt-20`}>
			<div className="container">
				<div className="relative z-10 flex w-full flex-wrap items-start justify-between gap-6 gap-y-12 lg:flex-nowrap">
					<nav className="flex flex-[1_1_1080px] flex-wrap gap-4 gap-y-10 sm:gap-6 md-large:flex-nowrap xl:gap-10">
						{footer_menu?.nav?.map((navItem, i) => (
							<div key={`navItem${i}`} className="flex-[1_1_45%] sm:flex-[1_1_240px]">
								<div className={`t-18 mb-6 font-heading font-black uppercase ${isLight ? "text-stone opacity-70" : "opacity-20 "} md:mb-12`}>
									{navItem?.nav_item?.heading}
								</div>
								<ul className="t-16 mt-4 space-y-3 font-heading font-black uppercase md:space-y-6">
									{navItem?.nav_item?.links?.map((link, j) => (
										<li key={`link${j}`} className={`block transition-colors duration-300 ${themeStyles[footer_theme]?.hoverColor}`}>
											<Link href={link?.link?.url}>{link?.link?.title}</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</nav>
					<ul className="t-18 flex flex-1 items-center justify-center font-heading font-medium md:justify-start">
						{footer_menu?.socials?.map((social, i) => (
							<li key={`social${i}`} className={`mr-6 ${themeStyles[footer_theme]?.hoverColor}`}>
								<Link href={social?.link?.url}>
									<span
										dangerouslySetInnerHTML={{
											__html: social?.link?.title,
										}}
									/>
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="relative z-10 mt-16 md:mt-24">
					<form className="flex max-w-[760px] gap-2 md:gap-6">
						<input
							type="text"
							className={`focus t-22 w-full border-b border-l-0 border-r-0 border-t-0 !bg-transparent pl-0 font-heading font-black uppercase   focus:ring-0
							${themeStyles[footer_theme]?.focusClasses}
							${isLight ? "placeholder:text-stone placeholder:opacity-75" : "placeholder:opacity-20"}
							`}
							placeholder="Our Newsletter"
						/>
						<button type="submit" className={`t-18 px-[30px] py-5 font-black uppercase  ${isLight ? "bg-white text-black" : "bg-black text-white"} `}>
							Subscribe
						</button>
					</form>
				</div>
				<div className="mt-16 flex w-full flex-wrap gap-3 sm:gap-8 md:mt-24 md:gap-20">
					{addresses?.map((address, i) => (
						<div key={`address${i}`} className="max-w-[240px] flex-1">
							<div className="t-18 font-black uppercase">{address?.city}</div>
							<div className="t-16 font-mediumo mt-4  !leading-[1.5] opacity-[0.35]" dangerouslySetInnerHTML={{ __html: address?.address }} />
						</div>
					))}
				</div>

				<div className="relative mt-20 lg:mt-[200px]">
					<FooterLogoAnimation isHover={false} />
				</div>

				<div className="t-16 mt-10 flex flex-wrap items-center justify-center gap-12 gap-y-5 pb-8 md:justify-start">
					<div className="font-medium">&copy; NewGen {new Date().getFullYear()}. All rights reserved.</div>

					<div className="flex items-center gap-6 font-medium md:gap-12">
						{legal_links?.map((link, i) => (
							<Link key={`link${i}`} href={link?.link?.url} className={`${themeStyles[footer_theme]?.hoverColor}`}>
								{link?.link?.title}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
