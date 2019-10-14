using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Master_Arepa.Data;
using Master_Arepa.Models;
using Master_Arepa.Models.InventoryViewModels;
using Microsoft.AspNetCore.Mvc;
using EFCore.BulkExtensions;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Master_Arepa.Controllers
{
    [Route("api/[controller]")]
    public class FormController : Controller
    {
        public ApplicationDbContext _context;

        public FormController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST api/<controller>
        [HttpPost("[action]")]
        public ActionResult<ContactUs> PageForm([FromForm]ContactUs formValues)
        {
            try
            {
                sendEmail("smtp.ionos.com", 587, "cguisao@masterarepa.com", "Killzone300@@"
                , "cguisao@masterarepa.com", formValues.email, formValues.subject, formValues.message);
                return Ok("The message has been posted successfully!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("[action]")]
        public ActionResult<ContactUs> AddItem([FromForm]AddItem formValues)
        {
            try
            {
                _context.AddItem.Add(new AddItem { Item = formValues.Item });
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        public void sendEmail(string smtpClient, int port, string emailCredential, string passwordCredential,
            string fromEmail, string email, string subject, string message)
        {
            SmtpClient client = new SmtpClient(smtpClient, port);
            client.UseDefaultCredentials = true;
            client.EnableSsl = true;
            client.Credentials = new NetworkCredential(emailCredential, passwordCredential);

            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(fromEmail);
            mailMessage.To.Add(fromEmail);
            mailMessage.Body = message;
            mailMessage.Subject = email + "sent " +subject + " sent from web!";
            client.Send(mailMessage);
        }

    }
}
