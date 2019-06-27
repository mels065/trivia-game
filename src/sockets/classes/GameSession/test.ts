import { expect } from "chai";

import GameSession from "./index";

describe("GameSession class", () => {
    let gameSession;
    beforeEach(() => {
        gameSession = new GameSession();
    });

    it("has a static array of all game sessions", () => {
        expect(GameSession.sessions).to.deep.equal({});
    });

    it("removes when destroyed", () => {
        
    });

    it("has an array of players that can join or leave", () => {
        
    });

    it("has a question array that makes an API call to OpenTriviaDB to retrieve them", () => {
        // CODE
    });

    it("has a questionIndex that increments for the next question", () => {
        // CODE
    });

    it("has a mode that takes enum Mode to keep track of game mode", () => {
        // CODE
    });

    it("has a correctAnswer that takes an Answer enum and determines the correct answer", () => {
        // CODE
    });

    it("has a `isGameFinished` method that determines if the game is over", () => {
        // CODE
    });
});
