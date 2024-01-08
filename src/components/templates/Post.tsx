import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import useAutoSlider from "~/hooks/useAutoSlider";
import dynamic from "next/dynamic";
import { TextLink } from "../elements/buttons/Button";
import Asset from "../elements/Asset";
import { Link } from "../elements/links/Link";
import WpImage from "../elements/WpImage";
import FeedMarquee from "../flexible/marquees/FeedMarquee";
import { LinkedIn, TikTok, Twitter } from "../flexible/creatorBlocks/Socials";

const TwitterShareButton = dynamic(() => import("react-share").then((mod) => mod.TwitterShareButton), {
	ssr: false,
});

const LinkedinShareButton = dynamic(() => import("react-share").then((mod) => mod.LinkedinShareButton), {
	ssr: false,
});

const FlexiblePostContent = dynamic(() => import("../feed/FlexiblePostContent"), { ssr: false });

export default function Post(data) {
	const {
		page: { post_title, post_content, author, featured_image, related_posts, post_date_formatted },
	} = data;

	const ref = useRef(null);

	const [overrideSlide, setOverrideSlide] = useState(null);
	const activeSlide = useAutoSlider(ref, post_content?.slider?.assets?.length, {
		intervalDuration: 5000,
		startDelay: 0,
		overrideActiveSlide: overrideSlide,
	});

	const isInViewOnce = useInView(ref, { once: true });

	return (
		<>
			<div className="container pt-20 md:pt-36">
				<div className="flex w-full max-w-[1090px] justify-between gap-4">
					<div className="hidden max-w-[150px] flex-1 text-black md:block">
						<Link href="/blog-and-podcasts">
							<TextLink underlineColour="black">{`T<pst-hal>a</>ke me <pst-hal>b</>ack`}</TextLink>
						</Link>
					</div>
					<div className="flex max-w-[737px] flex-1 justify-between gap-4">
						<div className="max-w-[672px] flex-1">
							<div className="mb-6 md:mb-12">
								<div className="t-15 font-bold">Article</div>
								<h1 className="t-44 mt-1 md:mt-3">{post_title}</h1>
								<div className="t-16 mt-4 font-medium opacity-50 md:mt-8">{post_date_formatted}</div>
							</div>
						</div>
						<div className="relative max-w-[40px] flex-1 " />
					</div>
				</div>
				<div ref={ref} className="flex w-full max-w-[1090px] justify-between gap-2 md:gap-4">
					<div className="hidden max-w-[150px] flex-1 text-black md:block" />
					<div className="flex max-w-[737px] flex-1 justify-between gap-1 md:gap-4">
						<div className="max-w-[672px] flex-1">
							{post_content?.slider?.assets?.length ? (
								<div className="relative aspect-[672/944] w-full bg-stone/20">
									{post_content?.slider?.assets?.map((slide, i) => (
										<motion.div
											key={`slide-${i}`}
											initial={{
												opacity: 0,
											}}
											animate={{
												opacity: activeSlide === i ? 1 : 0,
											}}
											transition={{
												duration: 0.5,
											}}
											className="absolute inset-0 h-full w-full"
										>
											<Asset {...slide} className="h-full w-full object-cover " />
										</motion.div>
									))}
									<div className="pointer-events-none absolute left-0 right-0 top-0 h-[30%] bg-gradient-to-b from-black/50 to-black/0 sm:h-[20%]" />
									<div className="absolute inset-0 w-full px-3 py-4 sm:p-5">
										<div className="flex w-full gap-2">
											{post_content?.slider?.assets?.map((slide, i) => (
												<button
													type="button"
													aria-label={`Slide ${i}`}
													key={`nav-${i}`}
													onClick={() => setOverrideSlide(i)}
													className="relative h-[2px] flex-1 overflow-hidden bg-stone/50"
												>
													{activeSlide === i && isInViewOnce && (
														<motion.div
															initial={{
																x: "-100%",
															}}
															animate={{
																x: "0%",
															}}
															transition={{
																duration: 5,
																ease: "linear",
															}}
															className="absolute inset-0 h-full w-full bg-white"
														/>
													)}
												</button>
											))}
										</div>
										<div className="mt-3 flex items-center gap-3 text-white md:mt-5">
											<div className="h-10 w-10 flex-none transform-gpu overflow-hidden rounded-full bg-energy sm:h-16 sm:w-16">
												<WpImage image={author?.acf?.profile_picture} className="h-full w-full rounded-full object-cover" />
											</div>
											<div className="mt-1">
												<div className="t-18 font-medium">{author?.name}</div>
												<div className="t-16 mt-[4px] font-medium text-stone">{author?.acf?.job_title}</div>
											</div>
										</div>
									</div>
								</div>
							) : featured_image ? (
								<div className=" aspect-[672/944] w-full bg-stone/20">
									<WpImage image={featured_image} className="h-full w-full object-cover" />
								</div>
							) : null}
							{post_content?.excerpt && <div className="t-24 mt-6 font-medium !leading-[1.35] !opacity-100 md:mt-12">{post_content?.excerpt}</div>}
							{post_content?.content_blocks?.length && (
								<div className="mt-8 space-y-8 md:mt-16 md:space-y-16">
									<FlexiblePostContent {...post_content} />
								</div>
							)}
						</div>
						<div className="relative hidden max-w-[40px] flex-1 sm:block ">
							<ArticleShare />
						</div>
					</div>
				</div>
			</div>

			{related_posts?.length > 0 && (
				<div className="mb-8 mt-16 overflow-hidden md:mb-20 md:mt-32 lg:mt-[200px]">
					<FeedMarquee posts={related_posts} hide_button />
				</div>
			)}
		</>
	);
}

const ArticleShare = () => {
	const [shareURL, setShareURL] = useState("");

	useEffect(() => {
		const url = typeof window !== "undefined" ? window.location.href : "";
		setShareURL(url);
	}, []);

	return (
		<div className="sticky top-20 space-y-1">
			<TwitterShareButton url={shareURL}>
				<SocialWrapper>
					<Twitter />
				</SocialWrapper>
			</TwitterShareButton>
			<LinkedinShareButton url={shareURL}>
				<SocialWrapper>
					<LinkedIn />
				</SocialWrapper>
			</LinkedinShareButton>
			<SocialWrapper>
				<div className="absolute right-[-100%] top-[20%] w-full whitespace-nowrap text-[0.7rem] opacity-0 group-hover:opacity-100">
					tiktok does not have a share feature lads
				</div>
				<TikTok />
			</SocialWrapper>
		</div>
	);
};

const SocialWrapper = ({ children }) => {
	return <div className="group relative h-8 w-8 transition-colors duration-200 hover:text-cobalt">{children}</div>;
};
