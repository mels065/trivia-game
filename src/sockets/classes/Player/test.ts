import { expect } from "chai";
import { mock, when } from "ts-mockito";

import PlayerClass from "./index";

describe("PlayerClass", () => {
    const displayName = "John Doe";
    let player: PlayerClass;
    beforeEach(() => {
        player = new PlayerClass(displayName);
    });

    it("has a public `displayName`", () => {
        expect(player.displayName).to.equal("John Doe");
    });

    it("has a public `ready` boolean property", () => {
        expect(player.ready).to.equal(false);
    });

    it("has methods for getting and setting `score` private property", () => {
        expect(player.getScore()).to.equal(0);

        player.incrementScore();
        expect(player.getScore()).to.equal(1);

        player.incrementScore();
        player.incrementScore();
        expect(player.getScore()).to.equal(3);
    });

    it.skip("sets `currentAnswer` with `selectAnswer` method", () => {
        // CODE
    });
});
