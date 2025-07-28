import { describe, it, expect, beforeEach } from "vitest";
import { World } from "@ecsCore/*";
import { Transform } from "../../../gameCore/ecsCore/src/components/transform";

describe("World", () => {
	let world: World;

	beforeEach(() => {
		world = new World();
	});

	describe("Entity Management", () => {
		it("should create entity with valid id", () => {
			const entityId = world.createEntity();

			expect(entityId).toBe(0);
			expect(world.isEntityValid(entityId)).toBe(true);
		});

		it("should create multiple entities with incremental ids", () => {
			const entity1 = world.createEntity();
			const entity2 = world.createEntity();
			const entity3 = world.createEntity();

			expect(entity1).toBe(0);
			expect(entity2).toBe(1);
			expect(entity3).toBe(2);
		});

		it("should destroy entity and make it invalid", () => {
			const entityId = world.createEntity();

			world.destroyEntity(entityId);

			expect(world.isEntityValid(entityId)).toBe(false);
		});

		it("should throw when destroying invalid entity", () => {
			expect(() => {
				world.destroyEntity(999);
			}).toThrow("Entity 999 is not valid or already destroyed");
		});
	});

	describe("Component Management", () => {
		it("should add and get component", () => {
			const entityId = world.createEntity();
			const transform = new Transform(entityId);

			world.addComponent(entityId, transform, Transform);
			const retrieved = world.getComponent(entityId, Transform);

			expect(retrieved).toBe(transform);
			expect(retrieved.owner).toBe(entityId);
		});

		it("should check if entity has component", () => {
			const entityId = world.createEntity();
			const transform = new Transform(entityId);

			expect(world.hasComponent(entityId, Transform)).toBe(false);

			world.addComponent(entityId, transform, Transform);

			expect(world.hasComponent(entityId, Transform)).toBe(true);
		});

		it("should remove component", () => {
			const entityId = world.createEntity();
			const transform = new Transform(entityId);

			world.addComponent(entityId, transform, Transform);
			world.removeComponent(entityId, Transform);

			expect(world.hasComponent(entityId, Transform)).toBe(false);
		});

		it("should throw when getting non-existent component", () => {
			const entityId = world.createEntity();

			expect(() => {
				world.getComponent(entityId, Transform);
			}).toThrow();
		});
	});

	describe("Cleanup", () => {
		it("should dispose properly", () => {
			const entityId = world.createEntity();
			const transform = new Transform(entityId);
			world.addComponent(entityId, transform, Transform);

			world.dispose();

			expect(world.isEntityValid(entityId)).toBe(false);
		});
	});
});
