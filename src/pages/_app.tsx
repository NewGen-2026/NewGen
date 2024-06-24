import Script from "next/script";
import React from "react";
import "~/assets/styles/globals.scss";

export default function MyApp({ Component, pageProps }) {
	const globalScripts = pageProps?.options?.global_scripts || [];

	return (
		<>
			{globalScripts?.length &&
				globalScripts.map((script, index) => {
					const { attributes, content } = script;
					return (
						<Script key={`header-${index}`} id={attributes.id || `header-script-${index}`} {...attributes} dangerouslySetInnerHTML={{ __html: content }} />
					);
				})}
			<Script
				async
				strategy="lazyOnload"
				id="google-tag-manager"
				dangerouslySetInnerHTML={{
					__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
					new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
					j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
					'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
					})(window,document,'script','dataLayer','GTM-596WKDM5');`,
				}}
			/>
			<Component {...pageProps} />
		</>
	);
}
