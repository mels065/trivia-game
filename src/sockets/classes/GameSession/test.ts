import { expect } from "chai";
import { rewiremock } from "../../../../rewiremock";

const shortIdStub = () => "test-id";
rewiremock("shortid").with(shortIdStub);
rewiremock(() => require("shortid")).with(shortIdStub);
import GameSession from "./index";

describe("GameSession class", () => {
    let gameSession: GameSession;
    beforeEach(() => {
        GameSession.sessions = {};
        gameSession = new GameSession();
    });

    it("has a static object of all game sessions", () => {
        // expect(Object.keys(GameSession.sessions).length).to.equal(1);
        expect(GameSession.sessions).to.deep.equal({
            "test-id": gameSession,
        });
    });

    it("can destroy itself and remove itself from static object", () => {
        gameSession.destroy();
        expect(Object.keys(GameSession.sessions).length).to.equal(1);
    });

    it.skip("has an object of players that can join or leave", () => {
        // expect(Object.keys(gameSession.players)).to.equal(0);

        // gameSession.addPlayer();
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
