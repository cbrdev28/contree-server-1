import { ContreeGame } from "../model/ContreeGame";
import { Player } from "../model/Player";

export interface ContreeGameManager {
	init: () => ContreeGame;

	addPlayer: (player: Player) => ContreeGame;
	removePlayer: (player: Player) => ContreeGame;

	// For proof of concept purpose and test an action: client sending a message
	setMessage: (message: string) => string;
}
