import React from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import "./navbar.css"

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="relative flex items-center justify-between px-12 py-4 bg-gradient-to-r from-red-600 via-pink-600 to-red-500 text-white font-pokemon rounded-b-2xl shadow-lg">
      <Link
        to="/"
        className="text-4xl font-bold text-yellow-400 drop-shadow-[4px_4px_0_#1e40af] transition-transform duration-300 hover:scale-110 hover:text-yellow-300"
      >
        Pokedex
      </Link>

      <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-8">
        {location.pathname !== "/" && (
          <NavLink to="/" end className="nav-link text-yellow-400 drop-shadow-[2px_2px_0_#1e40af] text-lg hover:scale-110 transition-transform duration-300">
            Home
          </NavLink>
        )}
        <NavLink to="/collection" className="nav-link text-yellow-400 drop-shadow-[2px_2px_0_#1e40af] text-lg hover:scale-110 transition-transform duration-300">
          Collection
        </NavLink>
        <NavLink to="/compare" className="nav-link text-yellow-400 drop-shadow-[2px_2px_0_#1e40af] text-lg hover:scale-110 transition-transform duration-300">
          Compare
        </NavLink>
      </div>
    </nav>
  )
}
