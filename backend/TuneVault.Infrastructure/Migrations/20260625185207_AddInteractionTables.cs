using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TuneVault.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddInteractionTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favorites_AppUsers_ApplicationUserId",
                table: "Favorites");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayHistories_AppUsers_ApplicationUserId",
                table: "PlayHistories");

            migrationBuilder.DropIndex(
                name: "IX_PlayHistories_ApplicationUserId",
                table: "PlayHistories");

            migrationBuilder.DropIndex(
                name: "IX_Favorites_ApplicationUserId",
                table: "Favorites");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "PlayHistories");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Favorites");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "Favorites",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "Favorites");

            migrationBuilder.AddColumn<Guid>(
                name: "ApplicationUserId",
                table: "PlayHistories",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ApplicationUserId",
                table: "Favorites",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PlayHistories_ApplicationUserId",
                table: "PlayHistories",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Favorites_ApplicationUserId",
                table: "Favorites",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Favorites_AppUsers_ApplicationUserId",
                table: "Favorites",
                column: "ApplicationUserId",
                principalTable: "AppUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlayHistories_AppUsers_ApplicationUserId",
                table: "PlayHistories",
                column: "ApplicationUserId",
                principalTable: "AppUsers",
                principalColumn: "Id");
        }
    }
}
