import Hr from "./Hr";

export default {
	component: Hr,
	title: "Hr",
};

export const Default = () => {
	return <Hr />;
};

export const Dashed = () => {
	return <Hr variant="dashed" />;
};
