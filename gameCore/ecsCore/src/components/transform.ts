import { Vector3 } from "@math/*";
import { IComponent, EntityId } from "../types";

export class Tranform implements IComponent {
    owner: EntityId;

    position: Vector3;
    rotation: Vector3;
    scale: Vector3;

    constructor(owner: EntityId) {
        this.owner = owner;
        this.position = Vector3.Zero;
        this.rotation = Vector3.Zero;
        this.scale = Vector3.One;
    }
}