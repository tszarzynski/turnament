type Props = {
	variant?: "secondary" | "dashed";
};

const Hr = ({ variant = "secondary" }: Props) => {
	const variantStyles =
		variant === "secondary" ? "border-secondary" : "bg-dashed";

	return <hr className={`mb-0.5 ${variantStyles}`} />;
};

export default Hr;
