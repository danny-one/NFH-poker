export enum GameState {
	NONE = 'none',
	START = 'start',
	DEFAULT = 'default',
	ATTRACT = 'attract',
	DEALING = 'dealing',
	DRAWING = 'drawing',
	WINNING = 'winning',
	DISCARD = 'discard',
	DOUBLING = 'doubling',
	DOUBLE_REPEAT = 'doublingrepeat',
	DOUBLE_SHUFFLE = 'doubleshuffle',
	DOUBLE_START = 'doublestart',
	SHUFFLING = 'shuffling',
}

export enum Hands {
	ROYAL_FLUSH,
	STRAIGHT_FLUSH,
	FLUSH,
	ALLIANCE,
}

export enum Volume {
	MUTE = 0,
	LOW = 0.25,
	HIGH = 0.5,
}
