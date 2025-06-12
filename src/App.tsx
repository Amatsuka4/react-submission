import Search from "./Components/Search.tsx";
import Result from "./Components/Result.tsx";
import { useEffect, useState, useTransition } from "react";
import fetchPokemon from "./api/fetchPokemon.ts";

// ==============================
// Types
// ==============================

type PokemonAbilities = {
	ability: { name: string };
};

type PokemonType = {
	slot: number;
	type: {
		name: string;
	};
};

export type Pokemon = {
	abilities: PokemonAbilities[];
	name: string;
	id: number;
	sprites: {
		other: {
			showdown: {
				front_default: URL | null;
				front_shiny: URL | null;
				back_default: URL | null;
				back_shiny: URL | null;
			};
		};
	};
	types: PokemonType[];
	height: number;
	weight: number;
};

// ==============================
// App
// ==============================

export default function App() {
	const [pokemonName, setPokemonName] = useState<string>("");
	const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	// 検索処理
	const handleSearch = async (value: string) => {
		setError(null);
		startTransition(async () => {
			try {
				const pokemonData: Pokemon = await fetchPokemon(value);
				setPokemonData(pokemonData);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError("An unexpected error occurred");
				}
				setPokemonData(null);
			}
		});
	};

	useEffect(() => {
		if (pokemonName) {
			handleSearch(pokemonName);
		}
	}, [pokemonName]);

	return (
		<main className="wrapper">
			<div className="container">
				<div className="container__header">
					<h1 className="container__title">Poké Search</h1>
					<p className="container__subtitle">Search for a Pokémon by name or ID</p>
				</div>
				<Search setPokemonName={setPokemonName} isPending={isPending} />
				<Result pokemonData={pokemonData} isPending={isPending} error={error} />
			</div>
		</main>
	);
}
