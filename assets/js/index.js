import { getCharacter } from './api_service.mjs';
import { RANGES } from './consts.mjs';

async function* charactersByRange({ min, max }) {
	for (let i = min; i <= max; i++) {
		const character = await getCharacter(i);
		yield character;
	}
}

const generators = {
	principal: charactersByRange(RANGES.principalCharacters),
	secondary: charactersByRange(RANGES.secondaryCharacters),
	other: charactersByRange(RANGES.otherCharacters),
};

async function printCharacter(event) {
	const sectionId = this.parentElement.id;
	const generatedCharacter = await generators[sectionId].next();
	const section = document.getElementById(sectionId);

	if (!generatedCharacter.done) {
		const character = generatedCharacter.value;

		const card = document.createElement('div');
		const circle = document.createElement('div');
		const div = document.createElement('div');
		const h2 = document.createElement('h2');
		const p = document.createElement('p');

		card.classList.add('card');
		circle.classList.add('circle');
		h2.innerText = character.name;
		p.innerText = `Altura: ${character.height}, Peso: ${character.mass}`;

		div.append(h2, p);
		card.append(circle, div);

		section.append(card);
		return;
	}
	if (!section.parentElement.innerText.includes('No hay más')) {
		const noMore = document.createElement('div');
		noMore.classList.add('noMore');
		noMore.textContent = 'No hay más personajes en esta sección.';
		section.parentElement.append(noMore);
	}
}

const firstCardBySection = document.querySelectorAll('.card:first-child');

firstCardBySection.forEach((el) => {
	el.addEventListener('click', printCharacter);
});
