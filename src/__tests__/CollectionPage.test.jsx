import { render, screen } from "@testing-library/react";
import CollectionPage from "../pages/CollectionPage";

test("renders Collection title", () => {
  render(<CollectionPage />);
  expect(screen.getByText(/Collection/i)).toBeInTheDocument();
});
