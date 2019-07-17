import { assert } from "chai";
import * as sinon from "sinon";
import { SinonMock } from "sinon";

import GameSession from "../../classes/GameSession";

import { Difficulty, SocketEvents } from "../../../enums";
import socketMock from "../test-utils/socket-mock";

import createGameEventCreator from "./index";

describe("createGame socket event", () => {
    interface ISocketMock {
        emitCalledWith: any[];
        emit: (event: string, ...args: any) => void;
    }

    let fetchQuestionsStub: sinon.SinonStub;
    beforeEach(() => {
        for (const key of Object.keys(GameSession.sessions)) {
            delete GameSession.sessions[key];
        }
        fetchQuestionsStub = sinon.stub(GameSession.prototype, "fetchQuestions");
    });

    afterEach(() => {
        fetchQuestionsStub.restore();
        socketMock.reset();
    });

    it("fetches questions", async () => {
        await (
            createGameEventCreator(socketMock)
        )({ questionCount: 20, difficulty: Difficulty.Medium });

        sinon.assert.calledWith(fetchQuestionsStub, 20, Difficulty.Medium);
    });

    it("calls emit event `joining`", async () => {
        await (
            createGameEventCreator(socketMock)
        )({ questionCount: 20, difficulty: Difficulty.Medium });

        assert.deepEqual(
            socketMock.emitCalledWith,
            [
                [
                    SocketEvents.JOINING,
                    [{
                        sessionId: Object.keys(GameSession.sessions)[0],
                    }],
                ],
            ],
            "`joining` event is emitted",
        );
    })
});
