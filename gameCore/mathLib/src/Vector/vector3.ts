export class Vector3 {
    x: number;
    y: number;
    z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
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