import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import type { Match } from "turnament-scheduler";
import IconButton from "../IconButton";
import IconRemove from "../IconRemove";
import IconAdd from "../IconAdd";

type PlayerScoreProps = {
	name: string;
	score: number;
	onChange?: (newScore: number) => void;
	onIsEditingChange?: (isEditing: boolean) => void;
	disabled?: boolean;
	highlight?: boolean;
};

const PlayerScore: React.FC<PlayerScoreProps> = ({
	name,
	score,
	onChange,
	disabled,
}) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const ref = useRef(null);
	useClickAway(ref, () => {
		isEditing && setIsEditing(false);
	});

	return (
		<div className="flex flex-row justify-between items-stretch">
			<h5 className="relative font-bold flex flex-auto items-center pl-3 border border-solid border-secondary text-xl">
				{name}
			</h5>
			<div
				ref={ref}
				className="flex flex-row border border-secondary filter-[url(#vintageGrain)]"
			>
				{isEditing && (
					<span className="w-[54px] h-[54px] border-r-1">
						<IconButton
							onClick={() => onChange?.(score - 1)}
							iconSlot={<IconRemove />}
						/>
					</span>
				)}
				<form
					autoComplete="off"
					onSubmit={(e) => {
						e.preventDefault();
						isEditing && setIsEditing(false);
					}}
				>
					<input
						className="w-[54px] h-[54px] text-center text-xl font-bold focus:none"
						type="text"
						name="score"
						value={score}
						readOnly={true}
						disabled={disabled}
						onFocus={() => {
							setIsEditing(!disabled && true);
						}}
						onChange={(e) => onChange?.(Number.parseInt(e.target.value))}
						autoComplete="off"
						autoCorrect="off"
					/>
				</form>
				{isEditing && (
					<span className="w-[54px] h-[54px] border-l-1">
						<IconButton
							onClick={() => onChange?.(score + 1)}
							iconSlot={<IconAdd />}
						/>
					</span>
				)}
			</div>
		</div>
	);
};

type MatchCardProps = {
	match: Match;
	names: [string, string];
	disabled?: boolean;
	onScoreChange?: (matchToUpdate: Match) => void;
};

const MatchCard: React.FC<MatchCardProps> = ({
	names,
	match,
	onScoreChange,
	disabled = false,
}) => {
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

	return (
		<div ref={ref} className="flex flex-col">
			<PlayerScore
				name={names[0]}
				score={match.result[0]}
				disabled={disabled}
				onChange={(newScore: number) => {
					const matchToUpdate: Match = {
						...match,
						result: [newScore, match.result[1]],
					};
					onScoreChange?.(matchToUpdate);
				}}
				onIsEditingChange={handleIsEditingChange}
				highlight={match.result[0] > match.result[1]}
			/>

			<PlayerScore
				name={names[1]}
				score={match.result[1]}
				disabled={disabled}
				onChange={(newScore: number) => {
					const matchToUpdate: Match = {
						...match,
						result: [match.result[0], newScore],
					};
					onScoreChange?.(matchToUpdate);
				}}
				onIsEditingChange={handleIsEditingChange}
				highlight={match.result[1] > match.result[0]}
			/>
		</div>
	);
};

export default MatchCard;
