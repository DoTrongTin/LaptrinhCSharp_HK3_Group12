using MediatR;
using TuneVault.Application.Features.Profile.DTOs;

namespace TuneVault.Application.Features.Profile.Queries.GetProfile;

public class GetProfileQuery : IRequest<ProfileDto?>
{
    public Guid UserId { get; }

    public GetProfileQuery(Guid userId)
    {
        UserId = userId;
    }
}