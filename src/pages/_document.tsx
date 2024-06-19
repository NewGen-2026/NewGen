import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="shortcut icon" href="/favicon.svg" />
				<link rel="preload" href="/fonts/PSTElliotsTrial-Black.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
				<link rel="preload" href="/fonts/Gridular-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
				<link rel="preload" href="/fonts/HALTwins-Semi-Light-01.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
			</Head>
			<body>
				<noscript
					dangerouslySetInnerHTML={{
						__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-596WKDM5" height="0" width="0" style="display: none; visibility: hidden;" />`,
					}}
				/>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
