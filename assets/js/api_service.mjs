const API_URL = 'https://swapi.dev/api';

export async function getCharacter(id) {
	try {
		const response = await fetch(`${API_URL}/people/${id}`);
		const character = await response.json();
		return character;
	} catch (error) {
		return { notFound: 'not found', error };
	}
}
