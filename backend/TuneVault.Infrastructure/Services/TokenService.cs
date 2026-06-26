using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TuneVault.Application.Common.Interfaces;
using TuneVault.Domain.Entities;

namespace TuneVault.Infrastructure.Services
{
    // Thực thi ITokenService đã định nghĩa ở tầng Application
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;

        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        public string CreateToken(ApplicationUser user, IList<string> roles)
        {
        var claims = new List<Claim>
        {
        
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email!),
            new Claim(ClaimTypes.Name, user.UserName!)
        };


        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

            // 2. Lấy Chìa khóa bí mật từ cấu hình để ký Token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Secret"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // 3. Cấu hình các đặc tính của Token (Hạn sử dụng, Nguồn cấp...)
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(double.Parse(_config["JwtSettings:ExpiryMinutes"]!)),
                SigningCredentials = creds,
                Issuer = _config["JwtSettings:Issuer"],
                Audience = _config["JwtSettings:Audience"]
            };

            // 4. Sinh ra chuỗi Token string
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}