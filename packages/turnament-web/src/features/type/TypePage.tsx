import { useEffectOnce } from "react-use";
import {
	Button,
	Hr,
	IconInfo,
	IconNext,
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
import { DEFAULT_POINTS_TO_WIN } from "../round/roundsSlice";

const TypePage = () => {
	const nextRound = useBaseStore((state) => state.nextRound);
	const resetRounds = useBaseStore((state) => state.resetRounds);
	const schedulerType = useBaseStore((state) => state.schedulerType);
	const setSchedulerType = useBaseStore((state) => state.setSchedulerType);
	const minPointsToWin = useBaseStore((state) => state.minPointsToWin);
	const setMinPointsToWin = useBaseStore((state) => state.setMinPointsToWin);

	const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSchedulerType(event.target.value as SchedulerType);
	};

	const handlePointsToWinChange = (newValue: number) => {
		setMinPointsToWin(Number(newValue));
	};

	const handleNext = () => {
		nextRound();
		routes.rounds().push();
	};

	useEffectOnce(() => {
		resetRounds();
		setMinPointsToWin(DEFAULT_POINTS_TO_WIN);
	});

	return (
		<PageLayout>
			<PageContent>
				<PageHeader>Choose Tournament</PageHeader>
				<PageBody>
					<form className="border-2 border-secondary p-0.5">
						<Hr />
						<fieldset className="contents p-0.5">
							<legend className="flex w-[calc(100%-56px)] items-center border-2 border-secondary px-2 py-1 text-center font-bold text-secondary text-upright text-xs">
								Type
							</legend>
							{schedulerOptions.map((option) => (
								<div
									key={option.value}
									className="mt-0.5 flex w-full flex-row items-stretch justify-between "
								>
									<label
										htmlFor={option.value}
										className="flex flex-1 items-center justify-between border border-secondary px-4 py-3 font-medium text-lg text-secondary uppercase"
									>
										{option.name}{" "}
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
						<fieldset className="mt-8 flex gap-0.5">
							<label
								htmlFor="points-to-win"
								className="flex flex-1 items-center justify-between border border-secondary px-4 py-3 font-medium text-lg text-secondary uppercase"
							>
								Min Points To Win
								<Tooltip content="Minimum Points to Win defines the scoring threshold that a player must reach to secure victory in a match, establishing the target score that competitors aim to achieve.">
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
				<Button
					type="button"
					fullWidth={false}
					iconSlot={<IconNext />}
					onClick={handleNext}
				>
					Start
				</Button>
			</PageNavigation>
		</PageLayout>
	);
};

export default TypePage;
