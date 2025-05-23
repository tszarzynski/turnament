import { Button, Hr, IconNext } from "turnament-components";
import type { SchedulerType } from "turnament-scheduler";
import { routes } from "../../app/router";
import { useBaseStore } from "../../app/store";
import PageHeader from "../../components/PageHeader";
import { schedulerOptions } from "../../utils/schedulerUtils";
import PageLayout, { PageContent, PageBody } from "../../components/PageLayout";
import PageNavigation from "../../components/PageNavigation";

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
		<PageLayout>
			<PageContent>
				<PageHeader>Choose Turnament Type</PageHeader>
				<PageBody>
					<fieldset>
						<legend className="sr-only">Tournament Type</legend>
						<div className="border-2 border-secondary p-0.5">
							<Hr />
							{schedulerOptions.map((option) => (
								<div
									key={option.value}
									className="mb-0.5 flex w-full flex-row items-stretch justify-between border border-secondary"
								>
									<label
										htmlFor={option.value}
										className="flex flex-1 items-center border-secondary border-r px-4 py-2 font-medium text-lg text-secondary uppercase"
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
										className="h-10 w-10 bg-primary accent-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
									/>
								</div>
							))}
						</div>
					</fieldset>
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
