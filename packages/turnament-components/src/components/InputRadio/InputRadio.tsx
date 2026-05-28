type Props = React.InputHTMLAttributes<HTMLInputElement>;

const InputRadio = ({ className = "", ...rest }: Props) => {
	return (
		<input
			type="radio"
			{...rest}
			className={`h-[42px] w-[42px] cursor-pointer accent-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 ${className}`}
		/>
	);
};

export default InputRadio;
