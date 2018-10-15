import SocketIo from "socket.io-client";
import { Payload } from "./payload";

console.log("client.ts");

const payload: Payload = {
	id: 28,
	name: "First payload",
	players: [
		{
			id: 1,
			name: "Francis",
			hand: [
				{
					color: "black",
					value: 10,
				},
			],
		},
		{
			id: 2,
			name: "Robert",
			hand: [],
		},
	],
	deck: [{
		color: "black",
		value: 8,
	}],
	table: {
		cards: [{
			color: "red",
			value: 4,
		}],
	},
};

const socket = SocketIo("http://localhost:2828");

setTimeout(() => {
	console.log("Sending message...");
	socket.emit("message", "CBR's client is sending a message");
	setTimeout(() => {
		console.log("Sending payload...");
		socket.emit("payload", payload);
		setTimeout(() => {
			console.log("Disonnecting...");
			socket.disconnect();
			socket.close();
		}, 2000);
	}, 2000);
}, 2000);
