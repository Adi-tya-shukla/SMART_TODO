import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { BrowserRouter } from "react-router-dom";
import { TodoProvider } from "../../Context/TodoContext";
const renderWithProviders = (ui) => {
  return render(
    <TodoProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </TodoProvider>
  );
};

describe("Dashboard Component", () => {
  test("renders dashboard heading", () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText(/task dashboard/i)).toBeInTheDocument();
  });


  test("toggles tag selection", () => {
    renderWithProviders(<Dashboard />);
    const tagButton = screen.getByText("Work");

    fireEvent.click(tagButton);
    expect(tagButton).toHaveClass("bg-blue-500");

    fireEvent.click(tagButton);
    expect(tagButton).not.toHaveClass("bg-blue-500");
  });
});
