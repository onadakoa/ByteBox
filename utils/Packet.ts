export class Packet {
    public c: number;
    public d: any;

    constructor(code: number, body: any) {
        this.c = code;
        this.d = body;
    }

    toString() {
        return JSON.stringify({c: this.c, d: this.d});
    }
}