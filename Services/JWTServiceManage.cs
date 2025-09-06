using AutoMapper.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using System;
using core8_solidjs_db2.Helpers;
using core8_solidjs_db2.Entities;

namespace core8_solidjs_db2.Services
{
    public interface IJWTTokenServices
    {
        JWTTokens Authenticate(User users);
    }
    public class JWTServiceManage : IJWTTokenServices
    {
        private readonly IConfiguration _configuration;
        private readonly Db2DbContext _context;


         IConfiguration config = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json")
        .AddEnvironmentVariables()
        .Build();

 
        public JWTServiceManage(IConfiguration configuration, Db2DbContext context)
        {
            _context = context;
            _configuration = configuration;

        }
        public JWTTokens Authenticate(User users)
        {
             
            if (!_context.Users.Any(e => e.UserName == users.UserName && e.Password_hash == users.Password_hash))
            {
                return null;            
            }
 
            var tokenhandler = new JwtSecurityTokenHandler();
            var tkey = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var ToeknDescp = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, users.UserName)
                }),
                Expires = DateTime.UtcNow.AddMinutes(5),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tkey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenhandler.CreateToken(ToeknDescp);
 
            return new JWTTokens { Token = tokenhandler.WriteToken(token) };
 
        }
    }    
    
}