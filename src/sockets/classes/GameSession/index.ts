import shortid = require("shortid");
import Player from "../Player";

export default class GameSession {
    public static sessions: {
        [key: string]: GameSession,
    } = {};

    public readonly id: string;
    public readonly players: {
        [key: number]: Player,
    } = {};

    private totalPlayersJoined: number;

    constructor() {
        this.id = shortid();
        GameSession.sessions[this.id] = this;

        this.totalPlayersJoined = 0;
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
