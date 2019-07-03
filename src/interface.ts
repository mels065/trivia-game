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

export interface IQuestionOrder {
    [Answer.A]: string;
    [Answer.B]: string;
    [Answer.C]: string;
    [Answer.D]: string;
}

export interface IQuestionData {
    answers: IQuestionOrder;
    correctAnswer: Answer;
    question: string;
}
