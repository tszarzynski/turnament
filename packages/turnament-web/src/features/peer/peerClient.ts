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
					console.log(`My peer ID is: ${id}`);
					resolve(peer.id);
				});

				P2PBase.peer.on("error", (error) => {
					console.log(error);
				});
			});
		}

		return P2PBase.peer.id;
	}
}

export class P2PPublisher extends P2PBase {
	private static connections: DataConnection[] = [];

	static override async initializePeer(prevPeerID: string | null) {
		const peerID = P2PBase.initializePeer(prevPeerID);

		if (!P2PBase.peer) throw new Error("Not initialised!");

		P2PBase.peer.on("connection", (connection) => {
			console.log("Connected and ready to send to: ", connection.peer);

			P2PPublisher.connections.push(connection);
		});

		P2PBase.peer.on("disconnected", (connection) => {
			console.log("Disconnected:", connection);

			P2PPublisher.connections = P2PPublisher.connections.filter(
				(c) => c.connectionId === connection,
			);
		});

		return peerID;
	}

	static publish(data: unknown) {
		console.log("Publishing as ", P2PBase.peer?.id);
		for (const connection of P2PPublisher.connections) {
			connection.send(data, false);
		}
	}
}
export class P2PSubscriber extends P2PBase {
	private static connection: DataConnection | null = null;
	private static dataListeners: Array<(data: unknown) => void> = [];

	static subscribe(destPeerID: string) {
		if (!P2PBase.peer) throw new Error("Not initialised!");

		P2PSubscriber.connection = P2PBase.peer.connect(destPeerID);

		P2PSubscriber.connection.on("data", (data) => {
			console.log("Received", data);
			// Notify all registered listeners
			for (const listener of P2PSubscriber.dataListeners) {
				listener(data);
			}
		});
	}

	static unsubscribe() {
		if (!P2PBase.peer) throw new Error("Not initialised!");

		P2PBase.peer.disconnect();
		P2PSubscriber.dataListeners = [];
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
