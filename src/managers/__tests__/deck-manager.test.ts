import { DeckManager } from "../DeckManager";

test("it returns a deck with 32 card and one valid card at least", () => {
	const manager = new DeckManager();
	const deck = manager.newDeck();

	expect(deck.cards.length).toEqual(32);
});
