using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace core8_solidjs_db2.Entities
{    
    [Table("PRODUCTS")]
    public class Product {

            [Key]
            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]      
            public int Id { get; set; }

            [Column("CATEGORY", TypeName = "VARCHAR(100)")]
            [StringLength(100)]
            public string Category { get; set; }

            [Column("DESCRIPTIONS", TypeName = "VARCHAR(100)")]
            [StringLength(100)]
            public string Descriptions { get; set; }

            [Column("QTY", TypeName = "INTEGER")]
            public int Qty { get; set; }

            [Column("UNIT", TypeName = "VARCHAR(10)")]
            [StringLength(10)]
            public string Unit { get; set; }

            [Column("COSTPRICE", TypeName = "DECIMAL(10,2)")]
            public decimal CostPrice { get; set; }

            [Column("SELLPRICE", TypeName = "DECIMAL(10,2)")]
            public decimal SellPrice { get; set; }

            [Column("SALEPRICE", TypeName = "DECIMAL(10,2)")]
            public decimal SalePrice { get; set; }

            [Column("PRODUCTPICTURE",  TypeName = "VARCHAR(50)")]
            [StringLength(50)]
            public string ProductPicture { get; set; }

            [Column("ALERTSTOCKS", TypeName = "INTEGER")]
            public int AlertStocks { get; set; }

            [Column("CRITICALSTOCKS", TypeName = "INTEGER")]
            public int CriticalStocks { get; set; }

            [Column("CREATEDAT")]
            public DateTime CreatedAt { get; set; }

            [Column("UPDATEDAT")]
            public DateTime UpdatedAt { get; set; }
    }    
}