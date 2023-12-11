const Crown = () => {
	return (
		<svg className="text-current" width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M13.0995 53.7086C13.0496 53.4236 13.0787 50.6974 13.0995 47.65L7.67188 25.2692L22.2702 33.699L32.0022 16.8398L41.7345 33.699L56.3328 25.2692L50.9053 47.65C50.926 50.6974 50.9551 53.4236 50.9053 53.7086H13.0995Z"
				fill="currentColor"
			/>
			<rect x="30" y="6.53125" width="4" height="6" fill="currentColor" />
			<rect x="12.8516" y="16.3281" width="4" height="6" transform="rotate(-30 12.8516 16.3281)" fill="currentColor" />
			<rect width="4" height="6" transform="matrix(-0.866025 -0.5 -0.5 0.866025 50.7812 16.3281)" fill="currentColor" />
		</svg>
	);
};

const Diversify = () => {
	return (
		<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M39.6329 29.5555L17.7662 29.5555L17.7662 36.6367L5.33594 21.6144L17.7662 6.59107L17.7662 13.6723L33.6329 13.6723L39.6329 29.5555Z"
				fill="currentColor"
			/>
			<path
				d="M30.3632 50.3251L46.2299 50.3251L46.2299 57.4063L58.6602 42.3839L46.2299 27.3606L46.2299 34.4418L24.3632 34.4418L30.3632 50.3251Z"
				fill="currentColor"
			/>
		</svg>
	);
};

const Money = () => {
	return (
		<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M59.3183 10.5625L4.67969 10.5625L4.67969 43.1172H59.3183V10.5625ZM31.9989 41.1673C39.1048 41.1673 44.8652 34.7525 44.8652 26.8395C44.8652 18.9265 39.1048 12.5117 31.9989 12.5117C24.893 12.5117 19.1326 18.9265 19.1326 26.8395C19.1326 34.7525 24.893 41.1673 31.9989 41.1673Z"
				fill="currentColor"
			/>
			<path
				d="M27.393 33.9806V30.0066C28.7713 31.2011 30.4482 31.9362 31.8265 31.9362C32.8142 31.9362 33.4344 31.5456 33.4344 30.9254C33.4344 28.881 26.9336 27.6865 26.9336 23.0923C26.9336 21.0708 28.197 19.6236 30.2644 19.0953V16.4766H34.1925V19.1642C35.0654 19.4169 35.8923 19.8074 36.6274 20.3587V24.1719C35.3181 23.0693 33.779 22.3801 32.5386 22.3801C31.6427 22.3801 31.0454 22.7477 31.0454 23.3679C31.0454 25.3664 37.5463 26.4231 37.5463 31.0862C37.5463 33.1307 36.2829 34.6467 34.1925 35.1981V37.8397H30.2644V35.1981C29.2307 34.9454 28.2429 34.5319 27.393 33.9806Z"
				fill="currentColor"
			/>
			<rect x="8.03125" y="46.7383" width="47.8199" height="4.43841" fill="currentColor" />
		</svg>
	);
};

const IconMap = {
	crown: Crown,
	diversify: Diversify,
	money: Money,
};

const IconsRenderer = ({ icon }) => {
	const IconComponent = IconMap[icon];

	if (!IconComponent) {
		console.warn(`Icon "${icon}" not found in the icon map.`);
		return null;
	}

	return <IconComponent />;
};

export default IconsRenderer;
