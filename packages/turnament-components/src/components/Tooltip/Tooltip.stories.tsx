import Tooltip from "./Tooltip";

export default {
	component: Tooltip,
	title: "Tooltip",
};

export const Default = () => (
	<Tooltip content="This is tooltip content">
		<span>Hover / click me</span>
	</Tooltip>
);

export const Bottom = () => (
	<Tooltip content="Appears below" position="bottom">
		<span>Click me</span>
	</Tooltip>
);
