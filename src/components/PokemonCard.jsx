import React from "react"
import { useNavigate } from "react-router-dom"

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

export default function PokemonCard({ pokemon, compact = false }) {
  const navigate = useNavigate()
  const image =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites?.front_default ||
    "/placeholder.png"

  const outerClass = compact ? "w-48 h-56" : "w-56 h-64"
  const imgClass = compact ? "w-28 h-28" : "w-36 h-36"

  return (
    <div
      className={`${outerClass} mirror-card cursor-pointer`}
      onClick={() => navigate(`/pokemon/${pokemon.name}`, { state: { pokemon } })}
    >
      <div className="mirror-inner rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 w-full h-full flex flex-col">
        <div className="flex flex-col items-center justify-center p-4">
          <div className="mirror-content flex flex-col items-center">
            <img src={image} alt={pokemon.name} className={`${imgClass} object-contain`} />
            <h3 className="capitalize font-bold text-lg mt-2">{pokemon.name}</h3>
            <div className="mb-4 flex gap-3 justify-center flex-wrap mt-4">
              {pokemon.types.map((t) => (
                <div key={t.type.name} className="rounded-full overflow-hidden">
                  <img src={typeIcons[t.type.name]} alt={t.type.name} className="w-15 h-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
