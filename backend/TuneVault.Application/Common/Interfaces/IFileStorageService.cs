using System.IO;
using System.Threading.Tasks;

namespace TuneVault.Application.Common.Interfaces
{
    public interface IFileStorageService
    {
        // Thay vì: Task<string> SaveFileAsync(IFormFile file);
        Task<string> SaveFileAsync(Stream fileStream, string fileName, string contentType = null);
        
        Task DeleteFileAsync(string fileUrl);
    }
}