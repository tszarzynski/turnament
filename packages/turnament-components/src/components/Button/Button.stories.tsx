import React from "react";
import Button from "./Button";
import IconNext from "../IconNext";

export default {
	component: Button,
	title: "Button",
};

export const Default = () => {
	return <Button variant="primary">Click me</Button>;
};

export const Secondary = () => {
	return <Button variant="secondary">Click me</Button>;
};

export const Disabled = () => {
	return <Button disabled={true}>Click me</Button>;
};

export const WithIcon = () => {
	return (
		<Button fullWidth={true} iconSlot={<IconNext />}>
			Click me
		</Button>
	);
};

export const SecondaryWithIcon = () => {
	return (
		<Button variant="secondary" fullWidth={true} iconSlot={<IconNext />}>
			Click me
		</Button>
	);
};
