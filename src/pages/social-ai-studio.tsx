import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import Link from "next/link";
import Logo from "~/components/global/Logo";
import SocialAiStudioForm from "~/components/forms/SocialAiStudioForm";
import cms from "~/utils/cms";

// ─── Hidden landing page ──────────────────────────────────────────────────────
// Reachable only at /social-ai-studio/ – it is not a WordPress page, so it never
// appears in the sitemap, site search or navigation, and it is marked noindex.
// Built from references/Social AI Studio Landing.html.

// Contact Form 7 post ID for the "Social AI Studio – Book a demo" form.
// WP admin → Contact → Contact Forms → open the form → the ?post= number in the URL.
const CF7_FORM_ID = 5869; // "Social AI Studio – Book a demo" → harry.hancock@thenewgen.com

const INSTAGRAM_URL = "https://www.instagram.com/thenewgenagency/";

const EYEBROW = "text-[12px] font-semibold uppercase tracking-[0.08em]";
const CONTAINER = "mx-auto w-full max-w-[1280px]";

const STATS = [
	{
		label: "Speed",
		value: "3 days ⟶ <4 hrs",
		body: "Social AI Studio cuts social video production from around three days to around four hours.",
		className: "bg-black text-white",
	},
	{
		label: "Scale",
		value: "One to many",
		body: "Our creatives direct, the studio produces. One idea adapted for every platform and market, tailored to each client's guidelines and guardrails.",
		className: "bg-boost text-white",
	},
	{
		label: "Insight",
		value: "Human + AI",
		body: "Trend identification and creative insights that sharpen human-made work, paired with the creative and cultural thinking of our teams.",
		className: "bg-electric text-black",
	},
];

export default function SocialAiStudio() {
	return (
		<>
			<NextSeo
				title="Social AI Studio | NewGen"
				description="Social AI Studio: a new service from NewGen. Human-centric. Powered by our proprietary AI technology. Book a fifteen-minute demo."
				noindex
				nofollow
			/>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="theme-color" content="#5800C8" />
			</Head>

			<div className="flex min-h-screen flex-col bg-white font-body text-[16px] leading-normal text-black antialiased">
				<header className={`${CONTAINER} flex items-center justify-between px-6 py-5`}>
					<Link href="/" aria-label="NewGen home" className="block h-[22px] hover:text-boost">
						<Logo className="h-[22px] w-auto" fill="currentColor" />
					</Link>
					<div className={EYEBROW}>Social AI Studio</div>
				</header>

				{/* Hero + form */}
				<section className="relative overflow-hidden bg-boost px-6 pb-16 pt-12 text-white">
					<div className={`${CONTAINER} grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-12`}>
						<div className="relative">
							<div className={`${EYEBROW} mb-6`}>Social AI Studio</div>
							<h1 className="text-[clamp(44px,6.5vw,88px)] font-extrabold uppercase leading-[0.85] tracking-[-0.02em] [text-wrap:balance]">
								The speed of social has a new <span className="font-recoleta font-semibold normal-case">playbook</span>
							</h1>
							<p className="mt-8 max-w-[480px] text-[18px] [text-wrap:pretty]">
								Social AI Studio: A new service. Human-centric. Powered by our proprietary AI technology.
							</p>
							<svg viewBox="0 0 100 100" fill="#fff" className="absolute -top-2 right-0 h-[72px] w-[72px]" aria-hidden="true">
								<path d="M50 4 L56 32 L84 26 L68 50 L92 66 L62 68 L62 96 L50 74 L38 96 L38 68 L8 66 L32 50 L16 26 L44 32 Z" />
							</svg>
						</div>

						<div className="relative rounded-3xl bg-white p-8 text-black">
							<SocialAiStudioForm formId={CF7_FORM_ID} instagramUrl={INSTAGRAM_URL} />
						</div>
					</div>
				</section>

				{/* What is it */}
				<section className="px-6 py-24">
					<div className={`${CONTAINER} grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-12`}>
						<div>
							<div className={`${EYEBROW} mb-6`}>What is Social AI Studio</div>
							<h2 className="text-[clamp(36px,5vw,64px)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] [text-wrap:balance]">
								AI content that moves at the speed of social
							</h2>
						</div>
						<div className="flex flex-col gap-6 text-[18px] [text-wrap:pretty]">
							<p>
								We&apos;ll showcase the most advanced AI technology being used in social today, demonstrating what&apos;s now possible for brands - from
								creating and adapting content at scale to entirely new creative possibilities.
							</p>
							<p>
								But is more, faster and cheaper necessarily better? And will everyone agree this is a good thing? Social AI Studio is part of the mix, alongside
								production, creators and UGC. Book a demo and judge for yourself.
							</p>
						</div>
					</div>
				</section>

				{/* Proof */}
				<section className="px-6 pb-24">
					<div className={`${CONTAINER} mb-8 flex flex-col gap-3`}>
						<div className={EYEBROW}>Speed. Scale. Insight.</div>
						<p className="max-w-[640px] text-[22px] [text-wrap:pretty]">
							Everything we build with Social AI Studio equips our people to be smarter and faster.
						</p>
					</div>
					<div className={`${CONTAINER} grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4`}>
						{STATS.map((stat) => (
							<div key={stat.label} className={`flex min-h-[220px] flex-col justify-between rounded-3xl p-8 ${stat.className}`}>
								<div className={EYEBROW}>{stat.label}</div>
								<div className="my-6 text-[clamp(36px,4.5vw,60px)] font-extrabold uppercase leading-[0.85] tracking-[-0.03em] [text-wrap:balance]">
									{stat.value}
								</div>
								<div className="max-w-[280px] text-[15px] [text-wrap:pretty]">{stat.body}</div>
							</div>
						))}
					</div>
					<p className={`${CONTAINER} mt-4 text-[12px] text-[#4A4A4A]`}>
						Speed: Social AI Studio logs, Sep to Oct 2026. Median working time, full-concept films, against three days for practical production.
					</p>
				</section>

				<footer className="mt-auto bg-black px-6 py-12 text-white">
					<div className={`${CONTAINER} flex flex-wrap items-end justify-between gap-6`}>
						<div className="flex flex-col gap-5">
							<Logo className="h-[22px] w-auto self-start" fill="white" />
							<div className="text-[clamp(28px,4vw,48px)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em]">
								For the now
								<br />
								and the next
							</div>
						</div>
						<div className="flex flex-col gap-1.5 text-[13px] uppercase tracking-[0.04em]">
							<a href="mailto:hello@thenewgen.com" className="hover:text-boost">
								hello@thenewgen.com
							</a>
							<span className="text-[#8A8A8A]">London · New York · Manchester</span>
						</div>
					</div>
				</footer>
			</div>
		</>
	);
}

// Options are only needed so _app can inject the WordPress global scripts (Cookiebot etc.).
export async function getStaticProps() {
	const options = await cms().options();
	return {
		props: { options },
		revalidate: 6000,
	};
}
