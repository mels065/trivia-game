import { assert } from "chai";
import { mock, reset } from "ts-mockito";

import GameSession from "../../classes/GameSession";
import Player from "../../classes/Player";

import { Difficulty } from "../../../enums";

import createGameEvent from "./index";

describe("createGame socket event", () => {
    let gameSessionMock;
    let playerMock;
    let serverState: {
        [key: string]: GameSession,
    };
    let socketMock: {
        emitCalledWith: any[],
        emit: (event: string, ...args: any) => void,
    };
    beforeEach(() => {
        gameSessionMock = mock(GameSession);
        playerMock = mock(Player);

        socketMock = {
            emitCalledWith: [],
            emit(event, ...args) {
                this.emitCalledWith.push([event, args]);
            },
        };
    });

    it.skip("creates a new game session, adds player, and calls emit event `joining`", () => {
        // CODE
    });

    it.skip("throws an error if question count is too high", () => {
        // CODE
    });
});
