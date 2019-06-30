import axios from "axios";
import shortid = require("shortid");
import Player from "../Player";

import { Answer, Difficulty } from "../../../enums";
import { IQuestionData, IQuestionJSON } from "../../../interface";

export default class GameSession {
    public static sessions: {
        [key: string]: GameSession,
    } = {};

    public readonly id: string;
    public readonly players: {
        [key: number]: Player,
    };
    public readonly questions: IQuestionData[];

    // Keeps track of the number of players that have joined since the session
    // was created
    private totalPlayersJoined: number;

    constructor() {
        this.id = shortid();
        GameSession.sessions[this.id] = this;

        this.players = [];
        this.questions = [];

        this.totalPlayersJoined = 0;
    }

    public async fetchQuestions(questionCount: number, difficulty: Difficulty): Promise<void> {
        const { data: { results } }: IQuestionJSON = (await axios.get(
            `https://opentdb.com/api.php?amount=${questionCount}&difficulty=${difficulty}&type=multiple`,
        ));

        this.questions.push(...results.map((data) => (
            {
                answers: {
                    [Answer.A]: data.correct_answer,
                    [Answer.B]: data.incorrect_answers[0],
                    [Answer.C]: data.incorrect_answers[1],
                    [Answer.D]: data.incorrect_answers[2],
                },
                correctAnswer: Answer.D,
                question: data.question,
            }
        )));
    }

    public addPlayer(player: Player): void {
        // Remember, appended `++` increments after assignment
        this.players[this.totalPlayersJoined++] = player;
    }

    public removePlayer(id: number) {
        delete this.players[id];
        if (Object.keys(this.players).length === 0) {
            this.destroy();
        }
    }

    public destroy(): void {
        delete GameSession.sessions[this.id];
    }
}
