import InputRadio from "./InputRadio";

export default {
	component: InputRadio,
	title: "InputRadio",
};

export const Default = () => <InputRadio name="demo" />;

export const Checked = () => <InputRadio name="demo" checked={true} readOnly />;

export const WithMargins = () => (
	<InputRadio name="demo" className="mx-1.5 my-[6px]" />
);

export const TypePageStyle = () => (
	<InputRadio name="demo" className="mr-3 ml-0.5 bg-primary" />
);

export const Disabled = () => (
	<InputRadio name="demo" disabled={true} />
);
