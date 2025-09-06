using System.Data;
using System.IO;
using Microsoft.Extensions.Options;
using IBM.Data.Db2;
using Microsoft.EntityFrameworkCore;
using core8_solidjs_db2.Entities;
using core8_solidjs_db2.Helpers;
using core8_solidjs_db2.Models;

namespace core8_solidjs_db2.Services
{
    public interface IProductService {
        IEnumerable<Product> ListAll(int page);
        // Task<IEnumerable<Product>> SearchAll(int page, string key);
        IEnumerable<Product> Dataset();
        // Task<int> TotPageSearch(int pg, string key);
        void CreateProduct(Product prod);
        void ProductUpdate(Product prod);
        void ProductDelete(int id);
        void UpdateProdPicture(int id, string file);
        Product GetProductById(int id);

        int TotPage();
    }

    public class ProductService : IProductService
    {

    private Db2DbContext _context;
        private readonly AppSettings _appSettings;


        public ProductService(Db2DbContext context,IOptions<AppSettings> appSettings)
        {
            _context = context;
            _appSettings = appSettings.Value;
        }        
        public int TotPage() {
            var perpage = 5;
            var totrecs = _context.Products.Count();
            int totpage = (int)Math.Ceiling((float)(totrecs) / perpage);
            return totpage;
        }
        public IEnumerable<Product> ListAll(int page)
        {
            var perpage = 5;
            var offset = (page -1) * perpage;

            var products = _context.Products                                
                .OrderBy(b => b.Id)
                .Skip(offset)
                .Take(perpage)
                .ToList();

            return products;
        }

        // public async Task<int> TotPageSearch(int pg, string key) {
        //     var perpage = 5;

        //     var columnName = $"descriptions";         
        //     var search = "%"+key+"%";
        //     var parameter = new FromSqlRaw("searchParam", OracleDbType.Varchar2);
        //     parameter.Value=search;
        //     var products = await _context.Products.FromSqlRaw("SELECT * FROM \"Products\" WHERE \"descriptions\" LIKE :searchParam", parameter).ToListAsync();

        //     long totalRecords = products.Count();

        //     int totpage = (int)Math.Ceiling((float)(totalRecords) / perpage);
        //     return totpage;
        // }


        // public async Task<IEnumerable<Product>> SearchAll(int page, string key)
        // {
        //     var perpage = 5;
        //     var offset = (page -1) * perpage;

        //     var columnName = $"descriptions";         
        //     var search = "%"+key+"%";
        //     var parameter = new FromSqlRaw("searchParam", OracleDbType.Varchar2);
        //     parameter.Value=search;
        //     var products = await _context.Products.FromSqlRaw("SELECT * FROM \"Products\" WHERE \"descriptions\" LIKE :searchParam", parameter).ToListAsync();
        //     return products.Skip(offset).Take(perpage);
        // }

        public IEnumerable<Product> Dataset()
        {
            var products = _context.Products.ToList();
            return products;
        }

        public void CreateProduct(Product prod) {
            try {
                Product prodDesc = _context.Products.Where(c => c.Descriptions == prod.Descriptions).FirstOrDefault();
                if (prodDesc is not null) {
                    throw new AppException("Product Description is already exists...");
                }

                _context.Products.Add(prod);
                _context.SaveChanges();
            } catch(Exception ex){
                throw new AppException(ex.Message);              
            }
        }

        public void ProductUpdate(Product prods) {
            var prod = _context.Products.Find(prods.Id);
            if (prod is null) {
                throw new AppException("Product not found");
            }
            
            if (!string.IsNullOrWhiteSpace(prods.Category)) {
                prod.Category = prods.Category;
            }

            if (!string.IsNullOrWhiteSpace(prods.Descriptions)) {
                prod.Descriptions = prods.Descriptions;
            }

            if (!string.IsNullOrWhiteSpace(prods.Unit)) {
                prod.Unit = prods.Unit;
            }

            DateTime now = DateTime.Now;
            prod.UpdatedAt = now;
            _context.Products.Update(prod);
            _context.SaveChanges();                    
        }

        public void ProductDelete(int id) {
            var prod = _context.Products.Find(id);
            if (prod is not null)
            {
                _context.Products.Remove(prod);
                _context.SaveChanges();
            }
            else {
               throw new AppException("Product not found");
            }   
        }

        public void UpdateProdPicture(int id, string file) {
            var prod = _context.Products.Find(id);
            if (prod is not null)
            {
                prod.ProductPicture = file;
                _context.Products.Update(prod);
                _context.SaveChanges();
            }
            else {
               throw new AppException("Product not found");
            }                    
        }

        public Product GetProductById(int id) {
                var prod = _context.Products.Find(id);
                if (prod == null) {
                    throw new AppException("Product does'not exists....");
                }
                return prod;
        }        
    }
}