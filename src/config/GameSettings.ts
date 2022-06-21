import { Hands } from '../components/Enums';

export interface IGameSettings {
	[key: string]: any;
}

export interface IHand {
	key: Hands;
	multiplier: number;
	name: string;
}

export const gameSettings: IGameSettings = {
	maxBet: 5,
	betStep: 1,
	betStart: 1,
	startMoney: 25,
	maxDouble: 333,
	maxMoney: 9999,
	jokers: 1,
	hands: [
		{
			key: Hands.ROYAL_FLUSH,
			multiplier: 100,
			name: 'Royal Faction',
		},
		{
			key: Hands.STRAIGHT_FLUSH,
			multiplier: 50,
			name: 'Faction Run',
		},
		{
			key: Hands.FLUSH,
			multiplier: 7,
			name: 'Full Faction',
		},
		{
			key: Hands.ALLIANCE,
			multiplier: 3,
			name: 'Alliance',
		},
	] as IHand[],
};
