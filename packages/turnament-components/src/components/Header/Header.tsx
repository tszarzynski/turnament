type Props = {
	children: React.ReactNode;
	turnamentType: string;
	playersNum: number;
	minRounds: number;
};

const Header = ({ children, turnamentType, playersNum, minRounds }: Props) => {
	return (
		<header className="static p-0.5 border-t-2 border-secondary ">
			<div className="text-secondary uppercase text-center text-2xl">
				{children}
			</div>
			<hr className="border-secondary mb-0.5" />
			<table className="w-full ">
				<thead>
					<tr>
						<th
							className={
								"text-secondary text-xs py-2 px-4 font-bold uppercase border border-secondary "
							}
						>
							Type
						</th>
						<th
							className={
								"text-secondary text-xs py-2 px-4 font-bold uppercase border border-secondary"
							}
						>
							#Players
						</th>
						<th
							className={
								"text-secondary text-xs py-2 px-4 font-bold uppercase border border-secondary"
							}
						>
							Min Rounds
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border border-secondary text-center">
							{turnamentType}
						</td>
						<td className="border border-secondary text-center">
							{playersNum}
						</td>

						<td className="border border-secondary text-center">{minRounds}</td>
					</tr>
				</tbody>
			</table>
		</header>
	);
};

export default Header;
