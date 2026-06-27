using MediatR;
using Microsoft.EntityFrameworkCore;
using TuneVault.Application.Common.Interfaces;
using TuneVault.Application.Features.Profile.DTOs;

namespace TuneVault.Application.Features.Profile.Queries.GetProfile;

public class GetProfileHandler
    : IRequestHandler<GetProfileQuery, ProfileDto?>
{
    private readonly IAppDbContext _context;

    public GetProfileHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<ProfileDto?> Handle(
        GetProfileQuery request,
        CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == request.UserId,
                                 cancellationToken);

        if (user == null)
            return null;

        return new ProfileDto
        {
            UserId = user.Id,
            UserName = user.UserName ?? "",
            Email = user.Email,
            Bio = user.Bio ?? ""
        };
    }
}