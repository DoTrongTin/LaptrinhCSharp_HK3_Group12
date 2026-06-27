using MediatR;
using TuneVault.Application.Features.Profile.DTOs;

namespace TuneVault.Application.Features.Profile.Commands.UpdateProfile;

// Lưu ý: Đổi IRequest<bool> thành IRequest<ProfileDto> để trả về dữ liệu user mới
public class UpdateProfileCommand : IRequest<ProfileDto>
{
    public Guid UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    
    // THÊM DÒNG NÀY ĐỂ FIX LỖI CS0117
    public string? AvatarPath { get; set; } 
}