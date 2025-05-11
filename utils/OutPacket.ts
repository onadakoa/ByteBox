export class OutPacket<T = any> {
    public c: number;
    public d: T;

    constructor(code: PacketCode, body: T) {
        this.c = code;
        this.d = body;
    }

    toString() {
        return JSON.stringify({c: this.c, d: this.d});
    }
}

export enum PacketCode {
    SUCCESS = 0,
    ERROR = 1,
}