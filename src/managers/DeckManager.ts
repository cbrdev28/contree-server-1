import { Deck } from "../model/Deck";
import {
	Suit,
	getSuitColor
} from "../model/Suit";
import { Card, CardColor } from "../model/Card";

const CARDS_PER_SUIT = 8;

export class DeckManager {
	public newDeck = (): Deck => {
		const deck: Deck = {
			cards: [],
		};
		const cards: Card[] = [];

		for (const suit of [Suit.Diamond, Suit.Clubs, Suit.Heart, Suit.Spades]) {
			const cardColor: CardColor = getSuitColor(suit);
			for (let i = 0; i < CARDS_PER_SUIT; ++i) {
				const card: Card = {
					value: i,
					suit,
					color: cardColor,
				};
				cards.push(card);
			}
		}
		deck.cards = cards;

		return this.shuffleDeck(deck);
	}

	private shuffleDeck = (deck: Deck): Deck => {
		const randomDepth = 10000;
		// We need a copy of the deck where to pick up cards from (mutate)
		let pile = [...deck.cards];
		const shuffledCards: Card[] = [];

		deck.cards.forEach(card => {
			const cardsInPile = pile.length;
			let randomIndex = Math.floor((Math.random() * randomDepth) % cardsInPile);
			// We don't want to overflow!
			if (randomIndex > cardsInPile) {
				randomIndex = 0;
			}

			pile = pile.filter((cardFromPile, index) => {
				if (index === randomIndex) {
					shuffledCards.push(cardFromPile);
					return false;
				}
				return true;
			});
		});

		deck.cards = shuffledCards;
		return deck;
	}
}
