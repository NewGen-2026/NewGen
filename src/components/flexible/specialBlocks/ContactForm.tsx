import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { HoverButton } from "~/components/elements/buttons/Button";
import { getBgColorClasses, getTextAlwaysDarkClasses, getTextColorClasses, getTextColorHoverClasses, getTextContrastColorClasses } from "~/utils/getColors";
import { motion } from "framer-motion";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";
import dynamic from "next/dynamic";
import axios from "axios";

const ContactBrandsForm = dynamic(() => import("~/components/forms/ContactBrandsForm"), { ssr: false });
const ContactProcurementForm = dynamic(() => import("~/components/forms/ContactProcurementForm"), { ssr: false });
const ContactCollabForm = dynamic(() => import("~/components/forms/ContactCollabForm"), { ssr: false });
const ContactGeneralForm = dynamic(() => import("~/components/forms/ContactGeneralForm"), { ssr: false });

const MailTo = () => {
	return (
		<a href="mailto:press@newgen.com" className="t-22 mt-1 block font-medium">
			<HoverButton
				button={{
					size: "medium",
					background_color: "ketchup",
					text_color: "candy",
					hover_background_color: "white",
					text_hover_color: "black",
				}}
			>
				{`C<pst-nip>o</>ntact press te<pst-nip>a</>m`}
			</HoverButton>
		</a>
	);
};

const formMap = {
	brands: ContactBrandsForm,
	procurement: ContactProcurementForm,
	collab: ContactCollabForm,
	press: MailTo,
	general: ContactGeneralForm,
};

const ContactForm = (props) => {
	const { form, form_layout, heading, links, theme_color, contacts, add_faqs, faqs, form_endpoint } = props;

	const [isSubmitted, setIsSubmitted] = useState(false);

	const onSubmit = async (values) => {
		axios
			.post(
				form_endpoint,
				{
					...values,
				},
				{ headers: { Accept: "application/json" } }
			)
			.then((response) => {
				console.log(response);
				setIsSubmitted(true);
			})
			.catch((error) => console.log(error));
	};

	const renderForm = (layout) => {
		const FormComponent = formMap[layout];
		return FormComponent ? <FormComponent onSubmit={onSubmit} /> : null;
	};

	return (
		<div className="mx-auto flex w-full max-w-[1440px] flex-col md-large:flex-row">
			<div className="mb-16 mt-24 max-w-[588px] flex-1 px-[15px] md:my-32 md-large:my-[160px] md-large:px-8">
				<h1 className="t-72 font-heading font-black uppercase">{heading}</h1>
				<div className="mt-6 space-y-5 md:mt-8 lg:mt-14 lg:space-y-7">
					{links?.map((link, i) => (
						<FormLink
							key={`form-link${i}`}
							className={`t-32 block font-heading font-black uppercase transition-colors duration-200


							`}
							first={i === 0}
							{...link}
						/>
					))}
				</div>

				<div className="mx-[-15px] md-large:mx-0">
					<div className="hide-scrollbars mt-20 flex gap-6 overflow-x-scroll px-[15px] md-large:mt-36 md-large:block md-large:space-y-10 md-large:pl-0">
						{contacts?.map((contact, i) => (
							<div key={`contact${i}`} className="flex items-center gap-4 lg:gap-8">
								<div className={`h-[88px] w-[88px] flex-none md-large:h-32 md-large:w-32 ${getBgColorClasses(theme_color)}`}>
									<WpImage image={contact?.image} className="h-full w-full object-cover" />
								</div>

								<div className="whitespace-nowrap md-large:whitespace-normal">
									<div className="t-24 font-black uppercase">{contact?.name}</div>
									<div className="t-22 mt-2 font-medium opacity-50">{contact?.job_title}</div>
									<a href={`mailto:${contact?.email}`} className={`t-22 mt-1 block font-medium ${getTextAlwaysDarkClasses(theme_color)}`}>
										{contact?.email}
									</a>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div
				className={clsx(
					`relative max-w-[853px] flex-1 px-[15px] py-16 md:px-5 md:py-32 md-large:py-[160px]`,
					getBgColorClasses(theme_color),
					form_layout === "press" && "flex items-center"
				)}
			>
				<div className={`absolute bottom-0 right-[-100%] top-0 hidden w-full md:block ${getBgColorClasses(theme_color)}`} />
				<motion.div layout className="mx-auto w-full max-w-[640px]">
					<div>
						<h2 className="t-48 font-heading uppercase">{form?.heading}</h2>
						<p className="t-20 mt-3 font-medium md:mt-6">{form?.content}</p>
					</div>

					<div className={` ${form_layout === "press" ? "mt-5 md:mt-8" : "mt-8 md:mt-16"}`}>
						{isSubmitted ? (
							<div>
								<h3 className="t-36 font-heading uppercase">Thank You</h3>
								<p className="t-20 mt-3 font-medium md:mt-6">We will be in touch shortly!</p>
							</div>
						) : (
							renderForm(form_layout)
						)}

						{form_layout !== "press" && (
							<motion.div
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: 1,
								}}
								transition={{
									delay: 0.2,
								}}
								className="t-18-small mt-5 !leading-[1.35] md:mt-10"
							>
								<span className="opacity-50">This site is protected by reCAPTCHA and the Google </span>
								<Link target="_blank" className={getTextContrastColorClasses(theme_color)} href="https://policies.google.com/privacy">
									Privacy Policy
								</Link>{" "}
								<span className="opacity-50">and </span>
								<Link target="_blank" className={getTextContrastColorClasses(theme_color)} href="https://policies.google.com/terms">
									Terms of Service{" "}
								</Link>{" "}
								<span className="opacity-50">apply.</span>
							</motion.div>
						)}

						{add_faqs && faqs && <FAQs faqs={faqs} theme_color={theme_color} />}
					</div>
				</motion.div>
			</div>
		</div>
	);
};
export default ContactForm;

const FormLink = ({ className, link, hover_color, first }) => {
	const [isHovered, setIsHovered] = useState(false);
	const path = useRouter().asPath;

	const contactPaths = ["/contact", "/contact/"];
	return (
		<Link
			className={`${className} ${getTextColorClasses(path.includes(link?.url) || (contactPaths.includes(path) && first) ? hover_color : "")}`}
			href={link?.url || "/#"}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<FontSwitcher hover isHovered={isHovered || path.includes(link?.url)} text={link?.title} />
		</Link>
	);
};

const FAQs = ({ faqs, theme_color }) => {
	const [activeFaq, setActiveFaq] = useState(0);
	const breakpointCrossed = useBreakpointCrossed(768);

	return (
		<div className="mt-10 lg:mt-[72px]">
			<h3 className="t-44 font-black uppercase">FAQs</h3>

			<motion.div layout className="mt-5 flex flex-col gap-6 md:gap-[36px] lg:mt-[72px]">
				{faqs?.map((faq, i) => (
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

const Faq = ({ faq, i, activeFaq, setActiveFaq, theme_color, breakpointCrossed }) => {
	return (
		<motion.button type="button" aria-label="FAQ" onClick={() => setActiveFaq(activeFaq === i ? null : i)} layout className="group block w-full  text-start">
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
									opacity: {
										delay: 0.2,
										duration: 0.3,
									},
								},
							},
							closed: {
								height: 0,
								opacity: 0,
								marginTop: 0,
								overflow: "hidden",
								transition: {
									duration: 0.3,
									ease: "easeInOut",
								},
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
};
