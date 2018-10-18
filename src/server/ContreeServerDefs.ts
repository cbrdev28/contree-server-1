export enum ContreeEvent {
	ClientConnected = "connection",
	ClientDisconnected = "disconnect",
	ClientSentMessage = "message",
}

export enum ContreeAction {
	BroadcastMessage = "BroadcastMessage",
	GameState = "GameState",
}
