export class Vector4 {
    x: number;
    y: number;
    z: number;
    w: number;

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    toArray(): number[] {
        return [this.x, this.y, this.z, this.w];
    }

    toFloat32Array(): Float32Array {
        return new Float32Array([this.x, this.y, this.z, this.w]);
    }

    static readonly Zero = new Vector4(0, 0, 0, 0);
    static readonly One = new Vector4(1, 1, 1, 1);
    static readonly Right = new Vector4(1, 0, 0, 0);
    static readonly Left = new Vector4(-1, 0, 0, 0);
    static readonly Up = new Vector4(0, 1, 0, 0);
    static readonly Down = new Vector4(0, -1, 0, 0);
    static readonly Front = new Vector4(0, 0, 1, 0);
    static readonly Back = new Vector4(0, 0, -1, 0);
}