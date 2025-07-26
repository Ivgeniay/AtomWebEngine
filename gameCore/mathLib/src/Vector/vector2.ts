export class Vector2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    toArray(): number[] {
        return [this.x, this.y,];
    }

    toFloat32Array(): Float32Array {
        return new Float32Array([this.x, this.y]);
    }

    static readonly Zero = new Vector2(0, 0);
    static readonly One = new Vector2(1, 1);
    static readonly Right = new Vector2(1, 0);
    static readonly Left = new Vector2(-1, 0);
    static readonly Up = new Vector2(0, 1);
    static readonly Down = new Vector2(0, -1);
}