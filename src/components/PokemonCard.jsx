import React from "react"
import { useNavigate } from "react-router-dom"

export default function PokemonCard({ pokemon, compact = false }) {
  const navigate = useNavigate()
  const image =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites?.front_default ||
    "/placeholder.png"

  const typeIcons = {
    normal: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/1.png",
    fighting: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/2.png",
    flying: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/3.png",
    poison: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/4.png",
    ground: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/5.png",
    rock: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/6.png",
    bug: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/7.png",
    ghost: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/8.png",
    steel: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/9.png",
    fire: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/10.png",
    water: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/11.png",
    grass: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/12.png",
    electric: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/13.png",
    psychic: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/14.png",
    ice: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/15.png",
    dragon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/16.png",
    dark: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/17.png",
    fairy: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/18.png",
  }

  return (
    <div
      className={`${compact ? "w-48 h-56" : "w-56 h-64"} mirror-card cursor-pointer`}
      onClick={() => navigate(`/pokemon/${pokemon.name}`, { state: { pokemon } })}
    >
      <div className="mirror-inner rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 w-full h-full flex flex-col">
        <div className="flex flex-col items-center justify-center p-4">
          <div className="mirror-content flex flex-col items-center">
            <img src={image} alt={pokemon.name} className={`${compact ? "w-28 h-28" : "w-36 h-36"} object-contain`} />
            <h3 className="capitalize font-bold text-lg mt-2">{pokemon.name}</h3>
            <div className="flex gap-2 mt-2 flex-wrap justify-center">
              {pokemon.types?.map((t) => (
                <div key={t.type.name} className="flex items-center gap-1 px-1 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-sm">
                  <img src={typeIcons[t.type.name]} alt={t.type.name} className="w-15 h-3" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 bg-white/80 dark:bg-gray-900/80 text-sm grow">
          <div className="font-semibold mb-1">Abilities</div>
          <div className="mb-2">
            {pokemon.abilities?.map((a) => (
              <span key={a.ability.name} className="inline-block mr-2 capitalize">
                {a.ability.name}
              </span>
            ))}
          </div>
          <div className="font-semibold mb-1">Moves</div>
          <div className="text-xs">{pokemon.moves?.slice(0, 6).map((m) => m.move.name).join(", ")}</div>
        </div>
      </div>
    </div>
  )
}
