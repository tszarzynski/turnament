import { useEffectOnce } from "react-use";
import {
	Button,
	Hr,
	IconInfo,
	IconNext,
	IconPrev,
	InputNumber,
	Tooltip,
} from "turnament-components";
import type { SchedulerType } from "turnament-scheduler";
import { routes } from "../../app/router";
import { useBaseStore } from "../../app/store";
import PageHeader from "../../components/PageHeader";
import PageLayout, { PageBody, PageContent } from "../../components/PageLayout";
import PageNavigation from "../../components/PageNavigation";
import { schedulerOptions } from "../../utils/schedulerUtils";
import { getDefaultMatchConfig, type SportType } from "turnament-ranking";

const sportOptions: { value: SportType; name: string; description: string }[] =
	[
		{
			value: "BACKGAMMON",
			name: "Backgammon",
			description: "Match play — first to reach the target points wins.",
		},
		{
			value: "CHESS",
			name: "Chess",
			description:
				"Fixed games — winner determined after all games are played.",
		},
	];

const TypePage = () => {
	const initializePeer = useBaseStore((state) => state.initializePeer);
	const nextRound = useBaseStore((state) => state.nextRound);
	const resetRounds = useBaseStore((state) => state.resetRounds);
	const schedulerType = useBaseStore((state) => state.schedulerType);
	const setSchedulerType = useBaseStore((state) => state.setSchedulerType);
	const sportType = useBaseStore((state) => state.sportType);
	const setSportType = useBaseStore((state) => state.setSportType);
	const minPointsToWin = useBaseStore((state) => state.minPointsToWin);
	const setMinPointsToWin = useBaseStore((state) => state.setMinPointsToWin);

	const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newSchedulerType = event.target.value as SchedulerType;
		setSchedulerType(newSchedulerType);
		if (sportType) {
			setMinPointsToWin(getDefaultMatchConfig(sportType, newSchedulerType));
		}
	};

	const handleSportChange = (sport: SportType) => {
		setSportType(sport);
		setMinPointsToWin(getDefaultMatchConfig(sport, schedulerType));
	};

	const handlePointsToWinChange = (newValue: number) => {
		setMinPointsToWin(Number(newValue));
	};

	const handleNext = () => {
		nextRound();
		initializePeer();
		routes.rounds().push();
	};

	useEffectOnce(() => {
		resetRounds();
		setSportType("BACKGAMMON");
		setMinPointsToWin(getDefaultMatchConfig("BACKGAMMON", undefined));
	});

	const matchConfigLabel =
		sportType === "CHESS" ? "Best of (Games)" : "Points to Win";
	const matchConfigTooltip =
		sportType === "CHESS"
			? "Total number of games per match. The winner is the player with more points after all games are played."
			: "Minimum Points to Win defines the scoring threshold that a player must reach to secure victory in a match, establishing the target score that competitors aim to achieve.";

	return (
		<PageLayout>
			<PageContent>
				<PageHeader>Choose Tournament</PageHeader>
				<PageBody>
					<form className="border-2 border-secondary p-0.5">
						<Hr />
						<fieldset className="p-0.5">
							<div>
								<legend className="inline-flex w-[calc(100%-56px)] select-none items-center border-2 border-secondary px-2 py-1 font-bold text-secondary text-tiny text-upright">
									Sport
								</legend>
							</div>
							{sportOptions.map((option) => (
								<div
									key={option.value}
									className="mt-0.5 flex w-full flex-row items-stretch justify-between"
								>
									<label
										htmlFor={option.value}
										className="flex flex-1 select-none items-center justify-between border border-secondary px-4 py-3 font-medium text-lg text-secondary uppercase"
									>
										{option.name}
										<Tooltip content={option.description}>
											<IconInfo />
										</Tooltip>
									</label>
									<input
										id={option.value}
										name="sport-type"
										type="radio"
										value={option.value}
										checked={sportType === option.value}
										onChange={() => handleSportChange(option.value)}
										className="mr-3 ml-0.5 h-[42px] w-[42px] bg-primary accent-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
									/>
								</div>
							))}
						</fieldset>
						<Hr />
						<fieldset className="p-0.5">
							<div>
								<legend className="inline-flex w-[calc(100%-56px)] select-none items-center border-2 border-secondary px-2 py-1 font-bold text-secondary text-tiny text-upright">
									Type
								</legend>
							</div>
							{schedulerOptions.map((option) => (
								<div
									key={option.value}
									className="mt-0.5 flex w-full flex-row items-stretch justify-between "
								>
									<label
										htmlFor={option.value}
										className="flex flex-1 select-none items-center justify-between border border-secondary px-4 py-3 font-medium text-lg text-secondary uppercase"
									>
										{option.name}
										<Tooltip content={option.description}>
											<IconInfo />
										</Tooltip>
									</label>
									<input
										id={option.value}
										name="tournament-type"
										type="radio"
										value={option.value}
										checked={schedulerType === option.value}
										onChange={handleOptionChange}
										className="mr-3 ml-0.5 h-[42px] w-[42px] bg-primary accent-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
									/>
								</div>
							))}
						</fieldset>
						<Hr />
						<fieldset className="mt-8 flex gap-0.5">
							<label
								htmlFor="points-to-win"
								className="flex flex-1 select-none items-center justify-between border border-secondary px-4 py-3 font-medium text-lg text-secondary uppercase"
							>
								{matchConfigLabel}
								<Tooltip content={matchConfigTooltip}>
									<IconInfo />
								</Tooltip>
							</label>
							<InputNumber
								id="points-to-win"
								className="w-[54px] text-center"
								value={minPointsToWin}
								onChange={handlePointsToWinChange}
								type="number"
								min="1"
								inputMode="numeric"
								pattern="[0-9]*"
							/>
						</fieldset>
					</form>
				</PageBody>
			</PageContent>
			<PageNavigation>
				<Button onClick={() => routes.players().push()} iconSlot={<IconPrev />}>
					Players
				</Button>
				<Button
					type="button"
					fullWidth={false}
					iconSlot={<IconNext />}
					disabled={!schedulerType || !sportType}
					onClick={handleNext}
				>
					Start
				</Button>
			</PageNavigation>
		</PageLayout>
	);
};

export default TypePage;
