import { EntityId, IComponentRegistry } from "../types";
import { IDisposable } from "@utils/*";

class ComponentRegistry implements IComponentRegistry {
    private components: Map<string, Map<EntityId, any>>;
    private entityVersions: Map<EntityId, number>;

    constructor(entityVersions: Map<EntityId, number>) {
        this.components = new Map();
        this.entityVersions = entityVersions;
    }

    getComponent<T>(entityId: EntityId, componentClass: new() => T): T {
        this.validateEntity(entityId);
        
        const componentName = componentClass.name;
        const componentMap = this.components.get(componentName);
        
        if (!componentMap) {
            throw new Error(`Component ${componentName} is not registered`);
        }

        const component = componentMap.get(entityId);
        if (!component) {
            throw new Error(`Entity ${entityId} does not have component ${componentName}`);
        }

        return component;
    }

    hasComponent<T>(entityId: EntityId, componentClass: new() => T): boolean {
        if (!this.isEntityValid(entityId)) {
            return false;
        }

        const componentName = componentClass.name;
        const componentMap = this.components.get(componentName);
        return componentMap?.has(entityId) ?? false;
    }

    addComponent<T>(entityId: EntityId, component: T, componentClass: new() => T): T {
        this.validateEntity(entityId);
        
        const componentName = componentClass.name;
        
        if (!this.components.has(componentName)) {
            this.components.set(componentName, new Map());
        }

        const componentMap = this.components.get(componentName)!;
        
        if (componentMap.has(entityId)) {
            throw new Error(`Entity ${entityId} already has component ${componentName}`);
        }

        componentMap.set(entityId, component);
        return component;
    }

    removeComponent<T>(entityId: EntityId, componentClass: new() => T): void {
        this.validateEntity(entityId);
        
        const componentName = componentClass.name;
        const componentMap = this.components.get(componentName);
        
        if (!componentMap || !componentMap.has(entityId)) {
            throw new Error(`Entity ${entityId} does not have component ${componentName}`);
        }

        const component = componentMap.get(entityId);
        if (this.isDisposable(component)) {
            component.dispose();
        }
        componentMap.delete(entityId);
    }

    removeAllComponents(entityId: EntityId): void {
        this.components.forEach(componentMap => {
            const component = componentMap.get(entityId);
            if (this.isDisposable(component)) {
                component.dispose();
            }
            componentMap.delete(entityId);
        });
    }

    getEntitiesWithComponent<T>(componentClass: new() => T): EntityId[] {
        const componentName = componentClass.name;
        const componentMap = this.components.get(componentName);
        
        if (!componentMap) {
            return [];
        }

        return Array.from(componentMap.keys()).filter(entityId => this.isEntityValid(entityId));
    }

    dispose(): void {
        this.components.forEach(componentMap => {
            componentMap.forEach(component => {
                if (this.isDisposable(component)) {
                    component.dispose();
                }
            });
        });
        this.components.clear();
    }

    private isDisposable(obj: any): obj is IDisposable {
        return obj && typeof obj.dispose === 'function';
    }

    private validateEntity(entityId: EntityId): void {
        if (!this.isEntityValid(entityId)) {
            throw new Error(`Entity ${entityId} is not valid or has been destroyed`);
        }
    }

    private isEntityValid(entityId: EntityId): boolean {
        return this.entityVersions.has(entityId);
    }
}

export { ComponentRegistry };