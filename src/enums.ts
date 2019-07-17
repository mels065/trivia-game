export enum Answer {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
}

export enum Difficulty {
    Easy = "easy",
    Medium = "medium",
    Hard = "hard",
}

export enum GameMode {
    LOBBY = "LOBBY",
    PLAYING = "PLAYING",
    RESULTS = "RESULTS",
}

export enum SocketEvents {
    CREATE_GAME = "createGame",
    JOINING = "joining",
    ADD_PLAYER = "addPlayer",
    CHANGE_NAME = "changeName",
    UPDATE_PLAYER_LIST = "updatePlayerList",
    READY = "read",
    NEXT_QUESTION = "nextQuestion",
    SEND_ANSWER = "sendAnswer",
    UPDATE_TIMER = "updateTimer",
    SHOW_ANSWER = "showAnswer",
    UPDATE_SCORE = "updateScore",
    RESULTS = "results",
}
