export interface Essence {
	id: string;
	name: string;
	color: string;
	prefixes: string[];
	suffixes: string[];
	description: string;
	rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Pet {
	name: string;
	type: string;
	soulScore: number;
	essences: [string, string];
	timestamp: number;
}

export const ESSENCES: Record<string, Essence> = {
	shadow: {
		id: 'shadow',
		name: 'Shadow',
		color: 'from-gray-700 to-black',
		prefixes: ['Dark', 'Night', 'Gloom', 'Shadow'],
		suffixes: ['shade', 'void', 'phantom', 'veil'],
		description: 'The essence of things unseen.',
		rarity: 'common'
	},
	star: {
		id: 'star',
		name: 'Star',
		color: 'from-yellow-200 to-blue-400',
		prefixes: ['Star', 'Astro', 'Nova', 'Cosmo'],
		suffixes: ['glow', 'light', 'burst', 'flare'],
		description: 'Celestial energy from far away.',
		rarity: 'common'
	},
	chaos: {
		id: 'chaos',
		name: 'Chaos',
		color: 'from-purple-600 to-pink-500',
		prefixes: ['Wild', 'Static', 'Flux', 'Discord'],
		suffixes: ['storm', 'glitch', 'rift', 'surge'],
		description: 'Pure, unbridled unpredictability.',
		rarity: 'rare'
	},
	nature: {
		id: 'nature',
		name: 'Nature',
		color: 'from-green-400 to-emerald-700',
		prefixes: ['Leaf', 'Bark', 'Bloom', 'Root'],
		suffixes: ['thorn', 'petal', 'wood', 'grove'],
		description: 'The pulse of the living world.',
		rarity: 'common'
	},
	fire: {
		id: 'fire',
		name: 'Fire',
		color: 'from-orange-500 to-red-600',
		prefixes: ['Ember', 'Blaze', 'Scorch', 'Pyre'],
		suffixes: ['burn', 'ash', 'spark', 'flare'],
		description: 'The heat of a thousand suns.',
		rarity: 'common'
	},
	ice: {
		id: 'ice',
		name: 'Ice',
		color: 'from-blue-200 to-cyan-400',
		prefixes: ['Frost', 'Glacier', 'Chill', 'Snow'],
		suffixes: ['bite', 'shard', 'peak', 'drift'],
		description: 'Frozen stillness.',
		rarity: 'common'
	},
	void: {
		id: 'void',
		name: 'Void',
		color: 'from-indigo-900 to-purple-900',
		prefixes: ['Null', 'Zero', 'Abyss', 'Hollow'],
		suffixes: ['sink', 'echo', 'depth', 'reach'],
		description: 'The hunger of the vacuum.',
		rarity: 'epic'
	},
	divine: {
		id: 'divine',
		name: 'Divine',
		color: 'from-yellow-400 to-white',
		prefixes: ['Holy', 'Saint', 'Solar', 'Angel'],
		suffixes: ['grace', 'wing', 'halo', 'ray'],
		description: 'Radiance that blinds.',
		rarity: 'legendary'
	}
};

export const PET_TYPES = [
	'Dragon', 'Phoenix', 'Slime', 'Griffin', 'Kitsune', 'Golem', 'Spirit', 'Chimera'
];
