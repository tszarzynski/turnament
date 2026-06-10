import { useEffect, useRef, useState } from "react";
import type { Match } from "turnament-scheduler";
import InputNumber from "../InputNumber";
import InputRadio from "../InputRadio";

type SportType = "BACKGAMMON" | "CHESS";

type PlayerScoreProps = {
	name: string;
	score: number;
	onChange: (newScore: number) => void;
	onIsEditingChange?: (isEditing: boolean) => void;
	variant: "primary" | "secondary";
	disabled?: boolean;
	completed?: boolean;
	maxRawScore?: number;
	scoringDivisor?: number;
};

const PlayerScore = ({
	name,
	score,
	onChange,
	disabled,
	completed,
	variant,
	maxRawScore,
	scoringDivisor = 1,
}: PlayerScoreProps) => {
	const variantStyles =
		variant === "primary" ? "border-primary" : "border-secondary";
	const completedStyles = "border-gray-300";

	const styles = disabled || completed ? completedStyles : variantStyles;

	return (
		<div className="flex flex-row items-stretch justify-between gap-0.5">
			<h5
				className={`flex flex-auto select-none items-end border px-2 py-1 font-bold text-2xl text-handwritten leading-none ${styles}`}
			>
				{name}
			</h5>
			<InputNumber
				value={score}
				onChange={onChange}
				maxValue={maxRawScore}
				disabled={disabled}
				completed={completed}
				scoringDivisor={scoringDivisor}
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
	minPointsToWin?: number;
	sportType?: SportType;
	scoringDivisor?: number;
};

const MatchCard = ({
	names,
	match,
	onScoreChange,
	disabled = false,
	variant = "secondary",
	minPointsToWin,
	sportType,
	scoringDivisor = 1,
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

	const maxRawScore =
		minPointsToWin !== undefined ? minPointsToWin * scoringDivisor : undefined;

	const completed =
		sportType === "CHESS" && minPointsToWin !== undefined && minPointsToWin > 0
			? match.result[0] + match.result[1] === minPointsToWin * 2
			: match.result.some(
					(score) => minPointsToWin !== undefined && minPointsToWin > 0 && score >= minPointsToWin,
				);

	const isTied =
		completed && sportType === "CHESS" && match.result[0] === match.result[1];

	const isCompleted = completed && (!isTied || match.tiebreakWinner != null);

	// Total raw points across both players = minPointsToWin * 2 (each game contributes exactly 2 raw points: 2+0 win/loss or 1+1 draw)
	const totalRaw =
		minPointsToWin !== undefined ? minPointsToWin * 2 : undefined;

	const handlePlayer0Change = (newRaw: number) => {
		const result: [number, number] =
			sportType === "CHESS" && totalRaw !== undefined
				? [newRaw, totalRaw - newRaw]
				: [newRaw, match.result[1]];
		onScoreChange?.({ ...match, result, tiebreakWinner: null });
	};

	const handlePlayer1Change = (newRaw: number) => {
		const result: [number, number] =
			sportType === "CHESS" && totalRaw !== undefined
				? [totalRaw - newRaw, newRaw]
				: [match.result[0], newRaw];
		onScoreChange?.({ ...match, result, tiebreakWinner: null });
	};

	const activeVariant = isCompleted ? "primary" : "secondary";

	return (
		<div ref={ref} className="flex flex-row gap-0.5">
			{isTied && (
				<div className="flex flex-row gap-0.5">
					<div className="flex flex-col items-end gap-0.5">
						{([0, 1] as const).map((idx) => (
							<InputRadio
								key={idx}
								name={`tiebreak-${match.ID}`}
								checked={match.tiebreakWinner === idx}
								disabled={disabled || isCompleted}
								onChange={() =>
									onScoreChange?.({ ...match, tiebreakWinner: idx })
								}
								onClick={() =>
									match.tiebreakWinner === idx &&
									onScoreChange?.({ ...match, tiebreakWinner: null })
								}
								className="ml-3 my-[6px]"
							/>
						))}
					</div>
					<div className={`flex select-none items-center justify-center border px-1 ${disabled || isCompleted ? "border-gray-300" : "border-secondary text-secondary"}`}>
						<span className="font-bold text-tiny text-upright">
							tiebreak
						</span>
					</div>
				</div>
			)}
			<div className="flex flex-1 flex-col">
				<div className="focus-within:z-10">
					<PlayerScore
						name={names[0]}
						score={match.result[0]}
						disabled={disabled}
						variant={disabled ? variant : activeVariant}
						onChange={handlePlayer0Change}
						onIsEditingChange={handleIsEditingChange}
						maxRawScore={maxRawScore}
						scoringDivisor={scoringDivisor}
						completed={isCompleted}
					/>
				</div>
				<div className="-mt-[1px] focus-within:z-10">
					<PlayerScore
						name={names[1]}
						score={match.result[1]}
						disabled={disabled}
						variant={disabled ? variant : activeVariant}
						onChange={handlePlayer1Change}
						onIsEditingChange={handleIsEditingChange}
						maxRawScore={maxRawScore}
						scoringDivisor={scoringDivisor}
						completed={isCompleted}
					/>
				</div>
			</div>
		</div>
	);
};

export default MatchCard;
