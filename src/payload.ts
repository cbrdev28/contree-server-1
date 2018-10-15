
export interface Payload {
	id: number;
	name: string;
	players: Array<{
		id: number;
		name: string;
		hand: Card[];
	}>;
	table: {
		cards: Card[];
	};
	deck: Card[];
}

interface Card {
	color: "red" | "black";
	value: number;
}