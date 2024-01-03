const MobileNavButton = ({ mobileMenuOpen, setMobileMenuOpen, scrolledBg }) => {
	return (
		<button
			type="button"
			aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
			onClick={() => setMobileMenuOpen((prev) => !prev)}
			className={`h-full p-[15px] transition-colors duration-300 md-large:hidden ${scrolledBg || mobileMenuOpen ? "bg-black" : "bg-transparent"}`}
		>
			<svg
				className={` transition-transform duration-300 ${mobileMenuOpen ? "translate-x-[2px]" : ""}`}
				width="19"
				height="19"
				viewBox="0 0 19 19"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g className="translate-y-[2px]">
					<rect
						className={`transform transition-transform duration-300 will-change-transform ${mobileMenuOpen ? "translate-y-[-4px] rotate-45" : ""}`}
						width="22.588"
						height="2.62044"
						fill="currentColor"
					/>
				</g>

				<g className="translate-y-[10px]">
					<rect
						className={`transform transition-transform duration-300 will-change-transform ${mobileMenuOpen ? "translate-y-[3px] rotate-[-45deg]" : ""}`}
						width="22.588"
						height="2.62044"
						fill="currentColor"
					/>
				</g>
			</svg>
		</button>
	);
};
export default MobileNavButton;
