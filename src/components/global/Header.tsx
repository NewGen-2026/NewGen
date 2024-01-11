import Link from "next/link";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { motion, useScroll } from "framer-motion";
import clsx from "clsx";
import { useRouter } from "next/router";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";
import { VideoLoadedContext } from "~/utils/context";
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

	const { scrollY } = useScroll();
	const isDark = !pageOptions?.header_color || pageOptions?.header_color === "dark" || (isMenuOpen && scrolledBg) || scrolledBg || mobileMenuOpen;

	const path = useRouter().asPath;

	const showSubmenu = activeSubmenu && activeSubmenu.has_submenu;

	const submenuContent = useMemo(() => getSubMenuContent(activeSubmenu), [activeSubmenu]);

	const handleMouseEnter = useCallback((navItem) => {
		setActiveSubmenu(navItem?.nav_item);
		setMenuOpen(navItem?.nav_item?.has_submenu);
		setBg(true);
	}, []);

	const reset = useCallback(() => {
		setActiveSubmenu(null);
		setMenuOpen(false);
		setBg(false);
	}, []);

	const breakpointCrossed = useBreakpointCrossed(890);

	const { videoLoaded } = useContext(VideoLoadedContext);

	const initialYHome = path === "/" ? -100 : 0;

	return (
		<>
			<motion.div
				initial={{ y: initialYHome }}
				animate={{ y: videoLoaded ? 0 : initialYHome }}
				transition={{
					type: "spring",
					stiffness: 200,
					damping: 20,
					delay: path === "/" ? 3.2 : 0,
				}}
				className="fixed left-0 right-0 top-0 z-[200] block transition-colors duration-200"
			>
				<ScrollHeader
					className={` transition-colors duration-300 ${scrolledBg || (isMenuOpen && scrolledBg) || mobileMenuOpen ? "bg-white" : "bg-transparent"}`}
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
						<Link href="/" className="block" onMouseEnter={() => reset()}>
							<div className="w-full max-w-[144px]">
								<FooterLogoAnimation isHover />
							</div>
						</Link>
						{!pageOptions?.remove_nav_menu && (
							<div className="flex items-center gap-6 xl:gap-10">
								<nav className={clsx(`hidden items-center gap-6 md-large:flex lg:gap-10`, isDark ? "text-black " : "text-white")}>
									{menu?.nav?.map((navItem, i) => (
										<motion.li
											key={`nav-item-${i}`}
											onHoverStart={() => handleMouseEnter(navItem)}
											onKeyDown={(e) => {
												if (e.key === "Enter" || e.key === " ") {
													handleMouseEnter(navItem);
												}
											}}
											className="t-16 block text-left font-heading font-black xl:relative "
										>
											<Link className="relative uppercase" href={navItem?.nav_item?.link?.url || "/#"}>
												{navItem?.nav_item?.link?.title}
												<div className="absolute left-0 right-0 top-[150%] w-full will-change-transform">
													<div className="relative flex h-full w-full items-center justify-center">
														{activeSubmenu === navItem?.nav_item && (
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

											{!breakpointCrossed && activeSubmenu === navItem?.nav_item && navItem?.nav_item?.has_submenu && (
												<motion.div
													style={{
														pointerEvents: isMenuOpen ? "auto" : "none",
													}}
													className="absolute left-0 top-[90px] z-[5] w-full min-w-[960px] px-5 will-change-transform  lg:min-w-[1000px] xl:left-[50%] xl:top-[400%] xl:min-w-[1088px] xl:-translate-x-1/2   xl:px-0  "
												>
													<motion.div
														initial={{ opacity: 0 }}
														animate={{
															opacity: isMenuOpen ? 1 : 0,
														}}
														layoutId="menu"
														transition={{
															opacity: {
																duration: 0.2,
															},
															layout: {
																type: "spring",
																stiffness: 150,
																damping: 20,
															},
														}}
														className="z-[5] w-full bg-white will-change-transform xl:min-w-[1088px]"
													>
														<motion.div layout="position" className="w-full will-change-transform">
															{showSubmenu && submenuContent}
														</motion.div>
													</motion.div>
												</motion.div>
											)}
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
