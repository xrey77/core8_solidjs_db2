using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using core8_solidjs_db2.Services;
using core8_solidjs_db2.Models.dto;
using core8_solidjs_db2.Helpers;
using core8_solidjs_db2.Models;

namespace core8_solidjs_db2.Controllers.Products
{
    [ApiExplorerSettings(GroupName = "Search Product Description")]
    [ApiController]
    [Route("[controller]")]
    public class SearchController : ControllerBase {

        private IProductService _productService;

        private IMapper _mapper;
        private readonly IConfiguration _configuration;  

        private readonly IWebHostEnvironment _env;

        private readonly ILogger<SearchController> _logger;

        public SearchController(
            IConfiguration configuration,
            IWebHostEnvironment env,
            IProductService productService,
            IMapper mapper,
            ILogger<SearchController> logger
            )
        {
            _configuration = configuration;  
            _productService = productService;
            _mapper = mapper;
            _logger = logger;
            _env = env;        
        }  

        [HttpGet("/api/searchproducts/{page}/{key}")]
        public IActionResult SearchProducts(int page, string key) {
            try {                
                // var totalpage = await _productService.TotPageSearch(page, key);

                // var products = await _productService.SearchAll(page,key);
                // if (products.Count() > 0) {
                //     var model = _mapper.Map<IList<ProductModel>>(products);
                //     return Ok(new {totpage = totalpage, page = page, products=model, message=""});
                    return Ok(new { message="Under construction.."});

                // } else {
                //     return BadRequest(new {statuscode=400, message="No Data found."});
                // }
            } catch(AppException ex) {
               return BadRequest(new {statuscode = 400, message = ex.Message});
            }
        }
    }    
}