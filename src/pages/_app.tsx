import Script from "next/script";
import React from "react";
import "~/assets/styles/globals.scss";

export default function MyApp({ Component, pageProps }) {
	const {
		options: { global_scripts },
	} = pageProps;

	return (
		<>
			{global_scripts &&
				global_scripts.map((script, index) => {
					const { attributes, content } = script;
					return (
						<Script key={`header-${index}`} id={attributes.id || `header-script-${index}`} {...attributes} dangerouslySetInnerHTML={{ __html: content }} />
					);
				})}

			<Script src="https://example.com/script.js" />
			<Component {...pageProps} />
		</>
	);
}
