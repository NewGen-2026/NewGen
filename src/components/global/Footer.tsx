import Link from "next/link";
import React from "react";
import { getBgColorClasses } from "~/utils/getColors";
import FooterLogoAnimation from "../elements/animations/FooterLogoAnimation";
import { Instagram, LinkedIn, TikTok, Twitter } from "../flexible/creatorBlocks/Socials";

const themeStyles = {
	boost: {
		isLight: true,
		hoverColor: "hover:text-energy",
		focusClasses: "border-white/50 focus:border-white opacity-95",
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

const SocialIconMap = {
	twitter: <Twitter />,
	linkedin: <LinkedIn />,
	tiktok: <TikTok />,
	instagram: <Instagram />,
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
								<ul className="t-16-small mt-4 space-y-5 font-heading font-black uppercase md:space-y-6">
									{navItem?.nav_item?.links?.map((link, j) => (
										<li key={`link${j}`} className={`block transition-colors duration-300 ${themeStyles[footer_theme]?.hoverColor}`}>
											<Link className="whitespace-nowrap" href={link?.link?.url || "/#"}>
												{link?.link?.title}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</nav>
					<div className="t-18 flex w-full flex-[1_1_180px] flex-col justify-start gap-y-6 font-heading  font-medium sm:max-w-[355px] md:max-w-none">
						<ul className="t-18 flex flex-1 items-center gap-3 font-heading font-medium md-large:justify-end">
							{footer_menu?.socials?.map((social, i) => (
								<li key={`social${i}`} className={` ${themeStyles[footer_theme]?.hoverColor}`}>
									<Link href={social?.link?.url} target="_blank">
										<span className="block h-8 w-8 ">{SocialIconMap[social?.link?.title.toLowerCase()]}</span>
									</Link>
								</li>
							))}
						</ul>

						<div className="relative w-full max-w-[300px]">
							<FooterLogoAnimation isHover={false} />
						</div>
					</div>
				</div>
				<div className="mt-16 flex w-full flex-wrap gap-5 gap-y-14 sm:gap-8 md:mt-24 md:gap-20">
					{addresses?.map((address, i) => (
						<div key={`address${i}`} className="max-w-[240px] flex-[1_1_45%] md:flex-1">
							<div className="t-18-small font-black uppercase">{address?.city}</div>
							<div className="t-16 font-mediumo mt-2 !leading-[1.5]  opacity-[0.4] md:mt-4" dangerouslySetInnerHTML={{ __html: address?.address }} />
						</div>
					))}
				</div>

				<div className="t-16 mt-20 flex  flex-wrap-reverse items-center justify-center gap-12 gap-y-5 pb-8 md:justify-start">
					<div className="font-medium">&copy; NewGen {new Date().getFullYear()}. All rights reserved.</div>

					<div className="flex items-center gap-6 font-medium md:gap-12">
						{legal_links?.map((link, i) => (
							<Link key={`link${i}`} href={link?.link?.url} className={`${themeStyles[footer_theme]?.hoverColor} `}>
								{link?.link?.title}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
