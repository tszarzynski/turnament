import { useEffect, useRef, useState } from "react";
import type { Match } from "turnament-scheduler";
import InputNumber from "../InputNumber";

type PlayerScoreProps = {
	name: string;
	score: number;
	onChange: (newScore: number) => void;
	onIsEditingChange?: (isEditing: boolean) => void;
	variant: "primary" | "secondary";
	disabled?: boolean;
	completed?: boolean;
	minPointsToWin: number;
};

const PlayerScore = ({
	name,
	score,
	onChange,
	disabled,
	completed,
	variant,
	minPointsToWin,
}: PlayerScoreProps) => {
	const variantStyles =
		variant === "primary" ? "border-primary" : "border-secondary";
	const disabledStyles = "border-gray-300 text-gray-300";

	const styles = disabled || completed ? disabledStyles : variantStyles;

	return (
		<div className="flex flex-row items-stretch justify-between gap-0.5">
			<h5
				className={`flex flex-auto items-end border px-2 py-1 font-bold text-2xl text-handwritten leading-none ${styles}`}
			>
				{name}
			</h5>
			<InputNumber
				value={score}
				onChange={onChange}
				maxValue={minPointsToWin}
				completed={completed}
			/>
		</div>
	);
};

type MatchCardProps = {
	match: Match;
	names: [string, string];
	disabled?: boolean;
	onScoreChange?: (matchToUpdate: Match) => void;
	variant?: "primary" | "secondary";
	minPointsToWin: number;
};

const MatchCard = ({
	names,
	match,
	onScoreChange,
	disabled = false,
	variant = "secondary",
	minPointsToWin,
}: MatchCardProps) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const ref = useRef<HTMLDivElement>(null);

	const handleIsEditingChange = (isEditing: boolean): void => {
		setIsEditing(isEditing);
	};

	useEffect(() => {
		if (isEditing) {
			const timeoutId = setTimeout(() => {
				ref.current?.scrollIntoView({
					block: "center",
					behavior: "smooth",
				});
			}, 100);

			return () => {
				clearTimeout(timeoutId);
			};
		}

		return () => undefined;
	}, [isEditing]);

	const completed = match.result.some((it) => it === minPointsToWin);

	return (
		<div ref={ref} className="flex flex-col">
			<div className="focus-within:z-10">
				<PlayerScore
					name={names[0]}
					score={match.result[0]}
					disabled={disabled}
					variant={variant}
					onChange={(newScore: number) => {
						const matchToUpdate: Match = {
							...match,
							result: [newScore, match.result[1]],
						};
						onScoreChange?.(matchToUpdate);
					}}
					onIsEditingChange={handleIsEditingChange}
					minPointsToWin={minPointsToWin}
					completed={completed}
				/>
			</div>
			<div className="-mt-[1px] focus-within:z-10">
				<PlayerScore
					name={names[1]}
					score={match.result[1]}
					disabled={disabled}
					variant={variant}
					onChange={(newScore: number) => {
						const matchToUpdate: Match = {
							...match,
							result: [match.result[0], newScore],
						};
						onScoreChange?.(matchToUpdate);
					}}
					onIsEditingChange={handleIsEditingChange}
					minPointsToWin={minPointsToWin}
					completed={completed}
				/>
			</div>
		</div>
	);
};

export default MatchCard;
