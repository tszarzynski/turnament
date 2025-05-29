import { useRef, useState, type Ref } from "react";
import IconAdd from "../IconAdd";
import IconButton from "../IconButton";
import IconRemove from "../IconRemove";
import InputText from "../InputText";
import { useClickAway } from "react-use";

type Props = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"value" | "onChange"
> & {
	ref?: Ref<HTMLInputElement>;
	value: number;
	onChange: (newValue: number) => void;
	minValue?: number;
	maxValue?: number;
	completed?: boolean;
};

const InputNumber = ({
	ref,
	value,
	onChange,
	disabled,
	completed,
	minValue = 0,
	maxValue = Number.MAX_SAFE_INTEGER,
}: Props) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const clickAwayRef = useRef(null);

	useClickAway(clickAwayRef, () => {
		isEditing && setIsEditing(false);
	});

	return (
		<div ref={clickAwayRef} className="flex flex-row ">
			{isEditing && (
				<span className="h-[54px] w-[54px]">
					<IconButton
						onClick={() => onChange(value > minValue ? value - 1 : value)}
						iconSlot={<IconRemove />}
						shape="circle"
					/>
				</span>
			)}
			<InputText
				className="h-[54px] w-[54px] text-center"
				type="text"
				name="score"
				value={value}
				readOnly={true}
				disabled={disabled}
				completed={completed}
				autoComplete="off"
				onFocus={() => {
					setIsEditing(!disabled && true);
				}}
				onChange={(e) => onChange(Number.parseInt(e.target.value))}
				ref={ref}
			/>
			{isEditing && (
				<span className="ml-0.5 h-[54px] w-[54px]">
					<IconButton
						onClick={() => onChange(value < maxValue ? value + 1 : value)}
						iconSlot={<IconAdd />}
						shape="circle"
					/>
				</span>
			)}
		</div>
	);
};

export default InputNumber;
