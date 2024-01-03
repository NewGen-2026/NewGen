import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useScrollBlock } from "~/hooks/useScrollBlock";
import { Button } from "~/components/elements/buttons/Button";
import GridSubmenu from "./GridSubmenu";
import TwoColSubmenu from "./TwoColSubmenu";

const MobileMenu = ({ mobileMenuOpen, menu, setMobileMenuOpen, breakpointCrossed }) => {
	const [activeSubmenu, setActiveSubmenu] = useState(null) as any;
	const [blockScroll, allowScroll] = useScrollBlock();

	const router = useRouter();

	useEffect(() => {
		if (mobileMenuOpen) {
			blockScroll();
		} else {
			allowScroll();
		}
	}, [allowScroll, blockScroll, mobileMenuOpen]);

	useEffect(() => {
		const handleRouteChange = () => {
			setMobileMenuOpen(false);
			setActiveSubmenu(null);
		};

		router.events.on("routeChangeStart", handleRouteChange);

		return () => {
			router.events.off("routeChangeStart", handleRouteChange);
		};
	}, [router.events, setMobileMenuOpen]);

	useEffect(() => {
		if (!breakpointCrossed) {
			setMobileMenuOpen(false);
		}
	}, [breakpointCrossed, setMobileMenuOpen]);

	return (
		<div
			className={clsx(
				`fixed inset-0 z-[100] flex h-full w-full flex-col justify-between gap-6 overflow-auto bg-white px-4 pb-4 pt-20  transition-opacity duration-200 will-change-[opacity] lg:hidden`,
				mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
			)}
		>
			<div className="flex w-full items-center gap-6 xl:gap-8">
				<nav className={clsx(`flex w-full flex-col  text-black`)}>
					{menu?.nav?.map((navItem, i) => (
						<div className="relative" key={`nav-item-${i}`}>
							<button
								type="button"
								aria-label="Open submenu"
								onClick={() => setActiveSubmenu(i === activeSubmenu ? null : i)}
								className="flex w-full items-center justify-between py-4 text-left font-heading text-[2rem] font-black uppercase leading-[1.1] tracking-[-0.02em]"
							>
								<LinkWrapper link={navItem?.nav_item?.link?.url || "/#"} hasSubmenu={navItem?.nav_item?.has_submenu} className="w-full">
									{navItem?.nav_item?.link?.title}
								</LinkWrapper>
								{navItem?.nav_item?.has_submenu && (
									<svg
										className={clsx(`transition-transform duration-300 will-change-transform`, activeSubmenu === i ? "rotate-180 transform text-cobalt" : "")}
										width="18"
										height="11"
										viewBox="0 0 18 11"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M1 1.5L9 8.5L17 1.5" stroke="currentColor" strokeWidth="3" />
									</svg>
								)}
							</button>
							<div className={clsx(`flex flex-col transition duration-300 will-change-[height]`, activeSubmenu === i ? "opacity-1 h-auto" : "h-0 opacity-0")}>
								{navItem?.nav_item?.has_submenu &&
									activeSubmenu === i &&
									(navItem?.nav_item?.submenu_layout === "grid" ? (
										<GridSubmenu key="gridMenuMobile" data={navItem?.nav_item?.grid_submenu} isMobile={breakpointCrossed} />
									) : (
										<TwoColSubmenu key="twoColMenuMobile" data={navItem?.nav_item?.two_col_submenu} isMobile={breakpointCrossed} />
									))}
							</div>
						</div>
					))}
				</nav>
			</div>

			<Button
				className="!w-full text-center !text-electric"
				button={{
					background_color: "cobalt",
					text_color: "electric",
					hover_background_color: "cobalt",
					text_hover_color: "electric",
					size: "wide",
				}}
			>
				G<span className="font-gridular font-normal">e</span>t in t<span className="font-gridular font-normal">o</span>uch
			</Button>
		</div>
	);
};
export default MobileMenu;

const LinkWrapper = ({ children, link, className = "", hasSubmenu }) => {
	if (!hasSubmenu) {
		return (
			<Link className={`${className}`} href={link}>
				{children}
			</Link>
		);
	}
	return <div className={className}>{children}</div>;
};
