using MediatR;
using Microsoft.AspNetCore.Identity;
using TuneVault.Application.Common.Interfaces;
using TuneVault.Application.Common.Models;
using TuneVault.Application.Features.Auth.DTOs;
using TuneVault.Domain.Entities;

namespace TuneVault.Application.Features.Auth.Commands.Register
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, ApiResponse<AuthResponseDto>>
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenService _tokenService;

        public RegisterCommandHandler(UserManager<ApplicationUser> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        public async Task<ApiResponse<AuthResponseDto>> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var existingUser = await _userManager.FindByEmailAsync(request.Email);
            if (existingUser != null)
                return ApiResponse<AuthResponseDto>.FailureResponse(new List<string> { "Email này đã được sử dụng." });

            var user = new ApplicationUser
            {
                Email = request.Email,
                UserName = request.UserName,
                CreatedAt = DateTime.UtcNow
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description).ToList();
                return ApiResponse<AuthResponseDto>.FailureResponse(errors, "Đăng ký thất bại");
            }

            // Sinh Token ngay sau khi đăng ký thành công để Auto-login
            var roles = await _userManager.GetRolesAsync(user);
            var token = _tokenService.CreateToken(user, roles);

            var responseDto = new AuthResponseDto
            {
                Token = token,
                UserId = user.Id,
                UserName = user.UserName!,
                Email = user.Email!,
                AvatarPath = user.AvatarPath
            };

            return ApiResponse<AuthResponseDto>.SuccessResponse(responseDto, "Đăng ký tài khoản thành công!");
        }
    }
}