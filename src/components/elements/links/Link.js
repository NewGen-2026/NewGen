import React from "react";
import NextLink from "next/link";
import { Button, TextLink } from "~/components/elements/buttons/Button";

export function Link(props) {
	const { link, type, href, to, target, children, className, ...other } = props;
	// get url from either href prop or link.url
	const url = link?.url || href || to || "#";

	let isExternal = false;
	let urlPath = url.trim().replace(/^[a-zA-Z]{3,5}:\/{2}[a-zA-Z0-9_.:-]+\//, "");
	if (urlPath.slice(0, 1) !== "/" && urlPath.slice(0, 1) !== "#") {
		urlPath = `/${urlPath}`;
	}

	// Revert back to original url if using external link or mailto: as href
	if (
		!url.includes(process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL) &&
		(url.slice(0, 4) === "http" || url.slice(0, 7) === "mailto:" || url.slice(0, 4) === "tel:")
	) {
		isExternal = true;
		urlPath = url;
	}

	const defaultLinkClasses = `inline-block ${className || ""} ${url.length === 0 || url === "#" ? "pointer-events-none cursor-default" : ""}`;

	return isExternal ? (
		<a href={urlPath} target={link?.target || target || ""} className={defaultLinkClasses} {...other}>
			<LinkTypeRenderer {...props} />
		</a>
	) : (
		<NextLink href={urlPath} target={link?.target || target || ""} className={defaultLinkClasses} {...other}>
			<LinkTypeRenderer {...props} />
		</NextLink>
	);
}

export default Link;

export function LinkTypeRenderer(props) {
	const { type, link, children } = props;
	return (
		<>
			{!type && !children && link?.title?.length > 0 && <span dangerouslySetInnerHTML={{ __html: link?.title }} />}
			{type === "button" && <Button {...props} />}
			{type === "text" && <TextLink {...props} />}
			{children}
		</>
	);
}
