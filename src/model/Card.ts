import { Suit } from "./Suit";

type Color = "red" | "black";

export interface Card {
	value: number;
	color: Color;
	suit: Suit;
}
