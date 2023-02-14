using API.Entities;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Data
{
    public class Seed
    {
        public static void SeedUsers(UserManager<AppUser> userManager, 
            RoleManager<AppRole> roleManager)
        {
            if (userManager.Users.Any()) return;

            var userData = File.ReadAllText("Data/UserSeedData.json");

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            var roles = new List<AppRole>
            {
                new AppRole
                {
                    Name = "Member"
                },
                new AppRole
                {
                    Name = "Admin"
                },
                new AppRole
                {
                    Name = "Moderator"
                }
            };

            foreach(var role in roles)
            {
                roleManager.CreateAsync(role);
            }

            foreach(var user in users)
            { 
                user.UserName = user.UserName.ToLower();

                userManager.CreateAsync(user, "Pa$$w0rd");

                userManager.AddToRoleAsync(user, "Member");
            }

            var admin = new AppUser
            {
                UserName = "admin"
            };

            userManager.CreateAsync(admin, "Pa$$w0rd");
            userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });
        }
    }
}
