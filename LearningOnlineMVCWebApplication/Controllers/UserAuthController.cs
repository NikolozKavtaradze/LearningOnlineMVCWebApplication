using LearningOnlineMVCWebApplication.Data;
using LearningOnlineMVCWebApplication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace LearningOnlineMVCWebApplication.Controllers
{
    public class UserAuthController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationDbContext _context;

        public UserAuthController(UserManager<ApplicationUser> userManager,
                                  SignInManager<ApplicationUser> signInManager, 
                                  ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [AllowAnonymous]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginModel loginModel)
        {
            loginModel.LoginInValid = "true";

            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(loginModel.Email, 
                                                                     loginModel.Password, 
                                                                     loginModel.RememberMe,
                                                                     lockoutOnFailure:false);
                if (result.Succeeded)
                {
                    loginModel.LoginInValid = "";
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Invalid login attempt");
                }
            }
            return PartialView("_UserLoginPartial", loginModel);
        }

        [AllowAnonymous]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout(string returnUrl = null)
        {
            await _signInManager.SignOutAsync();

            if(returnUrl != null)
            {
                return LocalRedirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }   
        }
    }
}
