import React from "react";
import Script from "next/script";
import "tailwindcss/tailwind.css";
import "~/assets/styles/globals.scss";

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			{/* Bugherd */}
			{/* <Script strategy="lazyOnload" src="https://www.bugherd.com/sidebarv2.js?apikey=" /> */}
			<Component {...pageProps} />
		</>
	);
}
