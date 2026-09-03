// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, describe, expect, it } from "vitest";

import App from "./App";
import { categories } from "./ui/lib/data";

afterEach(() => cleanup());

describe("menu data", () => {
  it("opens with Margherita and distinct per-serving nutrition facts", () => {
    const margherita = categories[0].items[0];
    const nutritionValues = categories.flatMap((category) =>
      category.items.map((item) => Object.values(item.nutrition).join("-")),
    );

    expect(margherita.name).toBe("Margherita");
    expect(margherita.nutrition).toEqual({
      calories: 720,
      protein: 28,
      carbohydrates: 82,
      fat: 29,
    });
    expect(new Set(nutritionValues).size).toBe(18);
  });
});

describe("Menu Browser", () => {
  it("renders Margherita and its nutrition facts initially", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Margherita" }),
    ).toBeInTheDocument();
    expect(screen.getByText("720 kcal")).toBeInTheDocument();
    expect(screen.getByText("28g")).toBeInTheDocument();
    expect(screen.getByText("82g")).toBeInTheDocument();
    expect(screen.getByText("29g")).toBeInTheDocument();
    expect(screen.getAllByRole("progressbar")).toHaveLength(3);
  });

  it("selects a Category and advances through its Story Sequence", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /Pasta/ }));
    expect(
      screen.getByRole("heading", { name: "Cacio e Pepe" }),
    ).toBeInTheDocument();
    expect(screen.getByText("640 kcal")).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: "Next story" })[0]);
    expect(
      screen.getByRole("heading", { name: "Tagliatelle al Ragù" }),
    ).toBeInTheDocument();
  });

  it("updates Nutrition Facts when Story changes", () => {
    render(<App />);

    fireEvent.click(screen.getAllByRole("button", { name: "Next story" })[1]);

    expect(
      screen.getByRole("heading", { name: "Piccante" }),
    ).toBeInTheDocument();
    expect(screen.getByText("880 kcal")).toBeInTheDocument();
    expect(screen.getByText("37g")).toBeInTheDocument();
    expect(screen.getByText("79g")).toBeInTheDocument();
    expect(screen.getByText("45g")).toBeInTheDocument();
  });

  it("navigates to the next and previous Category at Story Sequence boundaries", () => {
    render(<App />);

    const nextStory = screen.getAllByRole("button", { name: "Next story" })[1];
    fireEvent.click(nextStory);
    fireEvent.click(nextStory);
    expect(
      screen.getByRole("heading", { name: "Ortolana" }),
    ).toBeInTheDocument();

    fireEvent.click(nextStory);
    expect(
      screen.getByRole("heading", { name: "Focaccia al Rosmarino" }),
    ).toBeInTheDocument();

    const previousStory = screen.getAllByRole("button", {
      name: "Previous story",
    })[1];
    fireEvent.click(previousStory);
    expect(
      screen.getByRole("heading", { name: "Ortolana" }),
    ).toBeInTheDocument();
  });

  it("navigates Stories with arrow keys", () => {
    render(<App />);
    expect(
      screen.getByRole("region", { name: /story 1 of/ }),
    ).not.toHaveAttribute("tabindex");

    const nextStory = screen.getAllByRole("button", { name: "Next story" })[1];
    const previousStory = screen.getAllByRole("button", {
      name: "Previous story",
    })[1];

    fireEvent.keyDown(nextStory, { key: "ArrowRight" });
    expect(
      screen.getByRole("heading", { name: "Piccante" }),
    ).toBeInTheDocument();

    fireEvent.keyDown(previousStory, { key: "ArrowLeft" });
    expect(
      screen.getByRole("heading", { name: "Margherita" }),
    ).toBeInTheDocument();
  });

  it("keeps selected progress filled without autoplay", () => {
    render(<App />);

    fireEvent.click(screen.getAllByRole("button", { name: "Next story" })[1]);
    expect(
      screen.getByRole("heading", { name: "Piccante" }),
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("progressbar")
        .map((bar) => bar.getAttribute("aria-valuenow")),
    ).toEqual(["100", "100", "0"]);

    expect(
      screen.queryByRole("button", { name: /playback/i }),
    ).not.toBeInTheDocument();
  });

  it("moves between categories at story boundaries and disables global edge controls", () => {
    render(<App />);

    const previousButtons = screen.getAllByRole("button", {
      name: "Previous story",
    });
    expect(previousButtons[0]).toBeDisabled();
    expect(previousButtons[1]).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: /Drinks/ }));
    fireEvent.click(screen.getAllByRole("button", { name: "Next story" })[1]);
    fireEvent.click(screen.getAllByRole("button", { name: "Next story" })[1]);
    expect(
      screen.getByRole("heading", { name: "Espresso" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "Next story" })[1],
    ).toBeDisabled();

    fireEvent.click(screen.getAllByRole("button", { name: "Next story" })[0]);
    expect(
      screen.getByRole("heading", { name: "Espresso" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Pizza/ }));
    fireEvent.click(screen.getAllByRole("button", { name: "Next story" })[1]);
    fireEvent.click(screen.getAllByRole("button", { name: "Next story" })[1]);
    expect(
      screen.getByRole("heading", { name: "Ortolana" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Drinks/ }));
    fireEvent.click(screen.getAllByRole("button", { name: "Next story" })[1]);
    fireEvent.click(screen.getAllByRole("button", { name: "Next story" })[1]);
    expect(
      screen.getByRole("heading", { name: "Espresso" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "Next story" })[0],
    ).toBeDisabled();
    expect(
      screen.getAllByRole("button", { name: "Next story" })[1],
    ).toBeDisabled();
  });
});
