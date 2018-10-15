import { CardColor } from "./Card";

export enum Suit {
	Diamond,
	Heart,
	Spades,
	Clubs,
}

export const getSuitColor = (suit: Suit): CardColor => {
	if (suit === Suit.Heart || suit === Suit.Diamond) {
		return CardColor.Red;
	}
	return CardColor.Black;
};
