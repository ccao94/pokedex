import React from 'react'
import PokemonCard from './PokemonCard'

export default function PokemonList({ pokemons }) {
  if (!pokemons || pokemons.length === 0) return <p>No Pokémon found.</p>

  return (
    <div className="py-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-x-auto scrollbar-red">
      {pokemons.map(p => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  )
}
