import { assert } from "chai";

import { SocketEvents } from "../../../enums";

import socketMock from "../test-utils/socket-mock";

import GameSession from "../../classes/GameSession";
import Player from "../../classes/Player";

import changeNameEventCreator from "./index";
import { Socket } from "dgram";


describe("changeName socket event", () => {
    let gs: GameSession;
    beforeEach(() => {
        gs = new GameSession();
        gs.players[socketMock.id] = new Player(socketMock.id, "John Doe");
        (
            changeNameEventCreator(socketMock)
        )({
            newName: "Jane Doe",
            sessionId: gs.id,
        });
    });

    afterEach(() => {
        for (const session of Object.values(GameSession.sessions)) {
            session.destroy();
        }
        socketMock.reset();
    })

    it("changes the name of the player and emit `updateName`", () => {
        const { displayName } = gs.players[socketMock.id];
        assert.equal(
            displayName,
            "Jane Doe",
            "Name changed",
        );
        assert.equal(
            socketMock.inRoomMock.room,
            gs.id,
            "Emitted to correct room",
        );
        assert.deepEqual(
            socketMock.inRoomMock.emitCalledWith[0],
            [
                SocketEvents.UPDATE_NAME,
                [{
                    newName: "Jane Doe",
                    playerId: socketMock.id,
                }]
            ]
        );
    });
});
