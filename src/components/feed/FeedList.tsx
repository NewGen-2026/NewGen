/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import FeedPreview from "./FeedPreview";
import IconsRenderer from "../elements/icons/IconsRenderer";
import FontSwitcher from "../elements/animations/helpers/FontSwitcher";
import { HoverButton, TextLink } from "../elements/buttons/Button";
import WpImage from "../elements/WpImage";

const FeedList = ({ posts: initialPosts, featured_tags }) => {
	const router = useRouter();

	const [visiblePostsCount, setVisiblePostsCount] = useState(10);
	const [selectedCategory, setSelectedCategory] = useState("home") as any;
	const [selectedTag, setSelectedTag] = useState("all") as any;
	const [activeArticle, setActiveArticle] = useState(`post-0`);
	const [navState, setNavState] = useState("nextPrev");
	const [searchText, setSearchText] = useState("");
	const [searchedPosts, setSearchedPosts] = useState([]);
	const [showSearchResults, setShowSearchResults] = useState(false);
	const [email, setEmail] = useState("");
	const [isEmailValid, setEmailValid] = useState(true);
	const [isSubscribed, setSubscribed] = useState(false);
	const [availableTags, setAvailableTags] = useState(new Set());

	const observer = useRef() as any;

	const lastPostElementRef = useCallback((node) => {
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setVisiblePostsCount((prevCount) => prevCount + 10);
			}
		});
		if (node) observer.current.observe(node);
	}, []);

	const activeArticleIndex = activeArticle ? parseInt(activeArticle.split("-")[1], 10) : null;
	const nextArticleId = activeArticleIndex !== null && activeArticleIndex < initialPosts.length - 1 ? `post-${activeArticleIndex + 1}` : null;
	const prevArticleId = activeArticleIndex !== null && activeArticleIndex > 0 ? `post-${activeArticleIndex - 1}` : null;

	const handleSearch = () => {
		const searchedPost = initialPosts?.filter((post) => post?.post_title?.toLowerCase()?.includes(searchText?.toLowerCase()));
		setSearchedPosts(searchedPost);
		setShowSearchResults(true);
	};

	const handleCloseSearch = () => {
		setShowSearchResults(false);
		setNavState("nextPrev");
		setSearchText("");
		setSearchedPosts([]);
	};

	const handleCloseSubscribe = () => {
		setNavState("nextPrev");
		setEmail("");
		setEmailValid(true);
		setSubscribed(false);
	};

	const validateEmail = (text) => {
		const re = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
		return re.test(text);
	};

	const handleSubscribe = () => {
		if (isEmailValid && email !== "") {
			setSubscribed(true);
		} else {
			setEmailValid(false);
		}
	};

	const handleChangeEmail = (e) => {
		const emailInput = e.target.value;
		setEmail(emailInput);
		setEmailValid(validateEmail(emailInput));
		if (emailInput === "") {
			setEmailValid(true);
		}
	};

	const handleSubmit = () => {
		if (navState === "search") {
			handleSearch();
		} else if (navState === "subscribe") {
			handleSubscribe();
		} else {
			setNavState("subscribe");
		}
	};

	const handleCategoryClick = (categorySlug) => {
		setSelectedCategory(categorySlug);
		setSelectedTag("all");
		router.push(
			{
				pathname: router.pathname,
				query: { ...router.query, category: categorySlug, tag: "all" },
			},
			undefined,
			{ shallow: true }
		);
	};

	const handleTagClick = (tagSlug) => {
		setSelectedTag(tagSlug);
		router.push(
			{
				pathname: router.pathname,
				query: { ...router.query, tag: tagSlug },
			},
			undefined,
			{ shallow: true }
		);
	};

	const categoryCounts = initialPosts.reduce((acc, post) => {
		post.categories.forEach((category) => {
			acc[category.slug] = (acc[category.slug] || 0) + 1;
		});
		return acc;
	}, {});

	const filteredPosts = useMemo(() => {
		return initialPosts.filter((post) => {
			const categoryMatch = selectedCategory === "home" || post.categories.some((category) => category.slug === selectedCategory);
			const tagMatch = selectedTag === "all" || post.post_tag.some((tag) => tag.slug === selectedTag);
			return categoryMatch && tagMatch;
		});
	}, [initialPosts, selectedCategory, selectedTag]);

	const getTagsForSelectedCategory = useCallback(
		(categorySlug) => {
			const tagsSet = new Set();
			initialPosts.forEach((post) => {
				if (categorySlug === "home" || post.categories.some((category) => category.slug === categorySlug)) {
					post.post_tag.forEach((tag) => {
						tagsSet.add(tag.slug);
					});
				}
			});
			return tagsSet;
		},
		[initialPosts]
	);

	useEffect(() => {
		const tags = getTagsForSelectedCategory(selectedCategory);
		setAvailableTags(tags);
	}, [getTagsForSelectedCategory, selectedCategory]);

	useEffect(() => {
		const { category, tag } = router.query;
		setSelectedCategory(category || "home");
		setSelectedTag(tag || "all");
	}, [router.query]);

	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{
					delay: 0.1,
				}}
				className="flex w-full max-w-[971px] flex-col justify-between gap-2 gap-y-12 md:flex-row"
			>
				<div className="relative w-full md:w-auto md:max-w-[203px] md:flex-1">
					<div className="sticky top-20">
						<div className="space-y-4">
							<CategoryLink active={selectedCategory === "home"} onClick={() => handleCategoryClick("home")} icon="home" title="F<pst-hal>o</>r you" />
							{Object.entries(categoryCounts).map(([slug, count]) => (
								<CategoryLink
									onClick={() => handleCategoryClick(slug)}
									active={selectedCategory === slug}
									key={slug}
									icon={slug}
									title={`${count} ${slug === "article" ? "articl<pst-grid>e</>" : slug === "podcast" ? "podc<pst-nip>a</>st" : slug}s`}
								/>
							))}
						</div>
						<ul className="t-16 mt-12 flex w-full flex-wrap items-center gap-6 font-medium md:mt-16 md:block md:flex-nowrap md:space-y-6">
							<FeaturedTag tag={{ slug: "all", name: "all" }} onClick={() => handleTagClick("all")} active={selectedTag === "all"} />
							{featured_tags.map(
								(tag) =>
									availableTags.has(tag.slug) && (
										<FeaturedTag key={tag?.term_id} tag={tag} onClick={() => handleTagClick(tag?.slug)} active={selectedTag === tag?.slug} />
									)
							)}
						</ul>
					</div>
				</div>
				<div className="max-w-[502px] flex-1 space-y-16 md:space-y-24">
					{filteredPosts.slice(0, visiblePostsCount).map((post, i) => (
						<div key={`post-${post?.ID}`} id={`post-${i}`} ref={i + 1 === visiblePostsCount ? lastPostElementRef : null} className="relative scroll-mt-20">
							<PreviewWrapper setActiveArticle={setActiveArticle} id={`post-${i}`}>
								<FeedPreview i={i} {...post} />
							</PreviewWrapper>
						</div>
					))}
				</div>
			</motion.div>

			<div
				style={{
					opacity: showSearchResults ? 1 : 0,
					pointerEvents: showSearchResults ? "all" : "none",
				}}
				onClick={handleCloseSearch}
				className="fixed inset-0 bg-black/10"
			/>

			<div className="z-5 fixed bottom-[100px] left-0 right-0 flex  w-full justify-center px-[15px] md:bottom-[120px] md:px-5">
				<AnimatePresence>
					{showSearchResults && (
						<motion.div
							key="searchResults"
							initial={{ opacity: 0, y: 20, scale: 0.9 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 0, scale: 1 }}
							className="max-h-[500px] w-full max-w-[860px] !origin-bottom overflow-y-scroll bg-white px-[15px] py-4 will-change-transform md:p-4 laptop:max-h-[400px]"
						>
							{searchedPosts?.length ? (
								searchedPosts?.map((post) => (
									<Link
										key={`searchedPost-${post?.ID}`}
										href={post?.permalink || "/#"}
										className="flex items-center justify-between gap-2 py-2 transition-colors duration-200 hover:bg-stone/20 md:gap-5 md:p-2"
									>
										<div className="flex items-center gap-5">
											<div className="h-10 w-10 flex-none">
												<WpImage image={post?.featured_image} className="h-full w-full object-cover" />
											</div>
											<div className="t-18 mt-1 font-medium">{post?.post_title}</div>
										</div>

										<div className="h-6 w-6 flex-none rounded-full bg-energy" />
									</Link>
								))
							) : (
								<div className="t-18 font-medium">No results found</div>
							)}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<div className="fixed bottom-0 left-0 right-0 z-10 w-full  justify-center  md:bottom-5 md:flex md:px-5">
				<div className="flex w-full max-w-[860px] items-center justify-between gap-5 overflow-hidden bg-black p-3 will-change-transform">
					<div className="flex-1 pl-3">
						<AnimatePresence mode="popLayout">
							{navState === "search" ? (
								<motion.div
									key="search"
									initial="initial"
									animate="animate"
									exit="exit"
									variants={navAnimationVariants}
									className="relative flex items-center gap-8"
								>
									<input
										type="text"
										placeholder="Search content"
										onChange={(e) => setSearchText(e.target.value)}
										onKeyDown={(e) => e.key === "Enter" && handleSearch()}
										className="default-input t-20 border-t-none w-full max-w-[648px] border-b border-white bg-transparent !py-[15px] focus:border-white"
									/>
									<CloseButton onClick={handleCloseSearch} />
								</motion.div>
							) : navState === "subscribe" ? (
								<motion.div
									key="subscribe"
									initial="initial"
									animate="animate"
									exit="exit"
									variants={navAnimationVariants}
									className="relative flex items-center gap-8"
								>
									{!isSubscribed ? (
										<input
											type="email"
											placeholder="Your email address"
											value={email}
											onChange={handleChangeEmail}
											onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
											className={clsx(
												`default-input t-20 border-t-none w-full max-w-[648px] border-b border-white bg-transparent !py-[15px] focus:border-white`,
												!isEmailValid && "!border-ketchup"
											)}
										/>
									) : (
										<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="t-18 font-medium">
											Thank you for subscribing!
										</motion.div>
									)}
									<CloseButton onClick={handleCloseSubscribe} />
								</motion.div>
							) : (
								<motion.div
									key="nextPrev"
									initial="initial"
									animate="animate"
									exit="exit"
									variants={navAnimationVariants}
									className="flex items-center gap-4 sm:gap-8 "
								>
									<NextPrev disabled={nextArticleId === null} href={nextArticleId ? `#${nextArticleId}` : null} />
									<NextPrev disabled={prevArticleId === null} href={prevArticleId ? `#${prevArticleId}` : null} directon="up" title="Previous Article" />
								</motion.div>
							)}
						</AnimatePresence>
					</div>
					<div className="flex items-center gap-8">
						{navState === "nextPrev" && (
							<button type="button" onClick={() => setNavState("search")} className="mt-1 block">
								<TextLink>{`Se<pst-rec>a</>rch`}</TextLink>
							</button>
						)}
						<div className="block w-full sm:min-w-[184px]" onClick={handleSubmit}>
							<HoverButton
								className="!w-full"
								buttonClass="!w-full"
								button={{
									size: "wide",
									background_color: "white",
									text_color: "black",
									hover_background_color: "electric",
									text_hover_color: "cobalt",
								}}
							>
								{
									{
										nextPrev: "S<pst-grid>u</>bscribe",
										search: "Se<pst-hal>a</>rch",
										subscribe: "Subscrib<pst-pil>e</>",
									}[navState]
								}
							</HoverButton>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default FeedList;

const FeaturedTag = ({ tag, onClick, active }) => {
	return (
		<li onClick={onClick} className={clsx("gap group flex cursor-pointer items-center ")}>
			<div className="flex items-center justify-center md:w-[30px]">
				{active && (
					<motion.div
						layoutId="tagBlock"
						transition={{
							layout: {
								type: "spring",
								stiffness: 300,
								damping: 28,
							},
						}}
						className="hidden h-2 w-2 bg-cobalt md:block"
					/>
				)}
			</div>
			<div
				className={clsx(
					active ? "text-cobalt opacity-100 md:text-black" : "opacity-50",
					" translate-y-[1px] transition-opacity duration-200 group-hover:opacity-100"
				)}
			>
				#{tag?.name}
			</div>
		</li>
	);
};

const navAnimationVariants = {
	initial: {
		opacity: 0,
		y: -30,
		transition: {
			y: {
				type: "spring",
				stiffness: 200,
				damping: 20,
			},
		},
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			y: {
				type: "spring",
				stiffness: 200,
				damping: 20,
				delay: 0.2,
			},
			delay: 0.2,
		},
	},
	exit: {
		opacity: 0,
		y: 30,
		transition: {
			y: {
				type: "spring",
				stiffness: 200,
				damping: 20,
			},
		},
	},
};

const CloseButton = ({ onClick }) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className="absolute right-[5px] top-[50%] translate-y-[-50%] opacity-40 transition-opacity duration-200 hover:opacity-100"
		>
			<svg width="10" height="10" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect width="22.588" height="2.62044" transform="matrix(0.700102 0.714043 -0.700102 0.714043 1.83594 0)" fill="white" />
				<rect width="22.588" height="2.62044" transform="matrix(0.700102 -0.714043 0.700102 0.714043 0.351562 16.1289)" fill="white" />
			</svg>
		</button>
	);
};

