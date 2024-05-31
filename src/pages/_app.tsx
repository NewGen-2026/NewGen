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
			<Component {...pageProps} />
		</>
	);
}
