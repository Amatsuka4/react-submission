import type { Pokemon } from "../App";

// ==============================
// Types
// ==============================

type ResultProps = {
	pokemonData: Pokemon | null;
	isPending: boolean;
	error: string | null;
};

// ==============================
// PokemonDetails
// ==============================

const PokemonDetails = ({ pokemonData }: { pokemonData: Pokemon }) => {
	return (
		<div className="result__details">
			<div className="result__images">
				<div className="image__container">
					<img
						src={pokemonData.sprites.other.showdown.front_default?.toString() ?? ""}
						alt={pokemonData.name + " Front Default"}
					/>
					<p>Front Default</p>
				</div>

				<div className="image__container">
					<img
						src={pokemonData.sprites.other.showdown.front_shiny?.toString() ?? ""}
						alt={pokemonData.name + " Front Shiny"}
					/>
					<p>Front Shiny</p>
				</div>
				<div className="image__container">
					<img
						src={pokemonData.sprites.other.showdown.back_default?.toString() ?? ""}
						alt={pokemonData.name + " Back Default"}
					/>
					<p>Back Default</p>
				</div>
				<div className="image__container">
					<img
						src={pokemonData.sprites.other.showdown.back_shiny?.toString() ?? ""}
						alt={pokemonData.name + " Back Shiny"}
					/>
					<p>Back Shiny</p>
				</div>
			</div>
			<div className="result__info">
				<div className="result__info-header">
					<h2>{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
					<h3>#{pokemonData.id.toString().padStart(3, "0")}</h3>
				</div>
				<div className="result__info-types">
					{pokemonData.types.map((type) => (
						<div className={"result__info-type " + type.type.name} key={type.slot}>
							{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
						</div>
					))}
				</div>
				<div className="result__info-stats">
					<p>
						<b>Height:</b> {pokemonData.height / 10} m
					</p>
					<p>
						<b>Weight:</b> {pokemonData.weight / 10} kg
					</p>
					<p>
						<b>Abilities:</b>{" "}
						{pokemonData.abilities.map((ability) => ability.ability.name).join(", ")}
					</p>
				</div>
			</div>
		</div>
	);
};

// ==============================
// Result
// ==============================

export default function Result({ pokemonData, isPending, error }: ResultProps) {
	return (
		<>
			{isPending ? (
				<div className="loader"></div>
			) : error ? (
				<p className="error">{error}</p>
			) : pokemonData ? (
				<PokemonDetails pokemonData={pokemonData} />
			) : null}
		</>
	);
}
