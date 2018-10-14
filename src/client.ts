import SocketIo from "socket.io-client";

console.log("client.ts");

const socket = SocketIo("http://localhost:2828");

setTimeout(() => {
	console.log("Ping!");
	socket.emit("message", "CBR's client is sending a message");
	socket.disconnect();
	socket.close();
}, 2000);
