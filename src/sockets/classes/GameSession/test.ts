import axios, { AxiosStatic } from "axios";
import MockAdapter from "axios-mock-adapter";
import { assert, expect } from "chai";
import * as shortid from "shortid";
import { mock, reset, verify, when } from "ts-mockito";

import Player from "../Player";
import GameSession from "./index";

import { Difficulty, GameMode } from "../../../enums";

describe("GameSession class", () => {
    let gameSession: GameSession;
    let mockedPlayer: Player;
    let mockedAxios: MockAdapter;

    beforeEach(() => {
        mockedPlayer = mock(Player);
        mockedAxios = new MockAdapter(axios);

        GameSession.sessions = {};
        gameSession = new GameSession();

        const response = {
            results: [
                {
                    correct_answer: "66",
                    incorrect_answers: ["67", "34", "11"],
                    question: "In a complete graph G, which has 12 vertices, how many edges are there?",
                },
                {
                    correct_answer: "July 2, 1776",
                    incorrect_answers: ["May 4, 1776", "June 4, 1776", "July 4, 1776"],
                    question: "When was the Declaration of Independence approved by the Second Continental Congress?",
                },
            ],
        };
        mockedAxios.onGet(
            "https://opentdb.com/api.php?amount=20&difficulty=medium&type=multiple",
        )
            .reply(
                200,
                response,
            );
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

        gameSession.addPlayer("abcde", "John Doe");
        expect(Object.keys(gameSession.players).length).to.equal(1);

        gameSession.addPlayer("xyz", "Jane Doe");
        expect(Object.keys(gameSession.players).length).to.equal(2);

        gameSession.removePlayer("abcde");
        expect(Object.keys(gameSession.players).length).to.equal(1);
        expect(Object.keys(GameSession.sessions).length).to.equal(1);

        gameSession.removePlayer("xyz");
        expect(Object.keys(gameSession.players).length).to.equal(0);
        expect(Object.keys(GameSession.sessions).length).to.equal(0);
    });

    it("has a question array that makes an API call to OpenTriviaDB to retrieve them", async () => {
        expect(gameSession.questions).to.have.lengthOf(0);

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

    it("can increment to next question until all questions are gone", async () => {
        await gameSession.fetchQuestions(20, Difficulty.Medium);

        assert.equal(
            gameSession.nextQuestion().question,
            "In a complete graph G, which has 12 vertices, how many edges are there?",
            "Gets first question",
        );

        assert.equal(
            gameSession.nextQuestion().question,
            "When was the Declaration of Independence approved by the Second Continental Congress?",
            "Gets second question",
        );

        assert.isNull(gameSession.nextQuestion(), "No more questions, so return null");
    });

    it("has a mode that takes enum Mode to keep track of game mode", () => {
        assert.equal(
            gameSession.getMode(),
            GameMode.LOBBY,
            "Defaults to `LOBBY`",
        );

        gameSession.setMode(GameMode.PLAYING);
        assert.equal(
            gameSession.getMode(),
            GameMode.PLAYING,
            "Set to PLAYING"
        );
    });

    it("has a `isGameFinished` method that determines if the game is over", async () => {
        await gameSession.fetchQuestions(20, Difficulty.Medium);

        assert.isFalse(gameSession.isGameFinished(), "Game is not finished");

        gameSession.nextQuestion();
        gameSession.nextQuestion();
        assert.isTrue(gameSession.isGameFinished(), "Game is finished");
    });
});
