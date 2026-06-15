using MediatR;
using TuneVault.Application.Common.Models;
using TuneVault.Application.Features.Auth.DTOs;

namespace TuneVault.Application.Features.Auth.Commands.Login
{
    public class LoginCommand : IRequest<ApiResponse<AuthResponseDto>>
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}