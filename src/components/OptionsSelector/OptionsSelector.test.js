import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent } from "@testing-library/react";

import { render } from "../../utils/test-utils";
import OptionsSelector from "./OptionsSelector";

describe("Options Selector Component Test", () => {
  const value = "1000";
  const options = [
    {
      code: "1000",
      name: "Black",
    },
    {
      code: "1001",
      name: "White",
    },
  ];

  let component = render();
  let mockHandleChange;

  beforeEach(() => {
    mockHandleChange = jest.fn();
    component = render(
      <OptionsSelector
        value={value}
        options={options}
        onChange={mockHandleChange}
      />
    );
  });

  test("render content", () => {
    expect(component.container).toBeInTheDocument();
  });

  test("render component with options", () => {
    const blackOption = component.getByText("Black");
    const whiteOption = component.getByText("White");
    expect(blackOption).toBeInTheDocument();
    expect(whiteOption).toBeInTheDocument();
  });

  test("first option must be selected by default", () => {
    const blackOption = component.getByDisplayValue("1000");
    expect(blackOption).toBeChecked();
  });

  test("handle onclick change option", () => {
    const whiteOption = component.getByDisplayValue("1001");
    fireEvent.click(whiteOption);
    expect(mockHandleChange).toHaveBeenCalled();
  });
});
