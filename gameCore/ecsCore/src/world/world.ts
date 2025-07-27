import { EntityId, ICommonSystem, IPhysicsSystem, IRenderSystem, IWorld, QueryEntity } from "../types";
import { ComponentRegistry } from "./componentRegistry";
import { IDisposable } from "@utils/*"

export class World implements IWorld, IDisposable {
    private componentRegistry: ComponentRegistry;
    private entityVersions: Map<EntityId, number>;
    private nextEntityId: EntityId;
    
    private commonSystems: ICommonSystem[];
    private renderSystems: IRenderSystem[];
    private physicsSystems: IPhysicsSystem[];

    constructor() {
        this.entityVersions = new Map();
        this.componentRegistry = new ComponentRegistry(this.entityVersions);
        this.nextEntityId = 0;
        
        this.commonSystems = [];
        this.renderSystems = [];
        this.physicsSystems = [];
    }

    update(deltaTime: number): void {
        for (const system of this.commonSystems) {
            system.update(this, deltaTime);
        }
    }

    render(deltaTime: number, context?: any): void {
        for (const system of this.renderSystems) {
            system.update(this, deltaTime);
        }
    }

    fixedUpdate(): void {
        const fixedDeltaTime = 1.0 / 60.0;
        for (const system of this.physicsSystems) {
            system.update(this, fixedDeltaTime);
        }
    }

    getComponent<T>(entityId: EntityId, componentClass: new() => T): T {
        return this.componentRegistry.getComponent(entityId, componentClass);
    }

    hasComponent<T>(entityId: EntityId, componentClass: new() => T): boolean {
        return this.componentRegistry.hasComponent(entityId, componentClass);
    }

    addComponent<T>(entityId: EntityId, component: T, componentClass: new() => T): T {
        return this.componentRegistry.addComponent(entityId, component, componentClass);
    }

    removeComponent<T>(entityId: EntityId, componentClass: new() => T): void {
        this.componentRegistry.removeComponent(entityId, componentClass);
    }

    createEntity(): EntityId {
        const entityId = this.nextEntityId++;
        this.entityVersions.set(entityId, 0);
        return entityId;
    }

    isEntityValid(entityId: EntityId): boolean {
        return this.entityVersions.has(entityId);
    }

    destroyEntity(entityId: EntityId): void {
        if (!this.isEntityValid(entityId)) {
            throw new Error(`Entity ${entityId} is not valid or already destroyed`);
        }

        this.componentRegistry.removeAllComponents(entityId);
        this.entityVersions.delete(entityId);
    }

    createEntityQuery(): QueryEntity {
        return new EntityQuery(this.componentRegistry);
    }

    addCommonSystem(system: ICommonSystem): void {
        this.commonSystems.push(system);
    }

    addRenderSystem(system: IRenderSystem): void {
        this.renderSystems.push(system);
    }

    addPhysicsSystem(system: IPhysicsSystem): void {
        this.physicsSystems.push(system);
    }

    removeCommonSystem(system: ICommonSystem): void {
        const index = this.commonSystems.indexOf(system);
        if (index !== -1) {
            this.commonSystems.splice(index, 1);
        }
    }

    removeRenderSystem(system: IRenderSystem): void {
        const index = this.renderSystems.indexOf(system);
        if (index !== -1) {
            this.renderSystems.splice(index, 1);
        }
    }

    removePhysicsSystem(system: IPhysicsSystem): void {
        const index = this.physicsSystems.indexOf(system);
        if (index !== -1) {
            this.physicsSystems.splice(index, 1);
        }
    }

    dispose(): void {
        this.componentRegistry.dispose();
        this.entityVersions.clear();

        this.commonSystems.forEach(system => {
            if (this.isDisposable(system))
                system.dispose();
        })
        this.renderSystems.forEach(system => {
            if (this.isDisposable(system))
                system.dispose();
        })
        this.physicsSystems.forEach(system => {
            if (this.isDisposable(system))
                system.dispose();
        })

        this.commonSystems = [];
        this.renderSystems = [];
        this.physicsSystems = [];
    }

    private isDisposable(obj: any): obj is IDisposable {
        return obj && typeof obj.dispose === 'function';
    }
}

class EntityQuery implements QueryEntity {
    private componentRegistry: ComponentRegistry;
    private withComponents: (new() => any)[];
    private withoutComponents: (new() => any)[];

    constructor(componentRegistry: ComponentRegistry) {
        this.componentRegistry = componentRegistry;
        this.withComponents = [];
        this.withoutComponents = [];
    }

    with<T>(componentClass: new() => T): QueryEntity {
        this.withComponents.push(componentClass);
        return this;
    }

    without<T>(componentClass: new() => T): QueryEntity {
        this.withoutComponents.push(componentClass);
        return this;
    }

    execute(): EntityId[] {
        if (this.withComponents.length === 0) {
            return [];
        }

        let candidateEntities = this.componentRegistry.getEntitiesWithComponent(this.withComponents[0]);

        for (let i = 1; i < this.withComponents.length; i++) {
            const entitiesWithComponent = this.componentRegistry.getEntitiesWithComponent(this.withComponents[i]);
            candidateEntities = candidateEntities.filter(entityId => entitiesWithComponent.includes(entityId));
        }

        for (const withoutComponent of this.withoutComponents) {
            candidateEntities = candidateEntities.filter(entityId => 
                !this.componentRegistry.hasComponent(entityId, withoutComponent)
            );
        }

        return candidateEntities;
    }
}