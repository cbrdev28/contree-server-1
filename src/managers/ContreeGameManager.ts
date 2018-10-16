import { Player } from "../model/Player";
import { Table } from "../model/Table";
import { Team } from "../model/Team";
import { Deck } from "../model/Deck";
import { ContreeGame } from "../model/ContreeGame";
import {
	PlayerGameState,
	ContreeGameError,
} from "./ContreeGameManagerDefs";
import { DeckManager } from "./DeckManager";


export class ContreeGameManager {
	private _contreeGame?: ContreeGame;
	private _deckManager: DeckManager;
	private _currentMessage: string;

	constructor() {
		this._deckManager = new DeckManager();
		this._currentMessage = "";
	}

	/** Getters */
	get contreeGame(): ContreeGame {
		return this.init();
	}

	/** Setters */
	set currentMessage(message: string) {
		this._currentMessage = message;
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

	public removePlayer = (player: Player): ContreeGameManager => {
		const players = this.contreeGame.players;
		const indexRemovePlayer = players.indexOf(player);
		if (indexRemovePlayer > -1) {
			players.splice(indexRemovePlayer, 1);
		}
		return this;
	};

	public gameStateForPlayer = (givenPlayer: Player): PlayerGameState => {
		const players = this.contreeGame.players;

		const mainPlayer = players.find(player => player === givenPlayer);
		if (mainPlayer == null) {
			throw new ContreeGameError("Player not found");
		}

		const otherPlayers = players.filter(player => player !== givenPlayer);

		const playerGameState: PlayerGameState = {
			mainPlayer,
			otherPlayers,
			currentMessage: this._currentMessage,
		};
		return playerGameState;
	};

	/** Private */
}
