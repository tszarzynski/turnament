import Hr from "../Hr";

type Props = {
	children: React.ReactNode;
	turnamentType?: string;
	playersNum?: number;
	minRounds?: number;
};

function valueOrPlaceholder(value?: string | number) {
	return value || "/";
}

const Header = ({ children, turnamentType, playersNum, minRounds }: Props) => {
	return (
		<div className="static border-secondary border-t-2 p-0.5">
			<div className="py-6 text-center font-bold text-4xl text-secondary uppercase leading-none">
				{children}
			</div>
			<Hr />
			<table className="w-full ">
				<thead>
					<tr>
						<th
							className={
								"border border-secondary px-4 py-2 font-bold text-secondary text-xs uppercase "
							}
						>
							Type
						</th>
						<th
							className={
								"border border-secondary px-4 py-2 font-bold text-secondary text-xs uppercase"
							}
						>
							#Players
						</th>
						<th
							className={
								"border border-secondary px-4 py-2 font-bold text-secondary text-xs uppercase"
							}
						>
							#Min Rounds
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border border-secondary text-center">
							{valueOrPlaceholder(turnamentType)}
						</td>
						<td className="border border-secondary text-center">
							{valueOrPlaceholder(playersNum)}
						</td>

						<td className="border border-secondary text-center">
							{valueOrPlaceholder(minRounds)}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Header;
