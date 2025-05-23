import type { ReactNode } from "react";
import { useBaseStore } from "../app/store";
import { selectMinRoundNeeded } from "../features/round/roundsSlice";
import { Header, Hr } from "turnament-components";
import { getSchedulerByType } from "../utils/schedulerUtils";

interface Props {
	children: ReactNode;
}

export default function PageHeader({ children }: Props) {
	const playersNum = useBaseStore((state) => state.players.length);
	const schedulerType = useBaseStore((state) => state.schedulerType);
	const minRounds = useBaseStore((state) => selectMinRoundNeeded(state));

	return (
		<header>
			<div className="p-4">
				<Header
					minRounds={minRounds}
					playersNum={playersNum}
					turnamentType={
						schedulerType ? getSchedulerByType(schedulerType).shortName : ""
					}
				>
					{children}
				</Header>
			</div>
			<Hr variant="dashed" />
		</header>
	);
}
