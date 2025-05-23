type Props = {
	variant?: "default" | "dashed";
};

const Hr = ({ variant = "default" }: Props) => {
	const variantStyles = variant === "default" ? "border-inherit" : "bg-dashed";

	return <hr className={`mb-0.5 ${variantStyles}`} />;
};

export default Hr;
