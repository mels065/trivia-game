import { Socket } from "socket.io";

import { SocketEvents } from "../../../enums";
import GameSession from "../../classes/GameSession";

interface IChangeNamePayload {
    newName: string;
    sessionId: string;
}
const changeNameEventCreator = (socket: Socket | any) => (
    (payload: IChangeNamePayload) => {
        const { newName, sessionId } = payload;
        GameSession.sessions[sessionId].players[
            socket.id
        ].displayName = newName;

        socket.in(sessionId).emit(
            SocketEvents.UPDATE_NAME,
            {
                newName,
                playerId: socket.id,
            },
        );
    }
);

export default changeNameEventCreator;
