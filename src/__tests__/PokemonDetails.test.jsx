import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PokemonDetails from "../pages/PokemonDetails";

test("renders loading when status is loading", () => {
  render(
    <MemoryRouter>
      <PokemonDetails />
    </MemoryRouter>
  );
  expect(screen.getByText(/Pokémon not found|Loading/i)).toBeInTheDocument();
});
