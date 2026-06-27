using MediatR;
using TuneVault.Application.Features.Share.DTOs;

namespace TuneVault.Application.Features.Share.Commands.ShareMedia;

public class ShareMediaCommand : IRequest<ShareMediaDto>
{
    public Guid SenderId { get; set; }
    public Guid ReceiverId { get; set; }

    public Guid? MediaItemId { get; set; }
    public Guid? PlaylistId { get; set; }

    public string? Message { get; set; }
}