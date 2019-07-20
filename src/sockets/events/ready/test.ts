import { assert } from "chai";
import * as sinon from "sinon";

import GameSession from "../../classes/GameSession";

import socketMock from "../test-utils/socket-mock";

import { SocketEvents } from "../../../enums";

import readyEventCreator from "./index";

describe("ready socket event", () => {
    let gs: GameSession;
    let nextQuestionStub: sinon.SinonStub;
    beforeEach(() => {
        gs = new GameSession();
        gs.addPlayer(socketMock.id, "John Doe");
        gs.addPlayer("xyz", "Jane Doe");
        nextQuestionStub = sinon.stub(gs, "nextQuestion");
        nextQuestionStub.returns("Question data");
    });

    afterEach(() => {
        gs.destroy();
    });

    it("sets a player's ready attribute to true", () => {
        (
            readyEventCreator(socketMock)
        )({ sessionId: gs.id });
        assert.equal(
            gs.players[socketMock.id].ready,
            true,
        );
        nextQuestionStub.restore();
    });

    it("emits `startGame` and `nextQuestion` if all players are ready", () => {
        (
            readyEventCreator(socketMock)
        )({ sessionId: gs.id });

        assert.equal(
            socketMock.inRoomMock.room,
            "",
            "No emission in any room if not all players are ready",
        );
        assert.deepEqual(
            socketMock.inRoomMock.emitCalledWith,
            [],
            "No emission if no players are ready",
        );

        gs.players.xyz.ready = true;

        (
            readyEventCreator(socketMock)
        )({ sessionId: gs.id });

        assert.equal(
            socketMock.inRoomMock.room,
            gs.id,
            "Emit called in session room",
        );
        assert.deepEqual(
            socketMock.inRoomMock.emitCalledWith[0],
            [
                SocketEvents.START_GAME,
                [],
            ],
            "startGame emitted",
        );
        assert.deepEqual(
            socketMock.inRoomMock.emitCalledWith[1],
            [
                SocketEvents.NEXT_TURN,
                [],
            ],
            "nextTurn emitted",
        );
    });
})
