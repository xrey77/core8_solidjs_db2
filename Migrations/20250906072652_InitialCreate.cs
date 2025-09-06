using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace core8_solidjs_db2.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PRODUCTS",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("Db2:Identity", "1, 1"),
                    CATEGORY = table.Column<string>(type: "VARCHAR(100)", maxLength: 100, nullable: true),
                    DESCRIPTIONS = table.Column<string>(type: "VARCHAR(100)", maxLength: 100, nullable: true),
                    QTY = table.Column<int>(type: "INTEGER", nullable: false),
                    UNIT = table.Column<string>(type: "VARCHAR(10)", maxLength: 10, nullable: true),
                    COSTPRICE = table.Column<decimal>(type: "DECIMAL(10,2)", nullable: false),
                    SELLPRICE = table.Column<decimal>(type: "DECIMAL(10,2)", nullable: false),
                    SALEPRICE = table.Column<decimal>(type: "DECIMAL(10,2)", nullable: false),
                    PRODUCTPICTURE = table.Column<string>(type: "VARCHAR(50)", maxLength: 50, nullable: true),
                    ALERTSTOCKS = table.Column<int>(type: "INTEGER", nullable: false),
                    CRITICALSTOCKS = table.Column<int>(type: "INTEGER", nullable: false),
                    CREATEDAT = table.Column<DateTime>(type: "timestamp(6)", nullable: false),
                    UPDATEDAT = table.Column<DateTime>(type: "timestamp(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PRODUCTS", x => x.Id);
                },
                comment: "TABLESPACE PRODUCTS_TS");

            migrationBuilder.CreateTable(
                name: "USERS",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("Db2:Identity", "1, 1"),
                    FIRSTNAME = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    LASTNAME = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    EMAIL = table.Column<string>(type: "VARCHAR(200)", nullable: true),
                    MOBILE = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    USERNAME = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    PASSWORD_HASH = table.Column<string>(type: "VARCHAR(5000)", maxLength: 5000, nullable: true),
                    ROLES = table.Column<string>(type: "VARCHAR(20)", nullable: true),
                    ISACTIVATED = table.Column<int>(type: "INTEGER", nullable: false),
                    ISBLOCKED = table.Column<int>(type: "INTEGER", nullable: false),
                    MAILTOKEN = table.Column<int>(type: "INTEGER", nullable: false),
                    QRCODEURL = table.Column<string>(type: "VARCHAR(9000)", nullable: true),
                    PROFILEPIC = table.Column<string>(type: "VARCHAR(80)", nullable: true),
                    SECRETKEY = table.Column<string>(type: "VARCHAR(5000)", maxLength: 5000, nullable: true),
                    CREATEDAT = table.Column<DateTime>(type: "TIMESTAMP", nullable: false),
                    UPDATEDAT = table.Column<DateTime>(type: "TIMESTAMP", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USERS", x => x.ID);
                },
                comment: "TABLESPACE USERS_TS");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PRODUCTS");

            migrationBuilder.DropTable(
                name: "USERS");
        }
    }
}