const PreviewWrapper = ({ children, setActiveArticle, id }) => {
	const ref = useRef() as any;
	const isInView = useInView(ref, {
		once: false,
		amount: 0.5,
	});

	useEffect(() => {
		if (isInView) {
			setActiveArticle(id);
		}
	}, [isInView, setActiveArticle, id]);

	return (
		<div className="h-full w-full will-change-transform" ref={ref}>
			{children}
		</div>
	);
};

const NextPrev = ({ directon = "down", title = "Next Article", href = "", disabled }) => {
	return (
		<a href={href} className={clsx(`flex items-center gap-3 transition-opacity duration-200`, disabled && "pointer-events-none opacity-50")}>
			<span className={`${directon === "down" ? "" : "-mt-2 rotate-180 md:-mt-1"} h-[16px] w-[16px] overflow-visible sm:h-[14px] sm:w-[14px]`}>
				<Arrow />
			</span>
			<div className="t-18 hidden font-medium sm:block">{title}</div>
		</a>
	);
};

const Arrow = () => {
	return (
		<svg className="!overflow-visible will-change-transform" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M6.77778 0V12M6.77778 12L1 6.22222M6.77778 12L12.5556 6.22222" stroke="white" strokeWidth="2" />
		</svg>
	);
};

const CategoryLink = ({ icon = "home", title = "F<pst-hal>o</>r you", onClick, active }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`flex cursor-pointer items-center gap-2 transition-colors duration-200 hover:text-cobalt ${active && "!text-cobalt"}`}
		>
			<div className="w-6 md:h-[30px] md:w-[30px]">
				<IconsRenderer icon={icon} />
			</div>
			<div className="t-16 mt-1 font-black uppercase">
				<FontSwitcher hover isHovered={isHovered || active} text={title} />
			</div>
		</div>
	);
};
