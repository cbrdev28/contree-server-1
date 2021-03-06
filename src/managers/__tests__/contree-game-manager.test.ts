import { ContreeGameManager } from "../ContreeGameManager";
import { Player } from "../../model/Player";
import { PlayerGameState } from "../ContreeGameManagerDefs";

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
		id: "28",
		name: "Francis",
		hand: [],
	};
	const prevNumPlayers = manager.contreeGame.players.length;

	// Action
	const players = manager.addPlayer(testPlayer).contreeGame.players;

	// Verify
	expect(players.length).toEqual(prevNumPlayers + 1);

	const foundPlayer = players.find(player => player.id === testPlayer.id);
	expect(foundPlayer).not.toBeNull();
});

test("it removes player", () => {
	// Predicates
	const testPlayerToRemove: Player = {
		id: "28",
		name: "Francis",
		hand: [],
	};
	const testPlayer2: Player = {
		id: "29",
		name: "Robert",
		hand: [],
	};
	manager.addPlayer(testPlayerToRemove);
	manager.addPlayer(testPlayer2);
	const prevNumPlayers = manager.contreeGame.players.length;

	// Action
	const players = manager.removePlayer(testPlayerToRemove).contreeGame.players;

	// Verify
	expect(players.length).toEqual(prevNumPlayers - 1);

	const removedPlayer = players.find(player => player.id === testPlayerToRemove.id);
	expect(removedPlayer).toBeUndefined();
});

test("it returns game state for a given player", () => {
	// Predicates
	const testPlayerGameState: Player = {
		id: "28",
		name: "Francis",
		hand: [],
	};
	const otherPlayer: Player = {
		id: "29",
		name: "Robert",
		hand: [],
	};
	manager.addPlayer(testPlayerGameState);
	manager.addPlayer(otherPlayer);

	// Action
	const gameState: PlayerGameState = manager.gameStateForPlayer(testPlayerGameState);

	// Verify
	expect(gameState.mainPlayer.id).toEqual(testPlayerGameState.id);
	expect(gameState.otherPlayers.length).toEqual(1);
	expect(gameState.otherPlayers.find(player => player === otherPlayer)).not.toBeNull();
	expect(gameState.otherPlayers.find(player => player === testPlayerGameState)).toBeUndefined();
	expect(gameState.currentMessage).toEqual("");
});