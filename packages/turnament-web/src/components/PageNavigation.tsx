import React from "react";
import { Hr } from "turnament-components";

type Props = {
	children: React.ReactNode;
};

export default function PageNavigation({ children }: Props) {
	const justifyStyles =
		React.Children.count(children) > 1 ? "justify-between" : "justify-end";

	return (
		<footer className="bg-vintage-paper">
			<Hr variant="dashed" />
			<div className={`flex p-4 ${justifyStyles}`}>{children}</div>
		</footer>
	);
}
