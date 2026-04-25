<script lang="ts">
	import { ESSENCES, type Pet } from '$lib/game/data';
	import { synthesizePet, getRank } from '$lib/game/logic';
	import { Sparkles, FlaskConical, ScrollText, History, Trophy, Info } from 'lucide-svelte';
	import { fade, scale, slide, fly } from 'svelte/transition';

	// Game State using Runes (Svelte 5)
	let selectedEssence1 = $state<string | null>(null);
	let selectedEssence2 = $state<string | null>(null);
	let currentPet = $state<Pet | null>(null);
	let history = $state<Pet[]>([]);
	let totalScore = $state(0);
	let isSynthesizing = $state(false);
	let showHistory = $state(false);

	function handleEssenceSelect(id: string) {
		if (isSynthesizing) return;
		
		if (!selectedEssence1) {
			selectedEssence1 = id;
		} else if (!selectedEssence2) {
			selectedEssence2 = id;
		} else {
			// Replace second one if both selected
			selectedEssence2 = id;
		}
	}

	async function performSynthesis() {
		if (!selectedEssence1 || !selectedEssence2) return;
		
		isSynthesizing = true;
		currentPet = null;
		
		// Simulate the "Ritual"
		await new Promise(r => setTimeout(r, 1500));
		
		const newPet = synthesizePet(selectedEssence1, selectedEssence2);
		currentPet = newPet;
		history = [newPet, ...history];
		totalScore += newPet.soulScore;
		
		isSynthesizing = false;
		selectedEssence1 = null;
		selectedEssence2 = null;
	}

	function resetCurrent() {
		currentPet = null;
	}
</script>

