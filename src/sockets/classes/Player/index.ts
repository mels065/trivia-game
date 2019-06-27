import { Answer } from "../../../enums";

export default class PlayerClass {
    public displayName: string;
    public ready: boolean;

    private score: number;
    private currentAnswer: Answer | null;

    constructor(displayName: string) {
        this.displayName = displayName;
        this.ready = false;

        this.score = 0;
        this.currentAnswer = null;
    }

    public getScore(): number {
        return this.score;
    }

    public incrementScore(): void {
        this.score++;
    }
}
