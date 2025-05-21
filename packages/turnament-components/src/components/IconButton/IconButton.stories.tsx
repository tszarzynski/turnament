import IconRemove from "../IconRemove";
import IconButton from "./IconButton";

export default {
	component: IconButton,
	title: "IconButton",
};

export const Default = () => {
	return <IconButton iconSlot={<IconRemove />} />;
};

export const Secondary = () => {
	return <IconButton iconSlot={<IconRemove />} variant="secondary" />;
};

export const Disabled = () => {
	return <IconButton iconSlot={<IconRemove />} disabled={true} />;
};

export const Circle = () => {
	return <IconButton iconSlot={<IconRemove />} shape="circle" />;
};
