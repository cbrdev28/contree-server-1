import { Card } from "./Card";

export interface Player {
	id: number;
	name: string;
	hand: Card[];
	teamate: Player;
}