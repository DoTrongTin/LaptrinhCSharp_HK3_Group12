using System;

namespace TuneVault.Domain.Entities;

public class Follow
{
    public Guid FollowerId { get; set; }
    public ApplicationUser Follower { get; set; } = null!;

    public Guid FolloweeId { get; set; }
    public ApplicationUser Followee { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
