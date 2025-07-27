import { IDisposable } from "../dispose/disposable";

type ChangeCallback = (target: any, propertyKey: string, oldValue: any, newValue: any) => void;

class ObservableManager implements IDisposable {
    private static instance: ObservableManager = new ObservableManager();
    private listeners: Map<object, Map<string, ChangeCallback[]>> = new Map();

    static getInstance(): ObservableManager {
        return ObservableManager.instance;
    }

    addListener(target: object, propertyKey: string, callback: ChangeCallback): void {
        if (!this.listeners.has(target)) {
            this.listeners.set(target, new Map());
        }

        const targetListeners = this.listeners.get(target)!;
        if (!targetListeners.has(propertyKey)) {
            targetListeners.set(propertyKey, []);
        }

        targetListeners.get(propertyKey)!.push(callback);
    }

    removeListener(target: object, propertyKey: string, callback: ChangeCallback): void {
        const targetListeners = this.listeners.get(target);
        if (!targetListeners) return;

        const propertyListeners = targetListeners.get(propertyKey);
        if (!propertyListeners) return;

        const index = propertyListeners.indexOf(callback);
        if (index !== -1) {
            propertyListeners.splice(index, 1);
        }
    }

    notifyChange(target: object, propertyKey: string, oldValue: any, newValue: any): void {
        const targetListeners = this.listeners.get(target);
        if (!targetListeners) return;

        const propertyListeners = targetListeners.get(propertyKey);
        if (!propertyListeners) return;

        propertyListeners.forEach(callback => {
            callback(target, propertyKey, oldValue, newValue);
        });
    }

    dispose(): void {
        this.listeners.clear();
    }

    disposeObservable(target: object): void {
        this.listeners.delete(target);
    }
}

export function observable<T, V>(value: undefined, context: ClassFieldDecoratorContext<T, V>): (initialValue: V) => V {
    const propertyKey = context.name as string;
    const privateKey = `_${propertyKey}`;

    return function(this: any, initialValue: V): V {
        Object.defineProperty(this, propertyKey, {
            get: function() {
                return this[privateKey];
            },
            set: function(newValue: V) {
                const oldValue = this[privateKey];
                this[privateKey] = newValue;
                
                ObservableManager.getInstance().notifyChange(this, propertyKey, oldValue, newValue);
            },
            enumerable: true,
            configurable: true
        });

        this[privateKey] = initialValue;
        return initialValue;
    };
}

export function subscribe(target: object, propertyKey: string, callback: ChangeCallback): void {
    ObservableManager.getInstance().addListener(target, propertyKey, callback);
}

export function unsubscribe(target: object, propertyKey: string, callback: ChangeCallback): void {
    ObservableManager.getInstance().removeListener(target, propertyKey, callback);
}

export function disposeObservable(target: object): void {
    ObservableManager.getInstance().disposeObservable(target);
}