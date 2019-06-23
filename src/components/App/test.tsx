import { expect } from "chai";
import { render } from "enzyme";
import * as React from "react";

import App from "./index";

describe("<App />", (): void => {
  it("renders", () => {
    const wrapper = render(<App />);
    expect(wrapper.attr("id")).to.equal("App");
  });
});
