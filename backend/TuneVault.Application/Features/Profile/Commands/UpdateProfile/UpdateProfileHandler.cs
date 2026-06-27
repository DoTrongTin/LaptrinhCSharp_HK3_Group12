using MediatR;
using TuneVault.Application.Common.Interfaces;
using TuneVault.Application.Features.Profile.DTOs; 

namespace TuneVault.Application.Features.Profile.Commands.UpdateProfile;


public class UpdateProfileHandler : IRequestHandler<UpdateProfileCommand, ProfileDto>
{
    private readonly IAppDbContext _context;

    public UpdateProfileHandler(IAppDbContext context) => _context = context;

    public async Task<ProfileDto> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
    {
        var user = await _context.Users.FindAsync(new object[] { request.UserId }, cancellationToken);
        
        if (user == null) 
            throw new UnauthorizedAccessException("Không tìm thấy tài khoản người dùng.");
        user.UserName = request.UserName;
        user.Bio = request.Bio;


        if (!string.IsNullOrEmpty(request.AvatarPath))
        {
            user.AvatarPath = request.AvatarPath;
        }

        await _context.SaveChangesAsync(cancellationToken);

        // 3. Trả về thông tin mới nhất cho Frontend
        return new ProfileDto
        {
            UserId = user.Id,
            UserName = user.UserName ?? string.Empty,
            Bio = user.Bio ?? string.Empty,
            Email = user.Email,
           
        };
    }
}