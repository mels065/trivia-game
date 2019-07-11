interface ISocketMock {
    emitCalledWith: any[];
    emit: (event: string, ...args: any) => void;
    reset: () => void;
}

const socketMock: ISocketMock = {
    emitCalledWith: [],
    emit(event, ...args) {
        this.emitCalledWith.push([event, args]);
    },
    reset() { this.emitCalledWith = []; },
};

export default socketMock;
