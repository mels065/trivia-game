import { Socket } from "socket.io";

import { Difficulty } from "../../../enums";

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
        socket.emit("joining", { sessionId: gs.id });
    }
);

export default createGameEventCreator;
