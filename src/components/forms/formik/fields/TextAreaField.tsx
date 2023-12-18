const TextAreaField = ({ field, error, onFocus, onBlur, className, placeHolder, ...props }) => (
	<>
		<textarea
			rows={1}
			className={`${className} focus:ring-0`}
			onFocus={onFocus}
			onBlurCapture={onBlur}
			placeholder={placeHolder}
			{...field}
			style={{ width: "100%" }}
		/>
		{error && <div className={`error absolute ${props?.errorClass}`}>{error}</div>}
	</>
);

export default TextAreaField;
