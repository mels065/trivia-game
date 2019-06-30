import axios, { AxiosStatic } from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";
import * as shortid from "shortid";
import { mock, reset, verify, when } from "ts-mockito";

import Player from "../Player";
import GameSession from "./index";

import { Difficulty } from "../../../enums";

describe("GameSession class", () => {
    let gameSession: GameSession;
    let mockedPlayer: Player;
    let mockedAxios: MockAdapter;

    beforeEach(() => {
        mockedPlayer = mock(Player);
        mockedAxios = new MockAdapter(axios);

        GameSession.sessions = {};
        gameSession = new GameSession();
    });

    afterEach(() => {
        reset(mockedPlayer);
        mockedAxios.restore();
    });

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

    it("has a question array that makes an API call to OpenTriviaDB to retrieve them", async () => {
        expect(gameSession.questions).to.have.lengthOf(0);

        const response = {
            results: [
                {
                    correct_answer: "66",
                    incorrect_answers: ["67", "34", "11"],
                    question: "In a complete graph G, which has 12 vertices, how many edges are there?",
                },
            ]
        };
        mockedAxios.onGet(
            "https://opentdb.com/api.php?amount=20&difficulty=medium&type=multiple",
        )
            .reply(
                200,
                response,
            )
        await gameSession.fetchQuestions(20, Difficulty.Medium);

        const { answers, correctAnswer, question } = gameSession.questions[0];
        expect(question).to.equal(
            "In a complete graph G, which has 12 vertices, how many edges are there?",
        );

        const answerValues = Object.values(answers);
        expect(answerValues).to.include("66");
        expect(answerValues).to.include("67");
        expect(answerValues).to.include("34");
        expect(answerValues).to.include("11");

        expect(answers[correctAnswer]).to.equal("66");
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
