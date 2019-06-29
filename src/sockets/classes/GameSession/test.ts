import { expect } from "chai";
import * as shortid from "shortid";
import { mock, reset } from "ts-mockito";

import Player from "../Player";
import GameSession from "./index";

describe("GameSession class", () => {
    let gameSession: GameSession;
    let mockedPlayer: Player;

    beforeEach(() => {
        mockedPlayer = mock(Player);

        GameSession.sessions = {};
        gameSession = new GameSession();
    });

    afterEach(() => {
        reset(mockedPlayer);
    })

    it("has a static object of all game sessions", () => {
        expect(Object.keys(GameSession.sessions).length).to.equal(1);
    });

    it("can destroy itself and remove itself from static object", () => {
        gameSession.destroy();
        expect(Object.keys(GameSession.sessions).length).to.equal(0);
    });

    it("has an object of players that can join or leave, and deletes session if no players", () => {
        expect(Object.keys(gameSession.players).length).to.equal(0);

        gameSession.addPlayer(new Player("John Doe"));
        expect(Object.keys(gameSession.players).length).to.equal(1);

        gameSession.addPlayer(new Player("Jane Doe"));
        expect(Object.keys(gameSession.players).length).to.equal(2);

        gameSession.removePlayer(0);
        expect(Object.keys(gameSession.players).length).to.equal(1);
        expect(Object.keys(GameSession.sessions).length).to.equal(1);

        gameSession.removePlayer(1);
        expect(Object.keys(gameSession.players).length).to.equal(0);
        expect(Object.keys(GameSession.sessions).length).to.equal(0);
    });

    it.skip("has a question array that makes an API call to OpenTriviaDB to retrieve them", () => {
        // CODE
    });

    it.skip("has a questionIndex that increments for the next question", () => {
        // CODE
    });

    it.skip("has a mode that takes enum Mode to keep track of game mode", () => {
        // CODE
    });

    it.skip("has a correctAnswer that takes an Answer enum and determines the correct answer", () => {
        // CODE
    });

    it.skip("has a `isGameFinished` method that determines if the game is over", () => {
        // CODE
    });
});
