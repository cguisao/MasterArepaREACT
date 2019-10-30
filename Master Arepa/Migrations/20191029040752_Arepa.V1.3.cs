using Microsoft.EntityFrameworkCore.Migrations;

namespace Master_Arepa.Migrations
{
    public partial class ArepaV13 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "HomeInventoryItem",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "FTInventoryItems",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "HomeInventoryItem");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "FTInventoryItems");
        }
    }
}
