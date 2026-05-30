namespace TuneVault.Domain.Entities;

public class Follow
{
    public string FollowerId { get; set; } = "";
    public string FolloweeId { get; set; } = "";
    public DateTime FollowedAt { get; set; } = DateTime.UtcNow;

    public ApplicationUser Follower { get; set; } = null!;
    public ApplicationUser Followee { get; set; } = null!;
}
