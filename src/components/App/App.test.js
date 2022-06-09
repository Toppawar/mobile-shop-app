import React from "react";
import { render } from "../../utils/test-utils";
import App from "./App";

test("renders App with Plexus logo svg", () => {
  const { container } = render(<App />);
  const svg = container.querySelector("svg");
  expect(svg).toBeDefined();
});
