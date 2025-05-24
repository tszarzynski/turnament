type Props = {
	children: React.ReactNode;
};

export default function PageLayout({ children }: Props) {
	return (
		<div className="m-auto grid h-dvh max-w-xl grid-rows-[1fr_auto]">
			{children}
		</div>
	);
}

export function PageContent({ children }: Props) {
	return (
		<div className="overflow-y-auto scroll-smooth">
			<div className="bg-vintage-paper h-full">{children}</div>
		</div>
	);
}

export function PageBody({ children }: Props) {
	return <main className="px-4 py-6">{children}</main>;
}
