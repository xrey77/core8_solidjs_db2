using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using core8_solidjs_db2.Services;
using core8_solidjs_db2.Models.dto;
using core8_solidjs_db2.Helpers;

namespace core8_solidjs_db2.Controllers.Products
{
    [ApiExplorerSettings(GroupName = "List All Products")]
    [ApiController]
    [Route("[controller]")]
    public class ListController : ControllerBase {

        private IProductService _productService;

        private IMapper _mapper;
        private readonly IConfiguration _configuration;  

        private readonly IWebHostEnvironment _env;

        private readonly ILogger<ListController> _logger;

        public ListController(
            IConfiguration configuration,
            IWebHostEnvironment env,
            IProductService productService,
            IMapper mapper,
            ILogger<ListController> logger
            )
        {
            _configuration = configuration;  
            _productService = productService;
            _mapper = mapper;
            _logger = logger;
            _env = env;        
        }  

        [HttpGet("/api/listproducts/{page}")]
        public async Task<IActionResult> ListProducts(int page) {
            try {   
                int totalpage = _productService.TotPage();
                int perpage = 5;
                int offset = (page - 1) * perpage;
                var products = await _productService.ListAll(perpage, offset);                
                var model = _mapper.Map<IList<ProductModel>>(products);                
                return Ok(new {totpage = totalpage, page = page, products=model});
            } catch(AppException ex) {
               return BadRequest(new { message = ex.Message});
            }
        }
    }    
}