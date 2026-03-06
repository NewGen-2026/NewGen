import Link from "next/link";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, useScroll, motion } from "framer-motion";
import clsx from "clsx";
import { useRouter } from "next/router";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";
import { VideoLoadedContext } from "~/utils/context";
import { useWindowSize } from "react-use";
import FontSwitcher from "../elements/animations/helpers/FontSwitcher";
import ScrollHeader from "../elements/animations/helpers/ScrollHeader";
import GridSubmenu from "./menus/GridSubmenu";
import TwoColSubmenu from "./menus/TwoColSubmenu";
import FooterLogoAnimation from "../elements/animations/FooterLogoAnimation";
import MobileMenu from "./menus/MobileMenu";
import MobileNavButton from "../elements/buttons/MobileNavButton";
import ScrollProgress from "./ScrollProgress";

const getSubMenuContent = (navItem) => {
	switch (navItem?.submenu_layout) {
		case "grid":
			return <GridSubmenu key="gridMenu" data={navItem.grid_submenu} />;
		case "twoCol":
			return <TwoColSubmenu key="twoColMenu" data={navItem.two_col_submenu} />;
		default:
			return null;
	}
};

export default function Header(props) {
	const { menu, pageOptions, pagePostType } = props;
	const [isHovered, setIsHovered] = useState(false);
	const [scrolledBg, setScrolledBg] = useState(false);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [showBg, setBg] = useState(false);
	const [activeSubmenu, setActiveSubmenu] = useState(null);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [logoHovered, setLogoHovered] = useState(false);
	const [routeChanged, setRouteChanged] = useState(false);

	const { width } = useWindowSize();

	const { scrollY } = useScroll();
	const isDark = !pageOptions?.header_color || pageOptions?.header_color === "dark" || (isMenuOpen && scrolledBg) || scrolledBg || mobileMenuOpen;

	const router = useRouter();
	const path = useRouter().asPath;

	const showSubmenu = activeSubmenu !== null && menu?.nav[activeSubmenu]?.nav_item?.has_submenu;

	const submenuContent = useMemo(() => getSubMenuContent(menu?.nav[activeSubmenu]?.nav_item), [activeSubmenu, menu?.nav]);

	const reset = useCallback(() => {
		setActiveSubmenu(null);
		setMenuOpen(false);
		setBg(false);
	}, []);

	const logoHover = useCallback(() => {
		setLogoHovered(true);
		reset();
	}, [reset]);

	const handleMouseEnter = useCallback((index, hasSubmenu) => {
		setActiveSubmenu(index);
		setMenuOpen(hasSubmenu);
		setBg(true);
	}, []);

	const breakpointCrossed = useBreakpointCrossed(890);

	const { videoLoaded } = useContext(VideoLoadedContext);

	const initialYHome = path === "/" && width > 1024 ? -100 : 0;

	useEffect(() => {
		const handleRouteChangeStart = () => {
			setRouteChanged(!logoHovered);
		};

		const handleRouteChangeComplete = () => {
			setRouteChanged(false);
			setLogoHovered(false);
		};

		router.events.on("routeChangeStart", handleRouteChangeStart);
		router.events.on("routeChangeComplete", handleRouteChangeComplete);

		return () => {
			router.events.off("routeChangeStart", handleRouteChangeStart);
			router.events.off("routeChangeComplete", handleRouteChangeComplete);
		};
	}, [logoHovered, router.events]);

	const headerColor = pageOptions?.header_bg_overlay ? "bg-black/70" : "bg-transparent";

	return (
		<>
			<motion.div
				initial={{ y: initialYHome }}
				animate={{ y: videoLoaded ? 0 : initialYHome }}
				transition={{
					type: "spring",
					stiffness: 200,
					damping: 20,
					delay: path === "/" ? 0.5 : 0,
				}}
				className="fixed left-0 right-0 top-0 z-[200] block transition-colors duration-200"
			>
				<ScrollHeader
					className={` transition-colors duration-300 ${scrolledBg || (isMenuOpen && scrolledBg) || mobileMenuOpen ? "bg-white" : headerColor}`}
					scrollY={scrollY}
					setScrolledBg={setScrolledBg}
					setMenuOpen={setMenuOpen}
				>
					<div
						className={clsx(
							`relative z-10 flex w-full items-center justify-between pl-4 md:pl-8`,
							isDark ? "text-black" : "text-white",
							pageOptions?.remove_nav_menu ? "md-large:py-5" : "md-large:py-0"
						)}
					>
						<Link href="/" className="block" onMouseEnter={logoHover}>
							<div className="w-full max-w-[144px] will-change-transform">
								<FooterLogoAnimation isHover hoverTrigger={routeChanged} />
							</div>
						</Link>
						{!pageOptions?.remove_nav_menu && (
							<div className="flex items-center gap-6 xl:gap-10">
								<nav className={clsx(`hidden items-center gap-6 md-large:flex lg:gap-10`, isDark ? "text-black " : "text-white")}>
									{menu?.nav?.map((navItem, i) => (
										<motion.li key={`nav-item-${i}`} className="t-16 block text-left font-heading font-black xl:relative ">
											<Link
												onMouseEnter={() => handleMouseEnter(i, navItem?.nav_item?.has_submenu)}
												onKeyDown={(e) => {
													if (e.key === "Enter" || e.key === " ") {
														handleMouseEnter(i, navItem?.nav_item?.has_submenu);
													}
												}}
												className="relative uppercase"
												href={navItem?.nav_item?.link?.url || "/#"}
											>
												{navItem?.nav_item?.link?.title}
												<div className="absolute left-0 right-0 top-[150%] w-full will-change-transform">
													<div className="relative flex h-full w-full items-center justify-center">
														{activeSubmenu === i && (
															<motion.div
																layoutId="navUnderline"
																transition={{
																	layout: {
																		type: "spring",
																		stiffness: 200,
																		damping: 18,
																		mass: 0.6,
																		bounce: 0.1,
																	},
																}}
																className={clsx("h-[6px] w-[6px] will-change-transform", isDark ? "bg-black" : "bg-white")}
															/>
														)}
													</div>
												</div>
											</Link>

											<AnimatePresence>
												{!breakpointCrossed && activeSubmenu === i && navItem?.nav_item?.has_submenu && (
													<motion.div
														key={`submenu-${i}`}
														style={{
															pointerEvents: activeSubmenu === i ? "auto" : "none",
														}}
														className="absolute left-0 top-[90px] z-[5] w-full min-w-[760px] origin-top scale-[0.8] px-5  will-change-transform lg:min-w-[800px] xl:left-[-100%] xl:top-[400%] xl:min-w-[1080px] xl:-translate-x-1/2   xl:px-0 tiny-laptop:scale-[0.8]  "
													>
														<motion.div
															initial={{
																opacity: 0,
																transform: "scale(0.8)",
															}}
															animate={{
																opacity: 1,
																transform: "scale(1)",
															}}
															exit={{
																opacity: 0,
																transform: "scale(0.8)",
																pointerEvents: "none",
															}}
															transition={{
																opacity: {
																	duration: 0.2,
																},
																transform: {
																	type: "spring",
																	stiffness: 150,
																	damping: 20,
																},
															}}
															className="menu-shadow z-[5] w-full !origin-top bg-white xl:min-w-[1088px]"
														>
															<motion.div className="w-full">{showSubmenu && submenuContent}</motion.div>
														</motion.div>
													</motion.div>
												)}
											</AnimatePresence>
										</motion.li>
									))}
								</nav>

								<Link
									onMouseEnter={() => setIsHovered(true)}
									onMouseLeave={() => setIsHovered(false)}
									href={menu?.button?.url || "/#"}
									className={clsx(
										`t-16 hidden min-h-[68.2px] min-w-[150px] justify-center  px-4 py-[26.5px] text-center font-black uppercase  transition-colors duration-200 md-large:flex`,
										isDark
											? headerButtonThemes[pageOptions?.header_button_theme]?.dark?.buttonClass || "bg-black text-cobalt hover:bg-cobalt hover:text-electric"
											: headerButtonThemes[pageOptions?.header_button_theme]?.light?.buttonClass || "bg-white text-black hover:bg-electric hover:text-cobalt"
									)}
								>
									<FontSwitcher hover isHovered={isHovered} text={headerButtonThemes[pageOptions?.header_button_theme]?.text || menu?.button?.title} />
								</Link>
							</div>
						)}

						<MobileNavButton mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} scrolledBg={scrolledBg} />
						{(pageOptions?.add_scroll_progress || pagePostType === "post") && <ScrollProgress color={pageOptions?.scroll_progress?.color || "cobalt"} />}

						{showBg && (
							<div
								style={{
									pointerEvents: showBg ? "auto" : "none",
								}}
								onMouseEnter={() => reset()}
								className="fixed bottom-0 left-0 right-0 top-[86px] z-0 h-screen w-full "
							/>
						)}
					</div>
				</ScrollHeader>
			</motion.div>

			<MobileMenu menu={menu} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} breakpointCrossed={breakpointCrossed} />
		</>
	);
}

