import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import type { Match } from "turnament-scheduler";
import IconButton from "../IconButton";
import IconRemove from "../IconRemove";
import IconAdd from "../IconAdd";
import InputText from "../InputText";

type PlayerScoreProps = {
	name: string;
	score: number;
	onChange?: (newScore: number) => void;
	onIsEditingChange?: (isEditing: boolean) => void;
	variant: "primary" | "secondary";
	disabled?: boolean;
	highlight?: boolean;
};

const PlayerScore = ({
	name,
	score,
	onChange,
	disabled,
	variant,
}: PlayerScoreProps) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const ref = useRef(null);
	useClickAway(ref, () => {
		isEditing && setIsEditing(false);
	});

	const variantStyles =
		variant === "primary" ? "border-primary" : "border-secondary";
	const disabledStyles = "border-gray-300 text-gray-300";

	return (
		<div className="flex flex-row items-stretch justify-between gap-0.5">
			<h5
				className={`flex flex-auto items-center border pl-3 font-bold text-lg ${disabled ? disabledStyles : variantStyles}`}
			>
				{name}
			</h5>
			<div ref={ref} className="flex flex-row ">
				{isEditing && (
					<span className="h-[54px] w-[54px]">
						<IconButton
							onClick={() => onChange?.(score > 0 ? score - 1 : score)}
							iconSlot={<IconRemove />}
							shape="circle"
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
					<InputText
						className="h-[54px] w-[54px] text-center"
						type="text"
						name="score"
						value={score}
						readOnly={true}
						disabled={disabled}
						onFocus={() => {
							setIsEditing(!disabled && true);
						}}
						onChange={(e) => onChange?.(Number.parseInt(e.target.value))}
					/>
				</form>
				{isEditing && (
					<span className="ml-0.5 h-[54px] w-[54px]">
						<IconButton
							onClick={() => onChange?.(score + 1)}
							iconSlot={<IconAdd />}
							shape="circle"
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
	variant?: "primary" | "secondary";
};

const MatchCard = ({
	names,
	match,
	onScoreChange,
	disabled = false,
	variant = "secondary",
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
					highlight={match.result[0] > match.result[1]}
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
					highlight={match.result[1] > match.result[0]}
				/>
			</div>
		</div>
	);
};

export default MatchCard;
