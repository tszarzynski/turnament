type Props = {
	children: React.ReactNode;
};

export default function PageLayout({ children }: Props) {
	return (
		<div className="bg-vintage-paper">
			<div className="m-auto grid h-dvh max-w-xl grid-rows-[1fr_auto]">
				{children}
			</div>
		</div>
	);
}

export function PageContent({ children }: Props) {
	return <div className="overflow-y-auto scroll-smooth">{children}</div>;
}

export function PageBody({ children }: Props) {
	return <main className="p-4">{children}</main>;
}
