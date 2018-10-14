
import Express from "express";
import SocketIo from "socket.io";
import Http from "http";

console.log("server.ts");

const app = Express();
const server = Http.createServer(app);
const socket =  SocketIo(server);
const port = process.env.PORT || 2828;

socket.on("connection", (client) => {
	console.log("Client connected");
	client.on("message", (mess) => {
		console.log("Message received:\n", JSON.stringify(mess));
	});
	client.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

server.listen(port, () => {console.log("Listening on port:", port)});
