import { Deck } from "../model/Deck";

export class DeckManager {
	public newDeck = (): Deck => {
		return {
			cards: [],
		};
	};
}
