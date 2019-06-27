import shortid from "shortid";

export default class GameSession {
    public static sessions: {
        [key: string]: GameSession,
    } = {};

    constructor() {
        GameSession.sessions[shortid()] = this;
    }
}
