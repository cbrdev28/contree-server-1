import { ContreeGameManager } from "../ContreeGameManager";
import { Player } from "../../model/Player";

let manager: ContreeGameManager;

beforeEach(() => {
	manager = new ContreeGameManager();
	manager.init();
});

test("it returns non null after init", () => {
	expect(manager.contreeGame).not.toBeNull();
});

test("it adds a player", () => {
	// Predicates
	const testPlayer: Player = {
		id: 28,
		name: "Francis",
		hand: [],
	};
	const prevNumPlayers = manager.contreeGame.players.length;

	// Action to test
	const players = manager.addPlayer(testPlayer).contreeGame.players;

	expect(players.length).toEqual(prevNumPlayers + 1);

	const foundPlayer = players.find(player => player.id === testPlayer.id);
	expect(foundPlayer).not.toBeNull();
});
