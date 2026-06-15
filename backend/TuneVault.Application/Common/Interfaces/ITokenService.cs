using TuneVault.Domain.Entities;

namespace TuneVault.Application.Common.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(ApplicationUser user, IList<string> roles);
    }
}