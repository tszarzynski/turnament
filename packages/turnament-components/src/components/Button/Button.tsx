import type React from "react";

type Props = {
	children: React.ReactNode;
	variant?: "primary" | "secondary";
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	className?: string;
	onClick?: () => void;
	fullWidth?: boolean;
	iconSlot?: React.ReactNode;
	title?: string;
};

const Button = ({
	children,
	variant = "primary",
	disabled = false,
	type = "button",
	className = "",
	onClick,
	fullWidth = false,
	iconSlot,
	title,
}: Props) => {
	// Base button styles
	const baseStyles =
		"font-medium text-md uppercase focus:outline-none focus:ring-2 focus:ring-offset-1 whitespace-nowrap";

	// Variant-specific styles
	const variantStyles = {
		primary:
			"cursor-pointer border-primary text-primary focus:ring-red-400 hover:bg-white",
		secondary:
			"cursor-pointer border-secondary text-secondary  focus:ring-blue-400 hover:bg-white",
	};

	// Disabled styles override variant styles
	const disabledStyles =
		"border-gray-300 text-gray-300 cursor-not-allowed hover:bg-transparent";

	// Full width style
	const widthStyle = fullWidth ? "w-full" : "";

	return (
		<button
			type={type}
			disabled={disabled}
			className={`
        ${baseStyles}
        ${disabled ? disabledStyles : variantStyles[variant]}
        ${widthStyle}
        ${className}
      `}
			onClick={disabled ? undefined : onClick}
			title={title}
		>
			<div className="flex w-full flex-row items-stretch justify-between border-1">
				<span className="flex flex-1 items-center px-4 py-2 ">{children}</span>
				{iconSlot && (
					<span className="border-l-1">
						<i className="flex h-10 w-10 items-center">{iconSlot}</i>
					</span>
				)}
			</div>
		</button>
	);
};

export default Button;
