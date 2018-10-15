import { Suit } from "./Suit";

export enum CardColor {
	Red,
	Black,
}

export interface Card {
	value: number;
	color: CardColor;
	suit: Suit;
}
