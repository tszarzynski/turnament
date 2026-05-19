import { type DataConnection, Peer } from "peerjs";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class P2PBase {
	public static peer: Peer | null = null;

	static async initializePeer(prevPeerID: string | null) {
		if (!P2PBase.peer) {
			return new Promise<string>((resolve) => {
				const peer = prevPeerID ? new Peer(prevPeerID) : new Peer();
				P2PBase.peer = peer;
				P2PBase.peer.on("open", (id) => {
					resolve(peer.id);
				});

				P2PBase.peer.on("error", (error) => {
					console.error(error);
				});
			});
		}

		return P2PBase.peer.id;
	}
}

export class P2PPublisher extends P2PBase {
	private static connections: DataConnection[] = [];
	private static onConnectionCallback: (() => void) | null = null;
	private static initialized = false;

	static override async initializePeer(
		prevPeerID: string | null,
		onConnection?: () => void,
	) {
		P2PPublisher.onConnectionCallback = onConnection ?? null;

		const peerID = await P2PBase.initializePeer(prevPeerID);

		if (!P2PPublisher.initialized) {
			P2PPublisher.initialized = true;

			P2PBase.peer!.on("connection", (connection) => {
				P2PPublisher.connections.push(connection);
				P2PPublisher.onConnectionCallback?.();
			});

			P2PBase.peer!.on("disconnected", () => {
				P2PPublisher.connections = P2PPublisher.connections.filter(
					(c) => c.open,
				);
			});
		}

		return peerID;
	}

	static publish(data: unknown) {
		for (const connection of P2PPublisher.connections) {
			connection.send(data, false);
		}
	}
}

export class P2PSubscriber extends P2PBase {
	private static connection: DataConnection | null = null;
	private static dataListeners: Array<(data: unknown) => void> = [];

	static subscribe(destPeerID: string, onDisconnect?: () => void) {
		if (!P2PBase.peer) throw new Error("Not initialised!");

		P2PSubscriber.connection = P2PBase.peer.connect(destPeerID);

		P2PSubscriber.connection.on("data", (data) => {
			for (const listener of P2PSubscriber.dataListeners) {
				listener(data);
			}
		});

		P2PSubscriber.connection.on("close", () => onDisconnect?.());
		P2PSubscriber.connection.on("error", () => onDisconnect?.());
	}

	static unsubscribe() {
		P2PSubscriber.connection?.close();
		P2PSubscriber.connection = null;
		P2PSubscriber.dataListeners = [];
		P2PBase.peer?.destroy();
		P2PBase.peer = null;
	}

	static addDataListener(listener: (data: unknown) => void) {
		P2PSubscriber.dataListeners.push(listener);
		return () => P2PSubscriber.removeDataListener(listener);
	}

	static removeDataListener(listener: (data: unknown) => void) {
		const index = P2PSubscriber.dataListeners.indexOf(listener);
		if (index !== -1) {
			P2PSubscriber.dataListeners.splice(index, 1);
		}
	}
}
