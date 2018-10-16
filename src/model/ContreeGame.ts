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

	// This is dynamic? Computed during the game
	// So it should probably not be here?
	// Hence the fact that it's still marked optional...?
	bet?: Bet;
}
