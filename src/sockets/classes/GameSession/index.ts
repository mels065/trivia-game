import axios from "axios";
import * as _ from "lodash";
import * as shortid from "shortid";
import { Socket } from "socket.io";
import Player from "../Player";

import { Answer, Difficulty, GameMode, SocketEvents } from "../../../enums";
import { IQuestionData, IQuestionOrder, IQuestionJSON } from "../../../interface";

export default class GameSession {
    public static sessions: {
        [key: string]: GameSession,
    } = {};

    public readonly id: string;
    public readonly players: {
        [key: string]: Player,
    };
    public readonly questions: IQuestionData[];

    // Keeps track of the number of players that have joined since the session
    // was created
    private mode: GameMode;
    private totalPlayersJoined: number;
    private questionIndex: number;
    private killTimer: NodeJS.Timeout;

    constructor() {
        this.id = shortid();
        GameSession.sessions[this.id] = this;

        this.players = {};
        this.questions = [];

        this.mode = GameMode.LOBBY;
        this.totalPlayersJoined = 0;
        this.questionIndex = 0;

        this.killTimer = setInterval(() => {
            if (Object.keys(this.players).length === 0) {
                this.destroy();
            }
        }, 1000 * 60 * 60);
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

    public addPlayer(id: string, name: string): void {
        // Remember, appended `++` increments after assignment
        const player = new Player(id, name);
        this.players[id] = player;
    }

    public removePlayer(id: string) {
        delete this.players[id];
        if (Object.keys(this.players).length === 0) {
            this.destroy();
        }
    }

    public getMode(): GameMode {
        return this.mode;
    }

    public setMode(newMode: GameMode): void {
        this.mode = newMode;
    }

    public playersReady(): boolean {
        return Object.values(this.players).every((player) => player.ready);
    }

    public nextQuestion(): (IQuestionData | null) {
        if (!this.isGameFinished()) {
            return this.questions[this.questionIndex++];
        }

        return null;
    }

    public isGameFinished(): boolean {
        return this.questionIndex >= this.questions.length;
    }

    public turn(socket: Socket | any): void {
        // let timeLeft = 20; // in seconds
        // let countdownTimer: NodeJS.Timeout;
        // if (!this.isGameFinished()) {
        //     socket.in(this.id).emit(
        //         SocketEvents.NEXT_QUESTION,
        //         { questionData: this.nextQuestion() },
        //     );
        //     countdownTimer = setInterval(() => {
        //         if (timeLeft > 0) {
        //             socket.in(this.id).emit(
        //                 SocketEvents.UPDATE_TIMER,
        //                 { timeLeft },
        //             );
        //             timeLeft--;
        //         } else {
        //             clearInterval(countdownTimer);
        //             socket.in(this.id).emit(
        //                 SocketEvents.SHOW_ANSWER,
        //                 this.questions[this.questionIndex].correctAnswer,
        //             );
        //             setTimeout(this.turn.bind(this, socket), 5000);
        //         }
        //     }, 1000);
        // } else {
        //     socket.in(this.id).emit(
        //         SocketEvents.RESULTS,
        //         {
        //             results: Object.values(this.players).map(
        //                 (player) => (
        //                     {
        //                         displayName: player.displayName,
        //                         score: player.getScore(),
        //                     }
        //                 )
        //             ).sort(
        //                 (player1, player2) => player1.score - player2.score,
        //             ),
        //         },
        //     );
        // }
    }

    public destroy(): void {
        clearInterval(this.killTimer);
        delete GameSession.sessions[this.id];
    }
}
