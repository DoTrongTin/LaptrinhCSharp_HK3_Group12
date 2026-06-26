using MediatR;
using System;

namespace TuneVault.Application.Features.Interactions.Commands.ToggleFavorite
{
    public class ToggleFavoriteCommand : IRequest<bool> // Trả về true nếu vừa Thích, false nếu vừa Bỏ thích
    {
        public Guid UserId { get; set; }
        public Guid MediaId { get; set; }
    }
}