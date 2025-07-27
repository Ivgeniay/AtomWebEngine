export class Vector2 {
    readonly x: number;
    readonly y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    setX(x: number): Vector2 {
        return new Vector2(x, this.y);
    }

    setY(y: number): Vector2 {
        return new Vector2(this.x, y);
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