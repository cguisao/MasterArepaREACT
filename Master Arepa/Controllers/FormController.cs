using System.Net;
using System.Net.Mail;
using Master_Arepa.Models;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text;
using System;
using Master_Arepa.Helper;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Master_Arepa.Controllers
{
    [Route("api/[controller]")]
    public class FormController : Controller
    {
        // POST api/<controller>
        [HttpPost("[action]")]
        public ActionResult<ContactUs> PageForm([FromForm]ContactUs formValues)
        {
            try
            {
                EmailHelper helper = new EmailHelper();

                string subject = formValues.subject;

                string message = "";

                string path = Path.Combine(Directory.GetCurrentDirectory(),
                                "ClientApp", "build", "Templates", "MainPage.html");
                var fileStream = new FileStream(@path, FileMode.Open, FileAccess.Read);

                string line;
                using (var streamReader = new StreamReader(fileStream, Encoding.UTF8))
                {
                    while ((line = streamReader.ReadLine()) != null)
                    {
                        message = message + line;
                    }
                }

                message = message.Replace("emailUser", formValues.email);

                message = message.Replace("emailBody", formValues.message);

                helper.sendEmail("smtp.gmail.com", 587, "cguisao@masterarepa.com", "lotero321"
                , "cguisao@masterarepa.com", subject, message);

                return Ok(new APIResponse { response = "Success" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
