using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TuneVault.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddArtistToMediaItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Artist",
                table: "MediaItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "Nghệ sĩ ẩn danh");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Artist",
                table: "MediaItems");
        }
    }
}
