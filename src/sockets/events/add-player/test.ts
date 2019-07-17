import { assert } from "chai";
import * as sinon from "sinon";

import GameSession from "../../classes/GameSession";

import socketMock from "../test-utils/socket-mock";

import { SocketEvents } from "../../../enums";

import addPlayerEventCreator from "./index";

describe("addPlayer socket event creator", () => {
    const name = "John Doe";

    let gs: GameSession;
    let addPlayerStub: sinon.SinonStub;
    beforeEach(() => {
        gs = new GameSession();
        addPlayerStub = sinon.stub(GameSession.prototype, "addPlayer");
        addPlayerStub.callsFake(function (id, displayName) {
            this.players[id] = { id, displayName };
        });
        (
            addPlayerEventCreator(socketMock)
        )({
            name,
            sessionId: Object.keys(GameSession.sessions)[0],
        });
    });

    afterEach(() => {
        addPlayerStub.restore();
        socketMock.reset();
        gs = null;
        for (const key of Object.keys(GameSession.sessions)) {
            GameSession.sessions[key].destroy();
        }
    });

    it("adds a new player to game session", () => {
        sinon.assert.calledWith(addPlayerStub, socketMock.id, name);
    });

    it("adds socket to the game session room", () => {
        assert.deepEqual(
            socketMock.joinCalledWith,
            [Object.keys(GameSession.sessions)[0]],
        );
    });

    it("emits a global event `updatePlayerList` in session room", () => {
        assert.equal(
            socketMock.inRoomMock.room,
            Object.keys(GameSession.sessions)[0],
        );
        assert.deepEqual(
            socketMock.inRoomMock.emitCalledWith,
            [
                [
                    SocketEvents.UPDATE_PLAYER_LIST,
                    [{
                        playerList: Object.values(gs.players).map((player) => (
                            player.displayName
                        )),
                    }],
                ],
            ],
        );
    });
});
