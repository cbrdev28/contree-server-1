import { Player } from "../model/Player";
import { Table } from "../model/Table";
import { Team } from "../model/Team";
import { Deck } from "../model/Deck";

import { DeckManager } from "./DeckManager";
import { ContreeGame } from "../model/ContreeGame";

export class ContreeGameManager {
	private _contreeGame?: ContreeGame;
	private _deckManager: DeckManager;

	constructor() {
		this._deckManager = new DeckManager();
	}

	/** Getters */
	get contreeGame(): ContreeGame {
		return this.init();
	}

	/** Public */
	public init = (): ContreeGame => {
		if (this._contreeGame != null) {
			return this._contreeGame;
		}

		const table: Table = {
			board: [],
		};
		const teams: Team[] = [];
		const players: Player[] = [];
		const deck: Deck = this._deckManager.newDeck();

		this._contreeGame = {
			table,
			teams,
			players,
			deck,
		};
		return this._contreeGame;
	};

	public addPlayer = (player: Player): ContreeGameManager => {
		this.contreeGame.players.push(player);
		return this;
	};

	public removePlayer = (player: Player) => {
		return null;
	};

	// For proof of concept purpose and test an action: client sending a message
	public setMessage = (message: string) => {
		return null;
	};

	/** Private */
}
