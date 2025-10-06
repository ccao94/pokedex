import { render, screen } from "@testing-library/react";
import Loading from "../components/Loading";

test("renders loading spinner", () => {
  render(<Loading />);
  expect(screen.getByRole("status")).toBeInTheDocument();
});
