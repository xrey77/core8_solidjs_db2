using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Google.Authenticator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using core8_solidjs_db2.Services;
using core8_solidjs_db2.Entities;
using core8_solidjs_db2.Models.dto;
using core8_solidjs_db2.Helpers;

namespace core8_solidjs_db2.Controllers.Products
{
    [ApiExplorerSettings(GroupName = "Delete Product")]
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class DeleteProduct : ControllerBase {
        private IProductService _productService;
        private IMapper _mapper;
        private readonly IConfiguration _configuration;  
        private readonly IWebHostEnvironment _env;
        private readonly ILogger<DeleteProduct> _logger;

        public DeleteProduct(
            IConfiguration configuration,
            IWebHostEnvironment env,
            IProductService productService,
            IMapper mapper,
            ILogger<DeleteProduct> logger
            )
        {
            _configuration = configuration;  
            _productService = productService;
            _mapper = mapper;
            _logger = logger;
            _env = env;        
        }  

        [HttpDelete("/api/deleteproduct/{id}")]
        public IActionResult PurgeProduct(int id) {
            try {                
                _productService.ProductDelete(id);
                return Ok(new {message = "Product has been deleted."});
            } catch(AppException ex) {
               return BadRequest(new {message = ex.Message});
            }
        }
    }    
}