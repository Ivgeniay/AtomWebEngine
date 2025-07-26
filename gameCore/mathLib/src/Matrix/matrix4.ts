export class Matrix4 {
    elements: Float32Array;

    constructor() {
        this.elements = new Float32Array(16);
        this.identity();
    }

    identity(): Matrix4 {
        const e = this.elements;
        e[0] = 1; e[4] = 0; e[8] = 0; e[12] = 0;
        e[1] = 0; e[5] = 1; e[9] = 0; e[13] = 0;
        e[2] = 0; e[6] = 0; e[10] = 1; e[14] = 0;
        e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;
        return this;
    }

    static readonly Identity = new Matrix4();
}