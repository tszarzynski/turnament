import { useEffect, useRef } from "react";
import { Button, Header, IconPrev } from "turnament-components";
import { routes } from "../../app/router";
import { useBaseStore } from "../../app/store";
import PageLayout, { PageBody, PageContent } from "../../components/PageLayout";
import PageNavigation from "../../components/PageNavigation";

const QR_CODE_URL =
	"https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";

const SharePage = () => {
	const peerID = useBaseStore((state) => state.peerID);
	const peerError = useBaseStore((state) => state.peerError);
	const qrRef = useRef<HTMLDivElement>(null);
	const targetUrl = peerID
		? `${location.origin}${routes.spectator({ peerID }).href}`
		: null;

	useEffect(() => {
		if (!targetUrl) return;

		const script = document.createElement("script");
		script.src = QR_CODE_URL;
		script.async = true;
		script.onload = () => {
			// @ts-ignore
			if (window.QRCode && qrRef.current) {
				// @ts-ignore
				new window.QRCode(qrRef.current, {
					text: targetUrl,
					width: 200,
					height: 200,
				});
			}
		};
		document.body.appendChild(script);
		return () => {
			document.body.removeChild(script);
			if (qrRef.current) qrRef.current.innerHTML = "";
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
						{!peerID && !peerError && <p className="text-center text-secondary">Initialising…</p>}
						{peerError && <p className="text-center text-red-500">{peerError}</p>}
						<div ref={qrRef} />
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
