export default async function (value: string) {
	if (value.length === 0) {
		console.log("No value entered");
		throw new Error("Please enter a value.");
	}

	try {
		const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + value);

		if (!response.ok) {
			if (response.status === 404) {
				throw new Error("Pokémon not found. Please check the value.");
			}
			throw new Error(`HTTP error: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("An unexpected error occurred");
	}
}