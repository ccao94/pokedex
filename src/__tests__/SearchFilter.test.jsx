import { render, screen, fireEvent } from "@testing-library/react";
import CollectionPage from "../pages/CollectionPage";

test("can type in the search input", () => {
  render(<CollectionPage />);
  const input = screen.getByPlaceholderText(/Search by name/i);
  fireEvent.change(input, { target: { value: "pikachu" } });
  expect(input.value).toBe("pikachu");
});
