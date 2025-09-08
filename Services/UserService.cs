using System;
using System.IO;
using System.Collections.Generic;
using Microsoft.Extensions.Options;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using core8_solidjs_db2.Entities;
using core8_solidjs_db2.Helpers;

namespace core8_solidjs_db2.Services
{
    public interface IUserService {
        IEnumerable<User> GetAll();
        User GetById(int id);
        void UpdateProfile(User user);
        void Delete(int id);
        void ActivateMfa(int id, bool opt, string qrcode_url);
        void UpdatePicture(int id, string file);
        void UpdatePassword(User user, string password = null);
        int EmailToken(int etoken);
        Task<int> SendEmailToken(string email);
        void ActivateUser(int id);
        Task<bool> ChangePassword(User userParam);
    }

    public class UserService : IUserService
    {
        private Db2DbContext _context;
        private readonly AppSettings _appSettings;

         IConfiguration config = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json")
        .AddEnvironmentVariables()
        .Build();

        public UserService(Db2DbContext context,IOptions<AppSettings> appSettings)
        {
            _context = context;
            _appSettings = appSettings.Value;
        }

        public void Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user is not null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
            else {
               throw new AppException("User not found");
            }   
        }

        public IEnumerable<User> GetAll()
        {
            var users = _context.Users.ToList();
            return users;
        }

        public User GetById(int id)
        {
                var user = _context.Users.Find(id);
                if (user is null) {
                    throw new AppException("User does'not exists....");
                }
                return user;
        }

        public void UpdateProfile(User userParam)
        {
            var user = _context.Users.Find(userParam.Id);
            if (user == null)
                throw new AppException("User not found");

            if (!string.IsNullOrWhiteSpace(userParam.FirstName)) {
                user.FirstName = userParam.FirstName;
            }

            if (!string.IsNullOrWhiteSpace(userParam.LastName)) {
                user.LastName = userParam.LastName;
            }

            if (!string.IsNullOrWhiteSpace(userParam.Mobile)) {
                user.Mobile = userParam.Mobile;
            }

            DateTime now = DateTime.Now;
            user.UpdatedAt = now;
            _context.Users.Update(user);
            _context.SaveChanges();            
        }

        public void UpdatePassword(User userParam, string password = null)
        {
            var user = _context.Users.Find(userParam.Id);
            if (user is null)
                throw new AppException("User not found");

            if (!string.IsNullOrWhiteSpace(userParam.Password_hash))
            {
                 user.Password_hash = BCrypt.Net.BCrypt.HashPassword(userParam.Password_hash);

            }
            DateTime now = DateTime.Now;
            user.UpdatedAt = now;
            _context.Users.Update(user);
            _context.SaveChanges();                        
        }


        public void ActivateMfa(int id, bool opt, string qrcode_url)
        {
           var user = _context.Users.Find(id);
            if (user != null)
            {
                if (opt == true ) {

                    user.Qrcodeurl = qrcode_url;
                } else {
                    user.Qrcodeurl = null;
                }
                _context.Users.Update(user);
                _context.SaveChanges();
            }
            else {
               throw new AppException("User not found");
            }                    }

        public void UpdatePicture(int id, string file)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                user.Profilepic = file;
                _context.Users.Update(user);
                _context.SaveChanges();
            }
            else {
               throw new AppException("User not found");
            }                    
        }

       public void ActivateUser(int id) 
       {
            var user = _context.Users.Find(id);
            if (user.Isblocked == 1) {
                throw new AppException("Account has been blocked.");
            }
            if ( user.IsActivated == 1) {
                throw new AppException("Account is alread activated.");
            }
            user.IsActivated = 1;
            if (user == null)
            {
                throw new AppException("User not found");
            }
            _context.Users.Update(user);
            _context.SaveChanges();            
       }

        //CREATE MAILTOKEN AND SENT TO REGISTERED USER EMAIL
        public async Task<int> SendEmailToken(string email)
        {
           var user = await _context.Users.Where(c => c.Email == email).FirstOrDefaultAsync();
           if (user is null) {
                throw new AppException("Email Address not found...");
           } else {
                var etoken = EmailToken(user.Mailtoken);
                user.Mailtoken = etoken;
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
                return etoken;
           }
        }       

        //CREATE MAILTOKEN
        public int EmailToken(int etoken)
        {
            if (etoken == 0) {
                etoken = 1000;
            }
            int _min = etoken;
            int _max = 9999;
            Random _rdm = new Random();
            return _rdm.Next(_min, _max);
        }

        public async Task<bool> ChangePassword(User userParam)
        {
            var xuser = await _context.Users.Where(c => c.UserName == userParam.UserName).FirstOrDefaultAsync();
            if (xuser is null) {
                throw new AppException("Email Address not found, please user your account email...");
            } else {
                if (xuser.Mailtoken == userParam.Mailtoken) {
                    xuser.Password_hash = BCrypt.Net.BCrypt.HashPassword(userParam.Password_hash);
                    xuser.Mailtoken = 0;
                    _context.Users.Update(xuser);
                    _context.SaveChanges();                    
                } else {
                    throw new AppException("Invalid Mailtoken, please use Mailtoken that was Emailed to you....");
                }
            }
            return true;
        }



    }
}