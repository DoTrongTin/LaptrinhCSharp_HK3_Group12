using MediatR;
using Microsoft.AspNetCore.Identity;
using TuneVault.Application.Common.Interfaces;
using TuneVault.Application.Common.Models;
using TuneVault.Application.Features.Auth.DTOs;
using TuneVault.Domain.Entities;

namespace TuneVault.Application.Features.Auth.Commands.Login
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, ApiResponse<AuthResponseDto>>
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenService _tokenService;

        public LoginCommandHandler(UserManager<ApplicationUser> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        public async Task<ApiResponse<AuthResponseDto>> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
                return ApiResponse<AuthResponseDto>.FailureResponse(new List<string> { "Tài khoản không tồn tại." });

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.Password);
            if (!isPasswordValid)
                return ApiResponse<AuthResponseDto>.FailureResponse(new List<string> { "Mật khẩu không chính xác." });

            var roles = await _userManager.GetRolesAsync(user);
            var token = _tokenService.CreateToken(user, roles);

            var responseDto = new AuthResponseDto
            {
                Token = token,
                UserId = user.Id,
                UserName = user.UserName!,
                Email = user.Email!,
                AvatarPath = user.AvatarPath ?? string.Empty
            };

            return ApiResponse<AuthResponseDto>.SuccessResponse(responseDto, "Đăng nhập thành công");
        }
    }
}