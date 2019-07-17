class RoomMock {
    public room: string = "";
    public emitCalledWith: any[][] = [];

    public emit(event: string, ...args: any): void {
        this.emitCalledWith.push([event, args]);
    }

    public reset(): void {
        this.room = "";
        this.emitCalledWith = [];
    }
}

interface ISocketMock {
    id: string;
    inRoomMock: RoomMock;
    toRoomMock: RoomMock;
    emitCalledWith: any[];
    joinCalledWith: string[];
    emit: (event: string, ...args: any) => void;
    join: (room: string) => void;
    in: (room: string) => RoomMock;
    to: (room: string) => RoomMock;
    reset: () => void;
}

const socketMock: ISocketMock = {
    emitCalledWith: [],
    id: "abcde",
    inRoomMock: new RoomMock(),
    joinCalledWith: [],
    toRoomMock: new RoomMock(),
    emit(event, ...args) {
        this.emitCalledWith.push([event, args]);
    },
    join(room) { this.joinCalledWith.push(room); },
    in(room) {
        this.inRoomMock.room = room;
        return this.inRoomMock;
    },
    to(room) {
        this.toRoomMock.room = room;
        return this.toRoomMock;
    },
    reset() {
        this.emitCalledWith = [];
        this.joinCalledWith = [];
        this.inRoomMock.reset();
        this.toRoomMock.reset();
    },
};

export default socketMock;
