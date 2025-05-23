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
				<PageHeader>Choose Type</PageHeader>
				<PageBody>
					<fieldset>
						<div className="border-2 border-secondary p-0.5">
							<Hr />
							<div className="p-0.5">
								<legend className="flex w-[calc(100%-56px)] items-center border border-secondary px-4 py-2 text-center font-bold text-secondary text-upright uppercase [letter-spacing:-4px]">
									Type
								</legend>
								{schedulerOptions.map((option) => (
									<div
										key={option.value}
										className="mt-0.5 flex w-full flex-row items-stretch justify-between "
									>
										<label
											htmlFor={option.value}
											className="flex flex-1 items-center border border-secondary px-4 py-3 font-medium text-lg text-secondary uppercase"
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
											className="h-[42px] w-[42px] mr-3 ml-0.5 bg-primary accent-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
										/>
									</div>
								))}
							</div>
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
