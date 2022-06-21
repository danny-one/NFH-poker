import { IGameSettings } from '../config/GameSettings';
import { Card } from '../components/Card';
import { Deck } from '../components/Deck';
import { Hands } from '../components/Enums';

export const sortComparator = (a: Card, b: Card) => {
	return a.value > b.value ? 1 : a.value === b.value ? 0 : -1;
};

export const hasJoker = (hand: Card[]): boolean => {
	return !hand.every( (c: Card) => !c.isJoker );
};

export const handCounts = (hand: Card[]): Map<any, number> => {
	return hand.map( (c: Card) => c.value)
			.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map());
};

export class PokerGame {
	public deck: Deck;
	public settings: IGameSettings;

	constructor(settings: IGameSettings) {
		this.settings = settings;
		this.deck = new Deck(this.settings.jokers);
	}

	public checkHand(hand: Card[]): Hands {
		if (hand.length !== 5) {
			return null;
		}

		if (this.hasRoyal(hand) && this.hasFlush(hand) && this.hasStraight(hand)) {
			return Hands.ROYAL_FLUSH;
		}

		if (this.hasFlush(hand) && this.hasStraight(hand)) {
			return Hands.STRAIGHT_FLUSH;
		}

		if (this.hasFlush(hand)) {
			return Hands.FLUSH;
		}
		
		if (this.hasAlliance(hand)) {
			return Hands.ALLIANCE;
		}
		
		return null;
	}

	public deal(count: number): Card[] {
		const cards: Card[] = [];

		for (let i = 0; i < count; i++) {
			cards.push(this.deck.draw());
		}

		return cards;
	}

	// private
	private hasFlush(hand: Card[]): boolean {
		const j = hasJoker(hand);
		const card = j ? hand[1] : hand[0];
		return hand.filter( (c: Card) => !c.isJoker )
					.every( (c: Card) => c.suit === card.suit);
	}
	
	private hasAlliance(hand: Card[]): boolean {
		const j = hasJoker(hand);
		const card = j ? hand[1] : hand[0];
		return hand.filter( (c: Card) => !c.isJoker )
					.every( (c: Card) => c.suit === card.suit || c.suit === 'heart');
	}

	private hasRoyal(hand: Card[]) {
		return hand.map( (c: Card) => c.value )
					.filter( (v: number) => v > 1 )
					.every( (v: number) => v >= 10 );
	}

	private hasStraight(hand: Card[]): boolean {
		const jokers = hand.filter( (c: Card) => c.isJoker ).length;
		const j = jokers > 0;
		const counts = handCounts(j ? hand.filter( (c: Card) => !c.isJoker ) : hand);

		// we don't all unique values, so can't be a straight
		if (counts.size !== (5 - jokers)) { return false; }

		const sortedHand: number[] = hand.filter( (c: Card) => !c.isJoker )
										.sort(sortComparator).map( (c: Card) => c.value );

		const hasAce = sortedHand.some( (v: number) => v === 1);

		// if ace can be 1 in this straight or not
		const isHigh = !j ? sortedHand[hasAce ? 1 : 0] > 5 : sortedHand[hasAce ? 2 : 1] > 5;

		// remove first element since it's a 1 and push a high ace at the end
		if (isHigh && hasAce) {
			sortedHand.push(14);
			sortedHand.shift();
		}

		let lowest = sortedHand[0];
		let jokersUsed = 0;
		for (let i = 1; i < sortedHand.length; i++) {
			if (!sortedHand.includes(lowest + i)) {
				if (jokersUsed < jokers) {
					jokersUsed++;
					lowest++;
					// use a joker, increment the lowest to bump the "straight" seq up
					// and see if there's one higher then
					if (!sortedHand.includes(lowest + i)) {
						return false;
					}
				} else {
					return false;
				}
			}
		}

		return true;
	}
}
