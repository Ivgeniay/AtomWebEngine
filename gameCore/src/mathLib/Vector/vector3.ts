export class Vector3 {
    readonly x: number;
    readonly y: number;
    readonly z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(other: Vector3): Vector3 {
        return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    setX(x: number): Vector3 {
        return new Vector3(x, this.y, this.z);
    }

    setY(y: number): Vector3 {
        return new Vector3(this.x, y, this.z);
    }

    setZ(z: number): Vector3 {
        return new Vector3(this.x, this.y, z);
    }

    toArray(): number[] {
        return [this.x, this.y, this.z];
    }

    toFloat32Array(): Float32Array {
        return new Float32Array([this.x, this.y, this.z]);
    }

    static readonly Zero = new Vector3(0, 0, 0);
    static readonly One = new Vector3(1, 1, 1);
    static readonly Right = new Vector3(1, 0, 0);
    static readonly Left = new Vector3(-1, 0, 0);
    static readonly Up = new Vector3(0, 1, 0);
    static readonly Down = new Vector3(0, -1, 0);
    static readonly Front = new Vector3(0, 0, 1);
    static readonly Back = new Vector3(0, 0, -1);
}