export class Vector4 {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly w: number;

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    add(other: Vector4): Vector4 {
        return new Vector4(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w);
    }

    setX(x: number): Vector4 {
        return new Vector4(x, this.y, this.z, this.w);
    }

    setY(y: number): Vector4 {
        return new Vector4(this.x, y, this.z, this.w);
    }

    setZ(z: number): Vector4 {
        return new Vector4(this.x, this.y, z, this.w);
    }

    setW(w: number): Vector4 {
        return new Vector4(this.x, this.y, this.z, w);
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