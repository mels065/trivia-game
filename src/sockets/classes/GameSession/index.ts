import axios from "axios";
import * as _ from "lodash";
import * as shortid from "shortid";
import Player from "../Player";

import { Answer, Difficulty } from "../../../enums";
import { IQuestionData, IQuestionOrder, IQuestionJSON } from "../../../interface";

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
    private questionIndex: number;

    constructor() {
        this.id = shortid();
        GameSession.sessions[this.id] = this;

        this.players = [];
        this.questions = [];

        this.totalPlayersJoined = 0;
        this.questionIndex = 0;
    }

    public async fetchQuestions(questionCount: number, difficulty: Difficulty): Promise<void> {
        const { data: { results } }: IQuestionJSON = (await axios.get(
            `https://opentdb.com/api.php?amount=${questionCount}&difficulty=${difficulty}&type=multiple`,
        ));

        this.questions.push(...results.map((data) => {
            const { correct_answer, incorrect_answers, question } = data;
            const answerStrings: string[] = _.shuffle(
                [correct_answer, ...incorrect_answers]
            );
            const correctAnswer: Answer = [
                Answer.A,
                Answer.B,
                Answer.C,
                Answer.D,
            ][answerStrings.indexOf(correct_answer)]

            const answers: IQuestionOrder = {
                [Answer.A]: answerStrings[0],
                [Answer.B]: answerStrings[1],
                [Answer.C]: answerStrings[2],
                [Answer.D]: answerStrings[3],
            }

            return {
                answers,
                correctAnswer,
                question,
            }
        }));
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

    public nextQuestion(): (IQuestionData | null) {
        if (this.questionIndex < this.questions.length) {
            return this.questions[this.questionIndex++];
        }

        return null;
    }

    public destroy(): void {
        delete GameSession.sessions[this.id];
    }
}
