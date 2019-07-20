import GameSession from "../../classes/GameSession";

import { SocketEvents } from "../../../enums";

// Payload: sessionId (string)
interface IReadyEventPayload {
    sessionId: string;
}
const readyEventCreator = (socket: SocketIO.Socket | any) => (
    (payload: IReadyEventPayload) => {
        const { sessionId } = payload;
        const gs = GameSession.sessions[sessionId];
        gs.players[socket.id].ready = true;

        if (gs.playersReady()) {
            socket.in(sessionId).emit(SocketEvents.START_GAME);
            socket.in(sessionId).emit(SocketEvents.NEXT_TURN);
        }
    }
);

export default readyEventCreator;
