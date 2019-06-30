import { Answer } from "./enums";

interface IQuestionJSONResult {
    correct_answer: string;
    incorrect_answers: string;
    question: string;
}

export interface IQuestionJSON {
    data: {
        results: IQuestionJSONResult[];
    };
}

export interface IQuestionData {
    answers: {
        [Answer.A]: string,
        [Answer.B]: string,
        [Answer.C]: string,
        [Answer.D]: string,
    };
    correctAnswer: Answer;
    question: string;
}
