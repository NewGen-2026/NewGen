const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	trailingSlash: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.wpengine.com",
			},
			{
				protocol: "https",
				hostname: "**.wpenginepowered.com",
			},
		],
		formats: ["image/avif", "image/webp"],
	},
	async rewrites() {
		return {
			beforeFiles: [
				{
					source: "/wp-content/:path*",
					destination: `${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-content/:path*`,
				},
			],
		};
	},
	async redirects() {
		return require("./redirects.json");
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
});
