type Props = {
	variant?: "default" | "dashed" | "inset";
};

const Hr = ({ variant = "default" }: Props) => {
	const variantStyles: Record<typeof variant, string> = {
		default: "border-inherit",
		inset: "bg-dashed",
		dashed: "border-inherit border-dashed",
	};

	return <hr className={`mb-0.5 ${variantStyles[variant]}`} />;
};

export default Hr;
