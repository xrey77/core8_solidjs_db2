using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace core8_solidjs_db2.Entities
{
    [Table("USERS")]
    public class User {

        [Key]
        [Column("ID")]
        public int Id {get; set;}

        [Column("FIRSTNAME", TypeName = "VARCHAR(50)")]
        public string FirstName {get; set;}

        [Column("LASTNAME", TypeName = "VARCHAR(50)")]
        public string LastName {get; set;}

        [Column("EMAIL", TypeName = "VARCHAR(200)")]
        public string Email { get; set; }

        [Column("MOBILE", TypeName = "VARCHAR(50)")]
        public string Mobile { get; set; }

        [Column("USERNAME", TypeName = "VARCHAR(50)")]
        public string UserName {get; set;}

        [Column("PASSWORD_HASH", TypeName = "VARCHAR(5000)")]
        [StringLength(5000)]
        public string Password_hash {get; set;}

        [Column("ROLES", TypeName = "VARCHAR(20)")]
        public string Roles { get; set; }

        [Column("ISACTIVATED",  TypeName = "INTEGER")]
        public int IsActivated {get; set;}

        [Column("ISBLOCKED", TypeName = "INTEGER")]
        public int Isblocked {get; set;}

        [Column("MAILTOKEN", TypeName = "INTEGER")]
        public int Mailtoken {get; set;}

        [Column("QRCODEURL", TypeName = "VARCHAR(9000)")]
        public string Qrcodeurl {get; set;}

        [Column("PROFILEPIC", TypeName = "VARCHAR(80)")]
        public string Profilepic {get; set;}

        [Column("SECRETKEY", TypeName = "VARCHAR(5000)")]
        [StringLength(5000)]
        public string Secretkey {get; set;}

        [Column("CREATEDAT", TypeName = "TIMESTAMP")]
        public DateTime CreatedAt {get; set;}

        [Column("UPDATEDAT", TypeName = "TIMESTAMP")]
        public DateTime UpdatedAt {get; set;}
    }
}