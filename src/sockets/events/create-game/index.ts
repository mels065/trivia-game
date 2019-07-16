import { Socket } from "socket.io";

import { Difficulty, SocketEvents } from "../../../enums";

import GameSession from "../../classes/GameSession";

interface ICreateGameEventPayload {
    questionCount: number;
    difficulty: Difficulty;
}
const createGameEventCreator = (socket: Socket | any) => (
    async (payload: ICreateGameEventPayload): Promise<void> => {
        const { questionCount, difficulty } = payload;
        const gs = new GameSession();
        await gs.fetchQuestions(questionCount, difficulty);
        socket.emit(SocketEvents.JOINING, { sessionId: gs.id });
    }
);

export default createGameEventCreator;