<div class="min-h-screen bg-neutral-950 text-neutral-100 font-sans p-4 md:p-8">
	<!-- Header -->
	<header class="max-w-4xl mx-auto flex justify-between items-center mb-12">
		<div>
			<h1 class="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
				Pet Naming Quest
			</h1>
			<p class="text-neutral-500 font-mono text-sm">{getRank(totalScore)}</p>
		</div>
		<div class="flex items-center gap-4">
			<div class="text-right">
				<p class="text-xs text-neutral-500 uppercase tracking-widest">Total Soul Power</p>
				<p class="text-2xl font-bold text-yellow-500">{totalScore}</p>
			</div>
			<button 
				onclick={() => showHistory = !showHistory}
				class="p-2 hover:bg-neutral-800 rounded-full transition-colors relative"
			>
				<History size={24} />
				{#if history.length > 0}
					<span class="absolute top-0 right-0 w-2 h-2 bg-pink-500 rounded-full"></span>
				{/if}
			</button>
		</div>
	</header>

	<main class="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
		<!-- Left: The Alchemist Table -->
		<section class="space-y-8">
			<div>
				<h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
					<FlaskConical size={20} class="text-purple-400" />
					Choose Essences
				</h2>
				<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
					{#each Object.values(ESSENCES) as essence}
						<button
							onclick={() => handleEssenceSelect(essence.id)}
							class="relative group aspect-square rounded-xl p-3 flex flex-col items-center justify-center gap-2 transition-all 
							{selectedEssence1 === essence.id || selectedEssence2 === essence.id 
								? 'ring-2 ring-white bg-neutral-800' 
								: 'bg-neutral-900 hover:bg-neutral-800'}"
						>
							<div class="w-8 h-8 rounded-full bg-gradient-to-br {essence.color} shadow-lg group-hover:scale-110 transition-transform"></div>
							<span class="text-xs font-medium uppercase tracking-tighter">{essence.name}</span>
							
							{#if essence.rarity !== 'common'}
								<span class="absolute top-1 right-1 w-1.5 h-1.5 rounded-full 
									{essence.rarity === 'rare' ? 'bg-blue-400' : 
									 essence.rarity === 'epic' ? 'bg-purple-500' : 'bg-yellow-400'}">
								</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<div class="p-6 bg-neutral-900 rounded-2xl border border-neutral-800 relative overflow-hidden">
				<div class="flex justify-between items-center mb-6">
					<h3 class="text-sm font-mono text-neutral-500 uppercase tracking-widest">Selected Fusion</h3>
					<button 
						onclick={() => { selectedEssence1 = null; selectedEssence2 = null; }}
						class="text-xs text-neutral-500 hover:text-white"
					>
						Clear
					</button>
				</div>
				
				<div class="flex items-center justify-around gap-4 py-4">
					<div class="w-16 h-16 rounded-2xl border-2 border-dashed border-neutral-700 flex items-center justify-center bg-neutral-950">
						{#if selectedEssence1}
							<div transition:scale class="w-12 h-12 rounded-full bg-gradient-to-br {ESSENCES[selectedEssence1].color}"></div>
						{/if}
					</div>
					<div class="text-neutral-700 font-bold text-2xl">+</div>
					<div class="w-16 h-16 rounded-2xl border-2 border-dashed border-neutral-700 flex items-center justify-center bg-neutral-950">
						{#if selectedEssence2}
							<div transition:scale class="w-12 h-12 rounded-full bg-gradient-to-br {ESSENCES[selectedEssence2].color}"></div>
						{/if}
					</div>
				</div>

				<button
					disabled={!selectedEssence1 || !selectedEssence2 || isSynthesizing}
					onclick={performSynthesis}
					class="w-full mt-6 py-4 bg-white text-black font-bold rounded-xl transition-all disabled:opacity-30 disabled:grayscale hover:bg-neutral-200 active:scale-95 flex items-center justify-center gap-2"
				>
					{#if isSynthesizing}
						<div class="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
						Synthesizing...
					{:else}
						<Sparkles size={20} />
						Begin Ritual
					{/if}
				</button>
			</div>
		</section>

		<!-- Right: The Outcome -->
		<section class="flex flex-col items-center justify-center min-h-[400px] relative">
			{#if isSynthesizing}
				<div class="relative w-48 h-48 flex items-center justify-center">
					<div class="absolute inset-0 bg-purple-500/20 blur-3xl animate-pulse rounded-full"></div>
					<div class="w-32 h-40 bg-neutral-800 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] border-4 border-neutral-700 animate-bounce"></div>
				</div>
			{:else if currentPet}
				<div transition:fly={{ y: 20 }} class="text-center w-full">
					<div class="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
						<Trophy size={14} />
						New Discovery
					</div>
					<h3 class="text-5xl font-black mb-2 tracking-tight">{currentPet.name}</h3>
					<p class="text-xl text-neutral-400 mb-8 italic">The {currentPet.type}</p>
					
					<div class="flex gap-4 justify-center mb-12">
						<div class="text-center">
							<p class="text-[10px] text-neutral-500 uppercase">Soul Score</p>
							<p class="text-3xl font-bold text-white">+{currentPet.soulScore}</p>
						</div>
					</div>

					<button 
						onclick={resetCurrent}
						class="px-8 py-3 rounded-full border border-neutral-700 hover:bg-neutral-800 transition-colors text-sm"
					>
						Reset Altar
					</button>
				</div>
			{:else}
				<div class="text-center text-neutral-700 space-y-4">
					<div class="w-48 h-48 border-2 border-dashed border-neutral-800 rounded-full mx-auto flex items-center justify-center">
						<ScrollText size={48} />
					</div>
					<p class="max-w-[240px] mx-auto text-sm italic">
						Combine two essences to breathe life into a new name.
					</p>
				</div>
			{/if}
		</section>
	</main>

	<!-- History Sidebar Overlay -->
	{#if showHistory}
		<div 
			transition:fade={{ duration: 200 }} 
			class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-end"
			onclick={({ target, currentTarget }) => target === currentTarget && (showHistory = false)}
		>
			<div 
				transition:fly={{ x: 300 }}
				class="w-full max-w-md bg-neutral-900 h-full p-8 overflow-y-auto border-l border-neutral-800"
			>
				<div class="flex justify-between items-center mb-8">
					<h2 class="text-2xl font-bold">Chronicle of Names</h2>
					<button onclick={() => showHistory = false} class="text-neutral-500 hover:text-white">Close</button>
				</div>

				{#if history.length === 0}
					<div class="py-20 text-center text-neutral-500 italic">
						Your chronicle is empty. Start the ritual!
					</div>
				{:else}
					<div class="space-y-4">
						{#each history as pet}
							<div class="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex justify-between items-center">
								<div>
									<h4 class="font-bold text-lg">{pet.name}</h4>
									<p class="text-xs text-neutral-500">The {pet.type}</p>
								</div>
								<div class="text-right">
									<p class="text-sm font-bold text-yellow-500">{pet.soulScore}</p>
									<div class="flex gap-1 justify-end mt-1">
										{#each pet.essences as eId}
											<div class="w-2 h-2 rounded-full bg-gradient-to-br {ESSENCES[eId].color}"></div>
										{/each}
									</div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	:global(body) {
		background-color: #0a0a0a;
	}
</style>
