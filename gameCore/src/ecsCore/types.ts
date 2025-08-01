export type EntityId = number;

export interface IComponent {
	owner: EntityId;
	// static create(owner: EntityId): IComponent;
}

export interface IWorld {
	update(deltaTime: number): void;
	render(deltaTime: number, context?: any): void;
	fixedUpdate(): void;

	getComponent<T>(
		entity: EntityId,
		componentClass: new (entity: EntityId) => T
	): T;
	hasComponent<T>(
		entity: EntityId,
		componentClass: new (entity: EntityId) => T
	): boolean;
	addComponent<T>(
		entity: EntityId,
		component: T,
		componentClass: new (entity: EntityId) => T
	): T;
	removeComponent<T>(
		entity: EntityId,
		componentClass: new (entity: EntityId) => T
	): void;

	createEntity(): EntityId;
	isEntityValid(entityId: number, version: number): boolean;
	destroyEntity(entity: EntityId): void;
	createEntityQuery(): QueryEntity;

	dispose(): void;
}

export interface ISystem {}

export interface ICommonSystem extends ISystem {
	update(world: IWorld, deltaTime: number): void;
}

export interface IRenderSystem extends ISystem {
	update(world: IWorld, deltaTime: number): void;
}

export interface IPhysicsSystem extends ISystem {
	update(world: IWorld, fixedDeltaTime: number): void;
}

export interface IComponentRegistry {
	getComponent<T>(
		entityId: EntityId,
		componentClass: new (entity: EntityId) => T
	): T;
	hasComponent<T>(
		entityId: EntityId,
		componentClass: new (entity: EntityId) => T
	): boolean;
	addComponent<T>(
		entityId: EntityId,
		component: T,
		componentClass: new (entity: EntityId) => T
	): T;
	removeComponent<T>(
		entityId: EntityId,
		componentClass: new (entity: EntityId) => T
	): void;
	removeAllComponents(entityId: EntityId): void;
	getEntitiesWithComponent<T>(
		componentClass: new (entity: EntityId) => T
	): EntityId[];
	dispose(): void;
}

export interface QueryEntity {
	with<T>(componentClass: new (entity: EntityId) => T): QueryEntity;
	without<T>(componentClass: new (entity: EntityId) => T): QueryEntity;
	execute(): EntityId[];
}
