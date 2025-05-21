import type React from "react";

type Props = {
	children: React.ReactNode;
	intensity?: "light" | "medium" | "heavy";
	color?: "white" | "cream" | "yellow" | "brown";
};

export const VintagePaper = ({
	children,
	intensity = "medium",
	color = "cream",
}: Props) => {
	// Map intensity to opacity values
	const opacityMap = {
		light: "opacity-30",
		medium: "opacity-60",
		heavy: "opacity-90",
	};

	// Map color to actual color values
	const colorMap = {
		white: "bg-[#ffffff]",
		cream: "bg-[#f8f4e5]",
		yellow: "bg-[#f8f0d0]",
		brown: "bg-[#e8d9c0]",
	};

	return (
		<div
			className={`relative filter-[url(#vintageGrain) ${opacityMap[intensity]} ${colorMap[color]} before:(absolute w-full h-full) content-['']`}
		>
			{children}
		</div>
	);
};

export default VintagePaper;
