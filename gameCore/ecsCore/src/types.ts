export type EntityId = number;

export interface IComponent {
    owner: EntityId;
}

export interface IWorld {
    update(deltaTime: number): void;
    render(deltaTime: number, context?: any): void;
    fixedUpdate(): void;

    getComponent<T>(entity: EntityId, componentClass: new() => T): T;
    hasComponent<T>(entity: EntityId, componentClass: new() => T): boolean;
    addComponent<T>(entity: EntityId, component: T, componentClass: new() => T): T;
    removeComponent<T>(entity: EntityId, componentClass: new() => T): void;

    createEntity(): EntityId;
    isEntityValid(entityId: number, version: number): boolean;
    destroyEntity(entity: EntityId): void;
    createEntityQuery(): QueryEntity;

    dispose(): void;
}

export interface ISystem {
}

export interface ICommonSystem extends ISystem {
    update(world: IWorld, deltaTime: number): void;
}

export interface IRenderSystem extends ISystem {
    update(world: IWorld, deltaTime: number) : void
}

export interface IPhysicsSystem extends ISystem {
    update(world: IWorld, fixedDeltaTime: number) : void;
}

export interface IDisposable {
    dispose(): void;
}





export interface QueryEntity {
    with<T>(componentClass: new() => T): QueryEntity;
    without<T>(componentClass: new() => T): QueryEntity;
    execute(): EntityId[];
}

