import { Player } from "../model/Player";
import { Table } from "../model/Table";
import { Team } from "../model/Team";
import { Deck } from "../model/Deck";

import { DeckManager } from "./DeckManager";

export class ContreeGameManager {
	private deckManager: DeckManager;

	constructor() {
		this.deckManager = new DeckManager();
	}

	public init = () => {
		const table: Table = {
			board: [],
		};
		const teams: Team[] = [];
		const players: Player[] = [];
		const deck: Deck = this.deckManager.newDeck();
		return {
			table,
			teams,
			players,
			deck,
		};
	};

	public addPlayer = (player: Player) => {
		return null;
	};

	public removePlayer = (player: Player) => {
		return null;
	};

	// For proof of concept purpose and test an action: client sending a message
	public setMessage = (message: string) => {
		return null;
	};
}
