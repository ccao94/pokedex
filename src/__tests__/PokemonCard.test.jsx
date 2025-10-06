import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";

const fakePokemon = {
  name: "pikachu",
  sprites: { other: { "official-artwork": { front_default: "pikachu.png" } } },
  types: [{ type: { name: "electric" } }],
};

test("displays the pokemon name", () => {
  render(
    <MemoryRouter>
      <PokemonCard pokemon={fakePokemon} />
    </MemoryRouter>
  );
  expect(screen.getByText("pikachu")).toBeInTheDocument();
});
