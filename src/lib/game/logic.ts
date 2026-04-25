import { ESSENCES, PET_TYPES, type Essence, type Pet } from './data';

const RARITY_POINTS = {
	common: 10,
	rare: 50,
	epic: 150,
	legendary: 500
};

export function synthesizePet(essence1Id: string, essence2Id: string): Pet {
	const e1 = ESSENCES[essence1Id];
	const e2 = ESSENCES[essence2Id];

	if (!e1 || !e2) throw new Error('Invalid essences');

	// Name Generation: Prefix from one, Suffix from another
	const prefix = e1.prefixes[Math.floor(Math.random() * e1.prefixes.length)];
	const suffix = e2.suffixes[Math.floor(Math.random() * e2.suffixes.length)];
	const name = prefix + suffix;

	// Pet Type Selection
	const type = PET_TYPES[Math.floor(Math.random() * PET_TYPES.length)];

	// Score Calculation
	let soulScore = RARITY_POINTS[e1.rarity] + RARITY_POINTS[e2.rarity];
	
	// Add synergy bonus (e.g., Fire + Ice is "Chaos", bonus score)
	if (
		(essence1Id === 'fire' && essence2Id === 'ice') ||
		(essence1Id === 'ice' && essence2Id === 'fire')
	) {
		soulScore += 100; // Temperature Shock bonus
	}
	
	if (essence1Id === essence2Id) {
		soulScore += 25; // Pure Essence bonus
	}

	// Random variance
	soulScore += Math.floor(Math.random() * 20);

	return {
		name,
		type,
		soulScore,
		essences: [essence1Id, essence2Id],
		timestamp: Date.now()
	};
}

export function getRank(totalScore: number) {
	if (totalScore < 100) return 'Novice Namer';
	if (totalScore < 500) return 'Apprentice Alchemist';
	if (totalScore < 1500) return 'Pet Sage';
	if (totalScore < 5000) return 'Soul Weaver';
	return 'Transcendental Master';
}
