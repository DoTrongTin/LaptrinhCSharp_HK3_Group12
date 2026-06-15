namespace TuneVault.Domain.Interfaces
{
    public interface IUnitOfWork
    {
        // Hàm này sẽ gọi _dbContext.SaveChangesAsync() ở tầng Infrastructure
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}