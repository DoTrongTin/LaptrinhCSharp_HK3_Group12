namespace TuneVault.Application.Features.Profile.DTOs;

public class ProfileDto
{
    public Guid UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string? Email { get; set; }
    // Bạn có thể thêm các trường khác như AvatarUrl nếu có
}