const headerButtonThemes = {
	"boost-pil": {
		light: {
			buttonClass: "bg-white text-black hover:bg-energy hover:text-boost",
		},
		dark: {
			buttonClass: "bg-black text-white hover:bg-boost hover:text-energy",
		},
		text: `G<pst-pil>e</>t in to<pst-pil>u</>ch`,
	},
	"cobalt-rec": {
		light: {
			buttonClass: "bg-white text-black hover:bg-electric hover:text-cobalt",
		},
		dark: {
			buttonClass: "bg-black text-white hover:bg-cobalt hover:text-electric",
		},
		text: `G<pst-rec>e</>t in to<pst-rec>u</>ch`,
	},
	"ketchup-bec": {
		light: {
			buttonClass: "bg-white text-black hover:bg-candy hover:text-ketchup",
		},
		dark: {
			buttonClass: "bg-black text-white hover:bg-ketchup hover:text-candy",
		},
		text: `G<pst-bec>e</>t in to<pst-bec>u</>ch`,
	},
	default: {
		light: {
			buttonClass: "bg-white text-black hover:bg-electric hover:text-cobalt",
			dark: {
				buttonClass: "bg-black text-white hover:bg-cobalt hover:text-electric",
			},
		},
		text: `G<pst-grid>e</>t in to<pst-grid>u</>ch`,
	},
};
