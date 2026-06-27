using MediatR;

namespace TuneVault.Application.Features.Profile.Commands.UpdateProfile;

public class UpdateProfileCommand : IRequest<bool>
{
    public Guid UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
}