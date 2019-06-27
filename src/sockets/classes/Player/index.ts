import { Answer } from "../../../enums";

export default class PlayerClass {
    public displayName: string;
    public ready: boolean;
    public currentAnswer: Answer | null;

    private score: number;

    constructor(displayName: string) {
        this.displayName = displayName;
        this.ready = false;

        this.score = 0;
    }

    public getScore(): number {
        return this.score;
    }

    public incrementScore(): void {
        this.score++;
    }
}
