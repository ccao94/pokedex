import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!q.trim()) return
    onSearch(q.trim())
  }

  return (
    <form onSubmit={submit} className="flex gap-2 my-4">
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search Pokémon..."
        className="flex-1 p-2 rounded border bg-white text-black placeholder-gray-500 dark:bg-gray-800 dark:text-white"
      />
      <button
        type="submit"
        className="bg-red-600 px-4 py-2 rounded font-bold hover:bg-red-700 text-white"
      >
        🔍
      </button>
    </form>
  )
}
