using System.Collections.Generic;
using System.Net;
using System.Net.Mail;

namespace Master_Arepa.Helper
{
    public class EmailHelper
    {
        public void sendEmail(string smtpClient, int port, string emailCredential, string passwordCredential,
            List<string> fromEmail, string subject, string message)
        {
            SmtpClient client = new SmtpClient(smtpClient, port);
            client.UseDefaultCredentials = true;
            client.EnableSsl = true;
            client.Credentials = new NetworkCredential(emailCredential, passwordCredential);

            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(emailCredential);
            foreach (var email in fromEmail)
            {
                mailMessage.To.Add(email);
            }
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = message;
            mailMessage.Subject = subject;
            client.Send(mailMessage);
        }
    }
}
