import { expect } from "chai";
import { mock, when } from "ts-mockito";

import { Answer } from "../../../enums";

import Player from "./index";

describe("PlayerClass", () => {
    const id = 0;
    const displayName = "John Doe";
    let player: Player;
    beforeEach(() => {
        player = new Player(id, displayName);
    });

    it("has a public `displayName`", () => {
        expect(player.displayName).to.equal("John Doe");
        player.displayName = "Jane Doe";
        expect(player.displayName).to.equal("Jane Doe");
    });

    it("has a public `ready` boolean property", () => {
        expect(player.ready).to.equal(false);
        player.ready = true;
        expect(player.ready).to.equal(true);
    });

    it("has methods for getting and setting `score` private property", () => {
        expect(player.getScore()).to.equal(0);

        player.incrementScore();
        expect(player.getScore()).to.equal(1);

        player.incrementScore();
        player.incrementScore();
        expect(player.getScore()).to.equal(3);
    });

    it("has `currentAnswer` property that can be either null or the enum Answer", () => {
        expect(player.currentAnswer).to.equal(null);

        player.currentAnswer = Answer.B;
        expect(player.currentAnswer).to.equal(Answer.B);
    });

    it("has a readonly `index` assigned at beginning", () => {
        expect(player.id).to.equal(id);
    });
});
