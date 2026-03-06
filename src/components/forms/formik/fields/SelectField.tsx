const SelectField = ({ field, options, error, ...props }) => {
	console.log(options, "options");
	return (
		<div className="relative w-full">
			<select {...field} className={`${props?.className} w-full`}>
				{Array.isArray(options) &&
					options.map((option) => (
						<option key={option.value || "placeholder"} value={option.value || ""} disabled={option?.disabled} className={option?.className}>
							{option.label}
						</option>
					))}
			</select>
			{error && (
				<div className={` t-14 pointer-events-none absolute ${props?.errorClass || "bottom-[-30px] left-[-8px]  md:bottom-[-42px] "} z-10  `}>{error}</div>
			)}

			<svg
				className="select-dropdown absolute right-[2px] top-[50%] translate-y-[-50%]"
				width="18"
				height="11"
				viewBox="0 0 18 11"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M0.992188 1.42188L8.99219 8.42187L16.9922 1.42188" stroke="currentColor" strokeWidth="3" />
			</svg>
		</div>
	);
};

export default SelectField;
