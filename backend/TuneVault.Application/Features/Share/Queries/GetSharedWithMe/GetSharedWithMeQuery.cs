using MediatR;
using TuneVault.Application.Features.Share.DTOs;

namespace TuneVault.Application.Features.Share.Queries.GetSharedWithMe;

public class GetSharedWithMeQuery : IRequest<List<ShareMediaDto>>
{
    public Guid UserId { get; set; }

    public GetSharedWithMeQuery(Guid userId)
    {
        UserId = userId;
    }
}