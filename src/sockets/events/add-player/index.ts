import { Socket } from "socket.io";

import { SocketEvents } from "../../../enums";

import GameSession from "../../classes/GameSession";

interface IAddPlayerEventPayload {
    name: string;
    sessionId: string;
}
const addPlayerEventCreator = (socket: Socket | any) => (
    (payload: IAddPlayerEventPayload) => {
        const { name, sessionId } = payload;
        const gs = GameSession.sessions[sessionId];
        gs.addPlayer(socket.id, name);
        socket.join(sessionId);
        socket.in(sessionId).emit(
            SocketEvents.UPDATE_PLAYER_LIST,
            {
                playerList: Object.values(gs.players).map((player) => (
                    player.displayName
                )),
            },
        );
    }
);

export default addPlayerEventCreator;
