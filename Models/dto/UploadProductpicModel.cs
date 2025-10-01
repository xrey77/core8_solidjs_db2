using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace core8_solidjs_db2.Models.dto
{
    public class UploadProductpicModel {
        public int Id { get; set; }
        public IFormFile ProductPicture { get; set; }
    }    
}