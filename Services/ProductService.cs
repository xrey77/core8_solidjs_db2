using System.Data;
using System.IO;
using Microsoft.Extensions.Options;
using IBM.Data.Db2;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using core8_solidjs_db2.Entities;
using core8_solidjs_db2.Helpers;
using core8_solidjs_db2.Models;

namespace core8_solidjs_db2.Services
{
    public interface IProductService {
        Task<IEnumerable<Product>> ListAll(int perpage, int offset);        
        int TotPage();
        Task<IEnumerable<Product>> SearchAll(string key, int perpage, int offset);
        IEnumerable<Product> Dataset();
        Task<int> TotPageSearch(string key, int perpage);
        Task<Product> CreateProduct(Product prod);
        void ProductUpdate(Product prod);
        void ProductDelete(int id);
        void UpdateProdPicture(int id, string file);
        Product GetProductById(int id);
        Task<int> SeqId();
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

        public async Task<IEnumerable<Product>> ListAll(int perpage, int offset)
        {
            var products1 = await _context.Products
            .OrderBy(p => p.Id)
            .Where(e => e.Id > offset) 
            .Take(perpage)
            .ToListAsync();
            // var products = await _context.Products.FromSql($"SELECT * FROM REY.PRODUCTS LIMIT(5) OFFSET(5))")
            // .ToListAsync();
            return products1;
        }

        public async Task<int> TotPageSearch(string key, int perpage) {
            var products2 = await _context.Products.FromSql($"SELECT * FROM PRODUCTS WHERE LOWER(DESCRIPTIONS) LIKE {key} ORDER BY ID").ToListAsync();
            long totalRecords = products2.Count();
            int totpage = (int)Math.Ceiling((float)(totalRecords) / perpage);
            return totpage;
        }


        public async Task<IEnumerable<Product>> SearchAll(string key, int perpage, int offset)
        {
            var products3 = await _context.Products.FromSql($"SELECT * FROM PRODUCTS WHERE LOWER(DESCRIPTIONS) LIKE {key} ORDER BY ID").ToListAsync(); 
            var records = products3.OrderBy(p => p.Id).Where(e => e.Id > offset).Take(perpage).ToList();
            return records;
        }

        public IEnumerable<Product> Dataset()
        {
            var products = _context.Products.ToList();
            return products;
        }

        public async Task<Product> CreateProduct(Product prod) {
            try {
                var prodDesc = _context.Products.Where(c => c.Descriptions == prod.Descriptions).FirstOrDefault();
                if (prodDesc is not null) {
                    throw new AppException("Product Description is already exists...");
                }

                var idno = 0;
                try {
                    var x1 = await SeqId();
                    idno = x1 + 1;
                } catch(Exception) {
                    idno = 1;
                }

                var product = new Product {
                    Id = idno,
                    Category = prod.Category,
                    Descriptions = prod.Descriptions,
                    Qty = prod.Qty,
                    Unit = prod.Unit,
                    CostPrice = prod.CostPrice,
                    SellPrice = prod.SellPrice,
                    SalePrice = prod.SalePrice,
                    AlertStocks = prod.AlertStocks,
                    CriticalStocks = prod.CriticalStocks,
                    ProductPicture = prod.ProductPicture,
                    CreatedAt = prod.CreatedAt,
                    UpdatedAt = prod.UpdatedAt
                };

                _context.Products.Add(product);
                await _context.SaveChangesAsync();
                return prod;
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
                if (prod is null) {
                    throw new AppException("Product does'not exists....");
                }
                return prod;
        }        

        public async Task<int> SeqId() {
            var prodmaxId = await _context.Products.MaxAsync(e => e.Id);
            return prodmaxId;
        }

    }
}