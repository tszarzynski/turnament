import { type FormEvent, useEffect, useRef, useState } from "react";
import { IconAdd, IconButton, InputText } from "turnament-components";

type Props = {
	addPlayer: (name: string) => void;
	draggable: boolean;
};

const PlayerAddForm = ({ addPlayer, draggable }: Props) => {
	const [name, setName] = useState("");
	const [disabled, setDisabled] = useState(true);

	const inputRef = useRef<HTMLInputElement>(null);
	const scrollIntoView = () => {
		setTimeout(() => {
			inputRef.current?.scrollIntoView({
				block: "end",
				behavior: "smooth",
			});
		}, 100);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!name) return;

		addPlayer(name);
		setName("");
		scrollIntoView();
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
				<InputText
					ref={inputRef}
					className="w-full px-4 py-3 uppercase"
					type="text"
					placeholder="Player name"
					value={name}
					onChange={handleChange}
					onFocus={() => {
						scrollIntoView();
					}}
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
