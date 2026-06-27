using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using TuneVault.Application.Common.Interfaces;
using TuneVault.Application.Features.Profile.DTOs;

namespace TuneVault.Application.Features.Profile.Queries.GetProfile;

public class GetProfileHandler : IRequestHandler<GetProfileQuery, ProfileDto?>
{
    private readonly IAppDbContext _context;

    public GetProfileHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<ProfileDto?> Handle(GetProfileQuery request, CancellationToken cancellationToken)
    {
        // Sử dụng AsNoTracking vì chúng ta chỉ đọc dữ liệu, giúp tối ưu hiệu suất
        var user = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);

        if (user == null) return null;

        // Map dữ liệu từ Entity sang DTO để trả về cho Frontend
        return new ProfileDto
        {
            UserId = user.Id,
            UserName = user.UserName ?? string.Empty,
            Bio = user.Bio ?? string.Empty,
            Email = user.Email
            // Nếu sau này ProfileDto có thêm AvatarPath, bạn có thể bổ sung:
            // AvatarPath = user.AvatarPath
        };
    }
}