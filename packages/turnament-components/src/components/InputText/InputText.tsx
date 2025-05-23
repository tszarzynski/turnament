type Props = React.InputHTMLAttributes<HTMLInputElement>;

const InputText = ({
	value,
	onChange,
	className,
	disabled,
	...rest
}: Props) => {
	const variantStyles = "border-black";
	const disabledStyles =
		"border-gray-300 text-gray-300 cursor-not-allowed hover:bg-transparent";

	return (
		<input
			{...rest}
			disabled={disabled}
			className={`focus:none border-1 border-black font-bold text-lg placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 ${disabled ? disabledStyles : variantStyles} ${className}`}
			type="text"
			value={value}
			onChange={onChange}
			autoComplete="off"
			autoCorrect="off"
		/>
	);
};

export default InputText;
