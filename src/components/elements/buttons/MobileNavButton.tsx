const MobileNavButton = ({ mobileMenuOpen, setMobileMenuOpen, scrolledBg }) => {
	return (
		<button
			type="button"
			aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
			onClick={() => setMobileMenuOpen((prev) => !prev)}
			className={`h-full p-[15px] transition-colors duration-300 md-large:hidden ${scrolledBg || mobileMenuOpen ? "bg-black" : "bg-transparent"}`}
		>
			<svg overflow="visible" width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect
					className={`!origin-[12px_2.38px]
					${mobileMenuOpen ? "translate-y-[7.25px] rotate-45" : "	translate-y-0 rotate-0"}
					transition-transform
					duration-200
				`}
					y="0.570007"
					width="24"
					height="2.62"
					fill="currentColor"
				/>
				<rect
					className={`!origin-center transition-transform duration-200 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
					y="7.69"
					width="24"
					height="2.62"
					fill="currentColor"
				/>
				<rect
					className={`!origin-[12px_16.62px] transition-transform	duration-200
					${mobileMenuOpen ? "translate-y-[-7.25px] rotate-[-45deg]" : "translate-y-0 rotate-0"}
				`}
					y="14.81"
					width="24"
					height="2.62"
					fill="currentColor"
				/>
			</svg>
		</button>
	);
};
export default MobileNavButton;
