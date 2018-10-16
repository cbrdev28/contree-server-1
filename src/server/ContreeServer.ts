import Express from "express";
import SocketIo from "socket.io";
import Http from "http";

import { ContreeEvent, ContreeAction } from "./ContreeServerDefs";
import { ContreeGameManager } from "../managers/ContreeGameManager";
import { Player } from "../model/Player";
import { PlayerGameState } from "../managers/ContreeGameManagerDefs";

export class ContreeServer {
	private _port: string | number = process.env.PORT || 3333;
	private _expressApp: Express.Express;
	private _httpServer: Http.Server;
	private _ioSocket: SocketIo.Server;
	private _contreeGameManager: ContreeGameManager;
	private _connectedSockets: SocketIo.Socket[] = [];

	constructor() {
		this._contreeGameManager = new ContreeGameManager();
		this._contreeGameManager.init();

		this._expressApp = Express();
		this._httpServer = Http.createServer(this._expressApp);
		this._ioSocket = SocketIo(this._httpServer);
		this.initSocket();
	}

	public start = () => {
		this._httpServer.listen(this._port, () => {
			console.log("Listening on port:", this._port);
		});
	}

	private initSocket = () => {
		this._ioSocket.on(ContreeEvent.ClientConnected, this.onClientConnected);
	}

	private onClientConnected = (clientSocket: SocketIo.Socket) => {
		console.log("onClientConnected");
		this._connectedSockets.push(clientSocket);

		const clientPlayer = this.playerFromClientSocket(clientSocket);
		this._contreeGameManager.addPlayer(clientPlayer);

		// Update all clients since a new player arrived
		this.updateAllPlayersGameState();

		clientSocket.on(ContreeEvent.ClientDisconnected, () => {
			this.onClientDisconnected(clientSocket);
		});

		clientSocket.on(ContreeEvent.ClientSentMessage, mess => {
			this.onClientSentMessage(clientSocket, mess);
		});
	}

	private onClientDisconnected = (client: SocketIo.Socket) => {
		console.log("onClientDisconnected");
		const indexOfDisconnectedClient = this._connectedSockets.indexOf(client);
		if (indexOfDisconnectedClient > -1) {
			this._connectedSockets.splice(indexOfDisconnectedClient, 1);
		}

		const disconnectedPlayer = this.playerFromClientSocket(client);
		this._contreeGameManager.removePlayer(disconnectedPlayer);

		// Update all clients since a player left
		this.updateAllPlayersGameState();
	}

	private onClientSentMessage = (client: SocketIo.Socket, message: string) => {
		console.log("onClientSentMessage");
		this._contreeGameManager.currentMessage = message;
		this.updateAllPlayersGameState();
	}

	private updateAllPlayersGameState = () => {
		this._connectedSockets.forEach(connectedSocket => {
			const connectedPlayer = this.playerFromClientSocket(connectedSocket);
			const playerGameState = this._contreeGameManager.gameStateForPlayer(connectedPlayer);
			this.updatePlayerGameSate(connectedSocket, playerGameState);
		});
	}

	private updatePlayerGameSate = (playerSocket: SocketIo.Socket, playerGameState: PlayerGameState) => {
		console.log("updatePlayerGameSate");
		playerSocket.emit(ContreeAction.SendGameState, playerGameState);
	}

	private playerFromClientSocket = (client: SocketIo.Socket): Player => {
		return {
			id: client.id,
			name: "Bob",
			hand: [],
		};
	}
}
