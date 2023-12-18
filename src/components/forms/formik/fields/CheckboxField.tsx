const CheckboxField = ({ field, error, label, onFocus, onBlur, ...props }) => {
	return (
		<>
			<div className="relative block">
				<input
					{...field}
					type="checkbox"
					onFocus={onFocus}
					onBlurCapture={onBlur}
					className={`${error ? "border-purple" : ""} h-4 w-4 !rounded-[3px] bg-white focus:ring-0  ${props?.className} `}
				/>
			</div>
			{error && (
				<div className={`t-14 pointer-events-none absolute w-full ${props?.errorClass || "bottom-[-30px] left-[-8px] md:bottom-[-42px] "} z-10`}>{error}</div>
			)}
		</>
	);
};

export default CheckboxField;
