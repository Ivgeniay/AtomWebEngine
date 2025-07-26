using System.Numerics;

namespace AtomWebEngine.Domain;

public class Class1
{

}

public interface IComponent
{
    public int Id { get; }
}

public struct Transform : IComponent
{
    public Vector3 Position;
    public Vector3 Rotation;
    public Vector3 Scale;
}

public interface IWorld
{
    public void Update(double deltaTime);
    public void Render(double deltaTime, object? context);
    public void FixedUpdate();

    public ref T GetComponent<T>(Entity entity) where T : struct, IComponent;
    public bool HasComponent<T>(Entity entity) where T : struct, IComponent;
    public ref T AddComponent<T>(Entity entity, in T component) where T : struct, IComponent;
    public void RemoveComponent<T>(Entity entity) where T : struct, IComponent;

    public Entity CreateEntity();
    public bool IsEntityValid(uint entity_id, uint _version);
    public void DestroyEntity(Entity entity);
    public QueryEntity CreateEntityQuery();

    public void Dispose();
}