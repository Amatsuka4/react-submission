import { useEffect, useState } from "react";

// ==============================
// Types
// ==============================

type SearchMode = 0 | 1;

type SearchProps = {
	setPokemonName: (value: string) => void;
	isPending: boolean;
};

function useSearchMode() {
	const [searchMode, setSearchMode] = useState<SearchMode>(0);
	return { searchMode, setSearchMode };
}

// ==============================
// Search
// ==============================

export default function Search({ setPokemonName, isPending }: SearchProps) {
	const { searchMode, setSearchMode } = useSearchMode();
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		setSearchValue("");
	}, [searchMode]);

	return (
		<div className="container__search">
			<div className="search__switch">
				<button
					className={"search__switch-button " + (searchMode === 0 ? "active" : "")}
					onClick={() => setSearchMode(0)}
				>
					Search by Name
				</button>
				<button
					className={"search__switch-button " + (searchMode === 1 ? "active" : "")}
					onClick={() => setSearchMode(1)}
				>
					Search by ID
				</button>
			</div>
			<div className="search__form">
				<input
					type={searchMode === 0 ? "text" : "number"}
					className="search__input"
					placeholder={
						searchMode === 0 ? "Enter Name (e.g. pikachu)" : "Enter ID (e.g. 25)"
					}
					value={searchValue}
					onChange={(e) => {
						// 名前検索の場合、英字のみ入力許可
						if (searchMode === 0) {
							const value = e.target.value.replace(/[^a-zA-Z]/g, "");
							setSearchValue(value);
						} else {
							setSearchValue(e.target.value);
						}
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter" && searchValue.length > 0) {
							setPokemonName(searchValue);
						}
					}}
				/>
				<button
					className={"search__button " + (isPending ? "disabled" : "")}
					onClick={() => {
						if (searchValue.length > 0) {
							setPokemonName(searchValue);
						}
					}}
				>
					{isPending ? "Searching..." : "Search"}
				</button>
			</div>
		</div>
	);
}
