namespace TuneVault.Application.Common.Interfaces
{
    public interface IAnthropicService
    {
        Task<string> CompleteAsync(string prompt, CancellationToken cancellationToken = default);
    }
}