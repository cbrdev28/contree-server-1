import { Player } from "../model/Player";

export interface PlayerGameState {
	mainPlayer: Player;
	otherPlayers: Player[];
	currentMessage: string | "";
}

export class ContreeGameError extends Error {
	constructor(m: string) {
		super(m);
		// Set the prototype explicitly
		Object.setPrototypeOf(this, ContreeGameError.prototype);
	}
}
