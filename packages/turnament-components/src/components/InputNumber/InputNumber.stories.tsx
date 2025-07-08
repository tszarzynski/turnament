import InputNumber from "./InputNumber";

export default {
	component: InputNumber,
	title: "InputNumber",
};

export const Default = () => {
	return <InputNumber value={0} onChange={() => undefined} />;
};

export const Disabled = () => {
	return <InputNumber value={0} onChange={() => undefined} disabled={true} />;
};

export const Completed = () => {
	return <InputNumber value={0} onChange={() => undefined} completed={true} />;
};
