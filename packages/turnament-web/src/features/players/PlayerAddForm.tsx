import { type FormEvent, useEffect, useState } from "react";
import { Button, IconAdd, IconButton } from "turnament-components";

type Props = {
	addPlayer: (name: string) => void;
	draggable: boolean;
};

const PlayerAddForm = ({ addPlayer, draggable }: Props) => {
	const [name, setName] = useState("");
	const [disabled, setDisabled] = useState(true);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!name) return;

		addPlayer(name);
		setName("");
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setName(inputValue);
	};

	useEffect(() => {
		setDisabled(() => name.length === 0);
	}, [name]);

	return (
		<form
			onSubmit={handleSubmit}
			className="table-row border-spacing-0.5 align-top"
		>
			{draggable && <div className="table-cell w-[54px]" />}
			<div className="table-cell w-[54px]" />

			<div className="table-cell align-middle">
				<input
					className="border-1 border-black w-full uppercase text-lg py-3 px-4 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
					type="text"
					placeholder="Player name"
					value={name}
					onChange={handleChange}
					onFocus={(e) =>
						setTimeout(() => {
							e.target.scrollIntoView({
								block: "end",
								behavior: "smooth",
							});
						}, 100)
					}
				/>
			</div>
			<div className="table-cell w-[54px]">
				<IconButton
					disabled={disabled}
					type="submit"
					variant="primary"
					iconSlot={<IconAdd />}
					title="Add player"
				/>
			</div>
		</form>
	);
};

export default PlayerAddForm;
