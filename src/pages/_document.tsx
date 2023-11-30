import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
	return (
		<Html>
			<Head>
				{/* <link rel="shortcut icon" href="/favicon.svg" /> */}
				<link rel="preload" href="/fonts/PSTElliotsTrial.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
				<link rel="preload" href="/fonts/Gridular-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
