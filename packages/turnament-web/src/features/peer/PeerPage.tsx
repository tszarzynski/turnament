import { useEffect, useRef } from "react";
import { Button, Header, IconPrev } from "turnament-components";
import { routes } from "../../app/router";
import { useBaseStore } from "../../app/store";
import PageLayout, { PageBody, PageContent } from "../../components/PageLayout";
import PageNavigation from "../../components/PageNavigation";

const SharePage = () => {
	const peerID = useBaseStore((state) => state.peerID);
	const peerError = useBaseStore((state) => state.peerError);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const targetUrl = peerID
		? `${location.origin}${routes.spectator({ peerID }).href}`
		: null;

	useEffect(() => {
		if (!targetUrl || !canvasRef.current) return;
		let active = true;
		import("qrcode").then((QRCode) => {
			if (active && canvasRef.current) {
				QRCode.toCanvas(canvasRef.current, targetUrl, { width: 200 });
			}
		});
		return () => {
			active = false;
		};
	}, [targetUrl]);

	return (
		<PageLayout>
			<PageContent>
				<header>
					<div className="px-4 py-6">
						<Header>See live results</Header>
					</div>
				</header>
				<PageBody>
					<p>
						Scan the QR code to access the tournament ranking page with live
						results.
					</p>
					<div className="flex min-h-[300px] flex-col items-center justify-center">
						{!peerID && !peerError && (
							<p className="text-center text-secondary">Initialising…</p>
						)}
						{peerError && (
							<p className="text-center text-red-500">{peerError}</p>
						)}
						<canvas ref={canvasRef} />
					</div>
				</PageBody>
			</PageContent>
			<PageNavigation>
				<Button onClick={() => routes.ranking().push()} iconSlot={<IconPrev />}>
					Back
				</Button>
			</PageNavigation>
		</PageLayout>
	);
};

export default SharePage;
