const InputField = ({ field, type, error, onFocus, onBlur, ...props }) => {
	return (
		<div className="relative h-full w-full">
			<input
				{...field}
				onFocus={onFocus}
				onBlurCapture={onBlur}
				type={type}
				placeholder={props?.placeHolder}
				className={`${error ? "border-b border-black/60" : "border-b border-black/60"} h-full w-full ring-0 focus:ring-0 ${props?.className} `}
			/>
			{error && (
				<div className={` t-14 pointer-events-none absolute ${props?.errorClass || "bottom-[-30px] left-[-8px]  md:bottom-[-42px] "} z-10  `}>{error}</div>
			)}
		</div>
	);
};

export default InputField;
