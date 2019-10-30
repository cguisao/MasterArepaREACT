using Microsoft.EntityFrameworkCore.Migrations;

namespace Master_Arepa.Migrations
{
    public partial class ArepaV12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "HomeInventoryItem",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "FTInventoryItems",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "HomeInventoryItem");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "FTInventoryItems");
        }
    }
}
