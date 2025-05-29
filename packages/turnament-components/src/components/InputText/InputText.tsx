import type { Ref } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
	ref?: Ref<HTMLInputElement>;
	completed?: boolean;
};

const InputText = ({
	ref,
	value,
	onChange,
	className,
	disabled,
	completed,
	...rest
}: Props) => {
	const variantStyles = "border-black bg-white ";
	const disabledStyles =
		"border-gray-300 text-gray-300 cursor-not-allowed hover:bg-transparent";
	const styles = disabled || completed ? disabledStyles : variantStyles;

	return (
		<input
			{...rest}
			disabled={disabled}
			className={`focus:none border-1 border-black font-bold text-lg placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 ${styles} ${className}`}
			type="text"
			value={value}
			onChange={onChange}
			autoComplete="off"
			autoCorrect="off"
			ref={ref}
		/>
	);
};

export default InputText;
