import Express from "express";
import SocketIo from "socket.io";
import Http from "http";
import { Payload } from "../payload";

export class ContreeServer {
	public static main = () => {
		console.log("server.ts");

		const app = Express();
		const server = Http.createServer(app);
		const socket = SocketIo(server);
		const port = process.env.PORT || 2828;

		socket.on("connection", client => {
			console.log("Client connected");
			client.on("message", mess => {
				console.log("Message received:\n", JSON.stringify(mess));
			});
			client.on("payload", (payload: Payload) => {
				console.log("Payload received:\n", JSON.stringify(payload));
			});
			client.on("disconnect", () => {
				console.log("Client disconnected");
			});
		});

		server.listen(port, () => {
			console.log("Listening on port:", port);
		});

	}
}

