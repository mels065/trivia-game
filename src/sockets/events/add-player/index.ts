import { Socket } from "socket.io";

import GameSession from "../../classes/GameSession";

interface IAddPlayerEventPayload {
    name: string;
    sessionId: string;
}
const addPlayerEventCreator = (socket: Socket | any) => (
    (payload: IAddPlayerEventPayload) => {
        const { name, sessionId } = payload;
        const gs = GameSession.sessions[sessionId];
        const playerId = gs.addPlayer(name);
        socket.join(sessionId);
        socket.emit("sendPlayerId", { playerId });
        socket.in(sessionId).emit(
            "updatePlayerList",
            {
                playerList: Object.values(gs.players).map((player) => (
                    player.displayName
                )),
            },
        );
    }
);

export default addPlayerEventCreator;
