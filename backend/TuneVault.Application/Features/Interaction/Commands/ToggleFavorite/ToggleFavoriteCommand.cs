using MediatR;
using TuneVault.Application.Common.Models;

namespace TuneVault.Application.Features.Interaction.Commands.ToggleFavorite
{
    public class ToggleFavoriteCommand : IRequest<ApiResponse<bool>>
    {
        public Guid MediaItemId { get; set; }
        // Tạm thời truyền UserId trực tiếp, ở Giai đoạn 3 khi có JWT sẽ dùng AuthorizationBehavior để tự bóc tách
        public Guid UserId { get; set; } 
    }
}