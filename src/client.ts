import SocketIo from "socket.io-client";

console.log("client.ts");

const socket = SocketIo("http://localhost:28028");

setTimeout(() => {
	console.log("Sending message...");
	socket.emit("message", "CBR's client is sending a message");

	setTimeout(() => {
		console.log("Disonnecting...");
		socket.disconnect();
		socket.close();
	}, 2000);
}, 2000);
