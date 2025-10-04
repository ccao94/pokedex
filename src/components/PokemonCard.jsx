import React from "react"
import { useNavigate } from "react-router-dom"

export default function PokemonCard({ pokemon, compact = false }) {
  const navigate = useNavigate()
  const image =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites?.front_default ||
    "/placeholder.png"

  const typeIcons = {
    normal: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/normal.svg",
    fire: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fire.svg",
    water: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/water.svg",
    grass: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/grass.svg",
    electric: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/electric.svg",
    ice: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ice.svg",
    fighting: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fighting.svg",
    poison: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/poison.svg",
    ground: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ground.svg",
    flying: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/flying.svg",
    psychic: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/psychic.svg",
    bug: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/bug.svg",
    rock: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/rock.svg",
    ghost: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ghost.svg",
    dragon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/dragon.svg",
    dark: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/dark.svg",
    steel: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/steel.svg",
    fairy: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fairy.svg",
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
                  <img src={typeIcons[t.type.name]} alt={t.type.name} className="w-5 h-5" />
                  <span className="capitalize">{t.type.name}</span>
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
