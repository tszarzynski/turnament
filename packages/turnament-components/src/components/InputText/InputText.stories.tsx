import InputText from "./InputText";

export default {
	component: InputText,
	title: "InputText",
};

export const Default = () => {
	return <InputText value="Text" />;
};

export const Disabled = () => {
	return <InputText disabled={true} value="Text" />;
};
