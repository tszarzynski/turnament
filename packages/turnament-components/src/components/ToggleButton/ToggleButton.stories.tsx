import { useToggle } from "react-use";
import IconReorder from "../IconReorder";
import ToggleButton from "./ToggleButton";

export default {
	component: ToggleButton,
	title: "ToggleButton",
};

export const Default = () => {
	const [checked, toggle] = useToggle(false);
	return (
		<ToggleButton
			iconSlot={<IconReorder />}
			checked={checked}
			onChange={toggle}
		/>
	);
};

export const Checked = () => {
	const [checked, toggle] = useToggle(true);
	return (
		<ToggleButton
			iconSlot={<IconReorder />}
			checked={checked}
			onChange={toggle}
		/>
	);
};

export const Disabled = () => {
	const [checked, toggle] = useToggle(true);
	return (
		<ToggleButton
			iconSlot={<IconReorder />}
			checked={checked}
			onChange={toggle}
			disabled={true}
		/>
	);
};

export const Circle = () => {
	const [checked, toggle] = useToggle(false);
	return (
		<ToggleButton
			iconSlot={<IconReorder />}
			checked={checked}
			onChange={toggle}
			shape="circle"
		/>
	);
};
