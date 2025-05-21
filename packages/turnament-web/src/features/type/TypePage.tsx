import { Button, IconNext } from "turnament-components";
import type { SchedulerType } from "turnament-scheduler";
import { routes } from "../../app/router";
import { useBaseStore } from "../../app/store";
import PageHeader from "../../components/PageHeader";
import { schedulerOptions } from "../../utils/schedulerUtils";

const TypePage = () => {
	const nextRound = useBaseStore((state) => state.nextRound);
	const schedulerType = useBaseStore((state) => state.schedulerType);
	const setSchedulerType = useBaseStore((state) => state.setSchedulerType);

	const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSchedulerType(event.target.value as SchedulerType);
	};

	const handleNext = () => {
		nextRound();
		routes.tournamentRounds().push();
	};

	return (
		<div className="w-full p-1">
			<PageHeader>Choose Turnament Type</PageHeader>
			<div className="my-4">
				<fieldset>
					<legend className="sr-only">Tournament Type</legend>
					<div className="border-2 border-secondary p-0.5">
						<hr className="border-secondary mb-0.5" />
						{schedulerOptions.map((option) => (
							<div
								key={option.value}
								className="flex flex-row justify-between w-full items-stretch border border-secondary mb-0.5"
							>
								<label
									htmlFor={option.value}
									className="flex items-center flex-1 px-4 py-2 font-medium text-lg text-secondary uppercase border-secondary border-r"
								>
									{option.name}
								</label>
								<input
									id={option.value}
									name="tournament-type"
									type="radio"
									value={option.value}
									checked={schedulerType === option.value}
									onChange={handleOptionChange}
									className="accent-black h-10 w-10 bg-primary focus:ring-black focus:outline-none focus:ring-2 focus:ring-offset-2"
								/>
							</div>
						))}
					</div>
				</fieldset>
			</div>

			<div className="my-4">
				<Button
					type="button"
					fullWidth={true}
					iconSlot={<IconNext />}
					onClick={handleNext}
				>
					Start
				</Button>
			</div>
		</div>
	);
};

export default TypePage;
