import type React from "react";

type Props = {
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	iconSlot: React.ReactNode;
	shape?: "square" | "circle";
	name?: string;
	disabled?: boolean;
	className?: string;
	title?: string;
};

const ToggleButton = ({
	iconSlot,
	checked,
	onChange,
	disabled,
	className,
	name,
	title,
	shape = "square",
}: Props) => {
	const checkedStyles = checked ? "text-primary" : "text-secondary";

	const disabledStyles =
		"border-gray-300 text-gray-300 cursor-not-allowed hover:bg-transparent";

	const shapeStyles = shape === "circle" ? "rounded-full" : "";

	return (
		<label
			className={`inline-flex items-center cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 ${checkedStyles} ${className}`}
		>
			<input
				type="checkbox"
				className="sr-only peer"
				checked={checked}
				onChange={disabled ? undefined : onChange}
				disabled={disabled}
				name={name}
			/>
			<div
				className={`border hover:opacity-50 transition-opacity ${shapeStyles}   ${disabled ? disabledStyles : checkedStyles}`}
				title={title}
			>
				{iconSlot}
			</div>
		</label>
	);
};

export default ToggleButton;
