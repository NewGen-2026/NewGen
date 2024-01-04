import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import useAutoSlider from "~/hooks/useAutoSlider";
import dynamic from "next/dynamic";
import { TextLink } from "../elements/buttons/Button";
import Asset from "../elements/Asset";
import { Link } from "../elements/links/Link";
import WpImage from "../elements/WpImage";
import FeedMarquee from "../flexible/marquees/FeedMarquee";

const FlexiblePostContent = dynamic(() => import("../feed/FlexiblePostContent"), { ssr: false });

export default function Post(data) {
	const {
		page: { post_title, post_content, author, featured_image, related_posts },
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
								<div className="t-16 mt-4 font-medium opacity-50 md:mt-8">24 August 2022</div>
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
											<div className="h-10 w-10 flex-none overflow-hidden rounded-full bg-energy sm:h-16 sm:w-16" />
											<div className="mt-1">
												<div className="t-18 font-medium">{author?.name}</div>
												<div className="t-16 mt-[4px] font-medium text-stone">Personal Brand Executive</div>
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
							<div className="sticky top-20 space-y-2">
								<Twitter />
								<LinkedIn />
								<TikTok />
							</div>
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

const Twitter = () => {
	return (
		<svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clipPath="url(#clip0_1042_10560)">
				<path
					d="M21.5236 19.2757L27.4759 12.5H26.0659L20.8953 18.382L16.7686 12.5H12.0078L18.2495 21.3955L12.0078 28.4999H13.4178L18.8746 22.287L23.2336 28.4999H27.9944M13.9267 13.5413H16.0929L26.0649 27.5098H23.8981"
					fill="black"
				/>
			</g>
			<defs>
				<clipPath id="clip0_1042_10560">
					<rect width="15.9866" height="16" fill="white" transform="translate(12.0078 12.5)" />
				</clipPath>
			</defs>
		</svg>
	);
};

const LinkedIn = () => {
	return (
		<svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M29 29.5H25.3016V23.2007C25.3016 21.4736 24.6453 20.5085 23.2783 20.5085C21.7912 20.5085 21.0143 21.5129 21.0143 23.2007V29.5H17.45V17.5H21.0143V19.1164C21.0143 19.1164 22.0859 17.1334 24.6324 17.1334C27.1777 17.1334 29 18.6877 29 21.9023V29.5ZM13.1979 15.9287C11.9838 15.9287 11 14.9372 11 13.7143C11 12.4915 11.9838 11.5 13.1979 11.5C14.4119 11.5 15.3951 12.4915 15.3951 13.7143C15.3951 14.9372 14.4119 15.9287 13.1979 15.9287ZM11.3574 29.5H15.074V17.5H11.3574V29.5Z"
				fill="black"
			/>
		</svg>
	);
};

const TikTok = () => {
	return (
		<svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M26.5115 14.7773C26.3765 14.7075 26.2451 14.631 26.1177 14.5482C25.7474 14.3033 25.4079 14.0149 25.1065 13.689C24.3524 12.8262 24.0708 11.9508 23.967 11.3379H23.9712C23.8845 10.8291 23.9204 10.5 23.9257 10.5H20.4909V23.7818C20.4909 23.9602 20.4909 24.1364 20.4834 24.3106C20.4834 24.3322 20.4813 24.3522 20.4801 24.3756C20.4801 24.3851 20.4801 24.3951 20.478 24.4051V24.4126C20.4418 24.8892 20.289 25.3495 20.0332 25.7532C19.7773 26.1569 19.4262 26.4914 19.0106 26.7275C18.5775 26.9739 18.0877 27.1032 17.5894 27.1025C15.9891 27.1025 14.6921 25.7976 14.6921 24.186C14.6921 22.5744 15.9891 21.2695 17.5894 21.2695C17.8924 21.2692 18.1934 21.3168 18.4814 21.4107L18.4856 17.9134C17.6112 17.8004 16.7229 17.8699 15.8767 18.1175C15.0305 18.365 14.2449 18.7852 13.5692 19.3516C12.9772 19.866 12.4795 20.4798 12.0984 21.1653C11.9535 21.4153 11.4064 22.4198 11.3402 24.0502C11.2985 24.9755 11.5764 25.9343 11.7089 26.3305V26.3388C11.7922 26.5721 12.1151 27.3683 12.6413 28.0395C13.0657 28.5779 13.567 29.0509 14.1292 29.4432V29.4349L14.1375 29.4432C15.8003 30.5732 17.644 30.499 17.644 30.499C17.9632 30.4861 19.0323 30.499 20.2464 29.9236C21.593 29.2857 22.3596 28.3354 22.3596 28.3354C22.8494 27.7675 23.2388 27.1204 23.5112 26.4217C23.822 25.6047 23.9257 24.6247 23.9257 24.233V17.1867C23.9674 17.2118 24.5224 17.5788 24.5224 17.5788C24.5224 17.5788 25.3219 18.0913 26.5694 18.425C27.4643 18.6625 28.6701 18.7125 28.6701 18.7125V15.3027C28.2476 15.3485 27.3898 15.2152 26.5115 14.7773Z"
				fill="black"
			/>
		</svg>
	);
};
