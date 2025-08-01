import { IComponent, EntityId } from "../types";
import { observable } from "../../utils";
import { Vector3 } from "../../mathLib";

export class Transform implements IComponent {
	owner: EntityId;

	@observable
	position: Vector3;
	@observable
	rotation: Vector3;
	@observable
	scale: Vector3;

	constructor(owner: EntityId) {
		this.owner = owner;
		this.position = Vector3.Zero;
		this.rotation = Vector3.Zero;
		this.scale = Vector3.One;
	}
}
