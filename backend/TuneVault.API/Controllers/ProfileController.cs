using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TuneVault.Application.Features.Profile.Commands.UpdateProfile;
using TuneVault.Application.Features.Profile.DTOs;
using TuneVault.Application.Features.Profile.Queries.GetProfile;

namespace TuneVault.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProfileController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProfileController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> GetProfile()
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _mediator.Send(new GetProfileQuery(userId));
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto dto)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var command = new UpdateProfileCommand { UserId = userId, UserName = dto.UserName, Bio = dto.Bio };
        
        var success = await _mediator.Send(command);
        return success ? Ok() : BadRequest("Cập nhật thất bại.");
    }
}