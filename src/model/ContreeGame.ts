import { Table } from "./Table";
import { Team } from "./Team";
import { Player } from "./Player";
import { Deck } from "./Deck";
import { Bet } from "./Bet";

export interface ContreeGame {
	table: Table;
	teams: Team[];
	players: Player[];
	deck: Deck;
	bet?: Bet;

	// For proof of concept purpose and test an action: client sending a message
	message: string;
}
