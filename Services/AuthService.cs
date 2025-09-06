using System;
using System.IO;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using core8_solidjs_db2.Entities;
using core8_solidjs_db2.Helpers;
using core8_solidjs_db2.Models.dto;

namespace core8_solidjs_db2.Services
{    
    public interface IAuthService {
        Task<User> SignupUser(User userdata, string passwd);
        Task<User> SigninUser(string usrname, string pwd);
        Task<int> GetId();
    }

    public class AuthService : IAuthService
    {

        private Db2DbContext _context;
        private readonly AppSettings _appSettings;

         IConfiguration config = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json")
        .AddEnvironmentVariables()
        .Build();

        public AuthService(Db2DbContext context, IOptions<AppSettings> appSettings)
        {
            _context = context;
            _appSettings = appSettings.Value;
        }

        public async Task<User> SignupUser(User userdata, string passwd)
        {
            User xusermail = _context.Users.Where(c => c.Email == userdata.Email).FirstOrDefault();
            if (xusermail is not null) {
                throw new AppException("Email Address was already taken...");
            }

            User xusername = _context.Users.Where(c => c.UserName == userdata.UserName).FirstOrDefault();
            if (xusername is not null) {
                throw new AppException("Username was already taken...");
            }
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var xkey = config["Jwt:Key"];
            var key = Encoding.ASCII.GetBytes(xkey);

            // CREATE SECRET KEY FOR USER TOKEN===============
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, userdata.Email)
                }),
                // Expires = DateTime.UtcNow.AddDays(7),
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var secret = tokenHandler.CreateToken(tokenDescriptor);
            var secretkey = tokenHandler.WriteToken(secret);

            userdata.Secretkey = secretkey.ToUpper();             
            userdata.Password_hash = BCrypt.Net.BCrypt.HashPassword(passwd);
            var idno = 0;
            try {
                var x1 = await GetId();
                idno = x1 + 1;
            } catch(Exception) {
                idno = 1;
            }
            var user = new User {
                Id = idno,
                FirstName = userdata.FirstName,
                LastName = userdata.LastName,
                Email = userdata.Email,
                Mobile = userdata.Mobile,
                UserName = userdata.UserName,
                Password_hash = userdata.Password_hash,
                Roles = userdata.Roles,
                IsActivated = userdata.IsActivated,
                Isblocked = userdata.Isblocked,
                Mailtoken = userdata.Mailtoken,
                Qrcodeurl = null,
                Profilepic = userdata.Profilepic,
                Secretkey = userdata.Secretkey,
                CreatedAt = userdata.CreatedAt,
                UpdatedAt = userdata.UpdatedAt
            };

            try {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                var isUserInserted = _context.Users.First(b => b.FirstName == userdata.FirstName);
                return isUserInserted;
            } catch (Exception ex) {
                throw new AppException(ex.Message);
            }
        }

        public async Task<User> SigninUser(string usrname, string pwd)
        {
           try {
                var xuser = await _context.Users.FirstOrDefaultAsync(p => p.UserName == usrname);
                if (xuser is not null) {
                    if (!BCrypt.Net.BCrypt.Verify(pwd, xuser.Password_hash)) {
                        throw new AppException("Incorrect Password...");
                    }
                    if (xuser.IsActivated == 0) {
                        throw new AppException("Please activate your account, check your email client inbox and click or tap the Activate button.");
                    }
                    return xuser;
                } else {
                    throw new AppException("Username not found, please register first...");
                }
            } catch(AppException ex) {
                    throw new AppException(ex.Message);
            }            
        }

        public async Task<int> GetId() {
            var usermaxId = await _context.Users.MaxAsync(e => e.Id);
            return usermaxId;
        }

    // public void CreateResource()
    // {
    //     return CreatedAtAction(nameof(GetResource), new { id = 1 }, new { id = 1 });
    // }

    }
}