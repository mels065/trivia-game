import { render } from "@testing-library/react";
import * as React from "react";

import "jest-dom/extend-expect";

import App from "./index";

describe("<App />", (): void => {
  it("renders", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("app")).toBeInTheDocument();
  });
});
