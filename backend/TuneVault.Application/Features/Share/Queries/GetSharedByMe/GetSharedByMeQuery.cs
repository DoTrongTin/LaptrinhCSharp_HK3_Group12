using MediatR;
using TuneVault.Application.Features.Share.DTOs;

namespace TuneVault.Application.Features.Share.Queries.GetSharedByMe;

public class GetSharedByMeQuery : IRequest<List<ShareMediaDto>>
{
    public Guid UserId { get; set; }

    public GetSharedByMeQuery(Guid userId)
    {
        UserId = userId;
    }
}