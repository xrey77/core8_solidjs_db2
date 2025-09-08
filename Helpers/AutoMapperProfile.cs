using AutoMapper;
using core8_solidjs_db2.Entities;
using core8_solidjs_db2.Models.dto;

namespace core8_solidjs_db2.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserModel>();
            CreateMap<UserRegister, User>();
            CreateMap<UserLogin, User>();
            CreateMap<UserUpdate, User>();
            CreateMap<UserPasswordUpdate, User>();
            CreateMap<Product, ProductModel>();
             CreateMap<ProductModel, Product>();

        }
    }
    

}