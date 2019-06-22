import { expect } from "chai";

import { createIo } from "./index";

describe("sockets", () => {
  it("should be a function", () => {
    expect(typeof createIo).to.equal("function");
  });
});
