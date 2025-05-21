import type React from "react";

type Props = {
	variant?: "primary" | "secondary";
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	className?: string;
	onClick?: () => void;
	iconSlot?: React.ReactNode;
	title?: string;
	shape?: "square" | "circle";
};

const IconButton = ({
	variant = "primary",
	disabled = false,
	type = "button",
	className = "",
	onClick,
	iconSlot,
	title,
	shape = "square",
}: Props) => {
	// Base button styles
	const baseStyles =
		"border-1 hover:opacity-50 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2";

	// Variant-specific styles
	const variantStyles = {
		primary: "cursor-pointer border-primary text-primary focus:ring-red-400",
		secondary:
			"cursor-pointer border-secondary text-secondary  focus:ring-blue-400",
	};

	// Disabled styles override variant styles
	const disabledStyles =
		"border-gray-300 text-gray-300 cursor-not-allowed hover:opacity-100";

	const shapeStyles = shape === "circle" ? "rounded-full" : "";

	return (
		<button
			type={type}
			disabled={disabled}
			className={`
        ${baseStyles}
        ${disabled ? disabledStyles : variantStyles[variant]}
				${shapeStyles}
        ${className}
      `}
			onClick={disabled ? undefined : onClick}
			title={title}
		>
			{iconSlot && <i className="h-10 w-10">{iconSlot}</i>}
		</button>
	);
};

export default IconButton;
