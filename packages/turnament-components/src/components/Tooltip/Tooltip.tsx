import { useRef, useState } from "react";
import { useClickAway } from "react-use";

type Props = {
	children: React.ReactNode;
	content: React.ReactNode;
	position?: "top" | "right" | "bottom" | "left";
};

const Tooltip = ({ children, content, position = "top" }: Props) => {
	const [isVisible, setIsVisible] = useState(false);

	const clickAwayRef = useRef(null);

	useClickAway(clickAwayRef, (e) => {
		e.stopPropagation();
		isVisible && setIsVisible(false);
	});

	const toggleTooltip = () => {
		setIsVisible(!isVisible);
	};

	const positionClasses = {
		top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
		right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
		bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
		left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
	};

	return (
		<div className="relative inline-flex">
			<button
				type="button"
				onClick={toggleTooltip}
				className="m-0 cursor-pointer border-0 bg-transparent p-0"
				aria-expanded={isVisible}
			>
				{children}
			</button>
			{isVisible && (
				<div
					ref={clickAwayRef}
					className={`absolute z-10 min-w-[162px] border-1 border-dashed bg-paper px-4 py-3 text-black text-xs normal-case shadow ${positionClasses[position]}`}
				>
					{content}
				</div>
			)}
		</div>
	);
};

export default Tooltip;
