import clsx from "clsx";
import { useState } from "react";
import { getBgColorClasses, getTextAlwaysDarkClasses } from "~/utils/getColors";
import { motion } from "framer-motion";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";
import dynamic from "next/dynamic";

const DynamicCF7Form = dynamic(() => import("~/components/forms/DynamicCF7Form"), { ssr: false });

// ─── Form config ──────────────────────────────────────────────────────────────
// The single streamlined enquiry form (name / email / company / message → newbusiness@thenewgen.com).
// This is the CF7 post ID — confirm it matches the "General Enquiries" form's ?post= ID in WP admin.
const GENERAL_FORM_ID = 3516;

const SUBMIT_BUTTON_COLORS = {
	background_color: "cobalt",
	text_color: "white",
	hover_background_color: "white",
	text_hover_color: "black",
} as const;

// ─── Main component ──────────────────────────────────────────────────────────
const ContactForm = (props: any) => {
	const { form, theme_color, add_faqs, faqs, form_redirect } = props;

	return (
		<div className={clsx("w-full px-[15px] py-16 md:px-5 md:py-32 md-large:py-[160px]", getBgColorClasses(theme_color))}>
			<motion.div layout className="mx-auto w-full max-w-[640px]">
				<div>
					<h2 className="t-48 font-heading uppercase">{form?.heading}</h2>
					<p className="t-20 mt-3 font-medium md:mt-6">{form?.content}</p>
				</div>

				<div className="mt-8 md:mt-16">
					<DynamicCF7Form formId={GENERAL_FORM_ID} formRedirect={form_redirect} submitLabel="Submit" buttonColors={SUBMIT_BUTTON_COLORS} />

					{add_faqs && faqs && <FAQs faqs={faqs} theme_color={theme_color} />}
				</div>
			</motion.div>
		</div>
	);
};

export default ContactForm;

// ─── Sub-components ─────────────────────────────────────────────────────────

const FAQs = ({ faqs, theme_color }: any) => {
	const [activeFaq, setActiveFaq] = useState(0);
	const breakpointCrossed = useBreakpointCrossed(768);
	return (
		<div className="mt-10 lg:mt-[72px]">
			<h3 className="t-44 font-black uppercase">FAQs</h3>
			<motion.div layout className="mt-5 flex flex-col gap-6 md:gap-[36px] lg:mt-[72px]">
				{faqs?.map((faq: any, i: number) => (
					<Faq
						faq={faq}
						i={i}
						key={`faq-${i}`}
						breakpointCrossed={breakpointCrossed}
						theme_color={theme_color}
						activeFaq={activeFaq}
						setActiveFaq={setActiveFaq}
					/>
				))}
			</motion.div>
		</div>
	);
};

const Faq = ({ faq, i, activeFaq, setActiveFaq, theme_color, breakpointCrossed }: any) => (
	<motion.button type="button" aria-label="FAQ" onClick={() => setActiveFaq(activeFaq === i ? null : i)} layout className="group block w-full text-start">
		<motion.div layout className="flex w-full items-start gap-3 transition-colors duration-300 lg:gap-7">
			<span
				className={`block h-5 w-5 flex-none transform transition-transform md:mt-0.5 md:mt-1 md:h-[25px] md:w-[25px] ${
					activeFaq === i ? "rotate-45" : "rotate-0"
				} ${getTextAlwaysDarkClasses(theme_color)}`}
			>
				<svg width="100%" height="100%" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="11.5" width="3" height="25" fill="currentColor" />
					<rect x="25.5" y="11" width="3" height="25" transform="rotate(90 25.5 11)" fill="currentColor" />
				</svg>
			</span>
			<div>
				<h4 className="t-32 font-black uppercase">{faq.question}</h4>
				<motion.div
					layout
					initial={false}
					animate={activeFaq === i ? "open" : "closed"}
					variants={{
						open: {
							height: "auto",
							opacity: 1,
							overflow: "visible",
							marginTop: breakpointCrossed ? 15 : 30,
							transition: {
								duration: 0.3,
								ease: "easeInOut",
								opacity: { delay: 0.2, duration: 0.3 },
							},
						},
						closed: {
							height: 0,
							opacity: 0,
							marginTop: 0,
							overflow: "hidden",
							transition: { duration: 0.3, ease: "easeInOut" },
						},
					}}
					className="t-22 no-paragraph-margin prism blog prose opacity-75"
				>
					{faq.answer}
				</motion.div>
			</div>
		</motion.div>
	</motion.button>
);
