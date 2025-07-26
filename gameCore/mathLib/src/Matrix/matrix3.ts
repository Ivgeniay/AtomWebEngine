export class Matrix3 {
    elements: Float32Array;

    constructor() {
        this.elements = new Float32Array(9);
        this.identity();
    }

    identity(): Matrix3 {
        const e = this.elements;
        e[0] = 1; e[3] = 0; e[6] = 0;
        e[1] = 0; e[4] = 1; e[7] = 0;
        e[2] = 0; e[5] = 0; e[8] = 1;
        return this;
    }

    static readonly Identity = new Matrix3();
}