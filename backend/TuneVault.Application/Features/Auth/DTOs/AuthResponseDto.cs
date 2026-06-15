namespace TuneVault.Application.Features.Auth.DTOs
{
    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public Guid UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string AvatarPath { get; set; } = string.Empty;
    }
}