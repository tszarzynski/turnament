import type { ReactNode } from "react";
import { useBaseStore } from "../app/store";
import { selectMinRoundNeeded } from "../features/round/roundsSlice";
import { Header } from "turnament-components";
import { getSchedulerNameByType } from "../utils/schedulerUtils";

interface Props {
	children: ReactNode;
	buttonSlot?: ReactNode;
}

export default function PageHeader({ children, buttonSlot }: Props) {
	const playersNum = useBaseStore((state) => state.players.length);
	const schedulerType = useBaseStore((state) => state.schedulerType);
	const minRounds = useBaseStore((state) => selectMinRoundNeeded(state));

	return (
		<>
			<Header
				minRounds={minRounds}
				playersNum={playersNum}
				turnamentType={
					schedulerType ? getSchedulerNameByType(schedulerType) : ""
				}
			>
				{children}
			</Header>
			<div className="flex flex-row justify-between mb-4">
				<div className="flex py-2">{buttonSlot}</div>
			</div>
		</>
	);
}
