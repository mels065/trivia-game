import { assert } from "chai";
// import { capture, mock, reset, verify } from "ts-mockito";
import * as sinon from "sinon";
import { SinonMock } from "sinon";

import GameSession from "../../classes/GameSession";

import { Difficulty } from "../../../enums";

import createGameEventCreator from "./index";

describe("createGame socket event", () => {
    interface ISocketMock {
        emitCalledWith: any[];
        emit: (event: string, ...args: any) => void;
    }

    // let gameSessionMock: GameSession;
    let fetchQuestionsStub: sinon.SinonStub;
    let socketMock: ISocketMock;
    beforeEach(() => {
        for (const key of Object.keys(GameSession.sessions)) {
            delete GameSession.sessions[key];
        }
        // gameSessionMock = mock(GameSession);
        fetchQuestionsStub = sinon.stub(GameSession.prototype, "fetchQuestions");

        socketMock = {
            emitCalledWith: [],
            emit(event, ...args) {
                this.emitCalledWith.push([event, args]);
            },
        };
    });

    afterEach(() => {
        // gameSessionMock.restore();
        // reset(gameSessionMock);
        fetchQuestionsStub.restore();
    });

    it("creates a new game session, fetches questions, and calls emit event `joining`", async () => {
        await (
            createGameEventCreator(socketMock)
        )({ questionCount: 20, difficulty: Difficulty.Medium });

        assert.equal(
            Object.keys(GameSession.sessions).length,
            1,
            "Game session is created",
        );

        sinon.assert.calledWith(fetchQuestionsStub, 20, Difficulty.Medium);

        assert.deepEqual(
            socketMock.emitCalledWith,
            [
                [
                    "joining",
                    [{
                        sessionId: Object.keys(GameSession.sessions)[0],
                    }],
                ],
            ],
            "`joining` event is emitted",
        );
    });

    it.skip("throws an error if question count is too high", () => {
        // CODE
    });
});
