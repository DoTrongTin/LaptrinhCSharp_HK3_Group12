using MediatR;
using TuneVault.Application.Common.Interfaces;
using TuneVault.Domain.Entities;

namespace TuneVault.Application.Features.Profile.Commands.UpdateProfile;

public class UpdateProfileHandler : IRequestHandler<UpdateProfileCommand, bool>
{
    private readonly IAppDbContext _context;

    public UpdateProfileHandler(IAppDbContext context) => _context = context;

    public async Task<bool> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
    {
        var user = await _context.Users.FindAsync(new object[] { request.UserId }, cancellationToken);
        if (user == null) return false;

        user.UserName = request.UserName;
        user.Bio = request.Bio;

        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }
}