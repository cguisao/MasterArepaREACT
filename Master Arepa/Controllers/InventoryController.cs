using System;
using Master_Arepa.Data;
using Master_Arepa.Models;
using System.Linq;
using Master_Arepa.Models.InventoryViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using EFCore.BulkExtensions;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Text;
using Master_Arepa.Helper;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Calendar.v3;
using Google.Apis.Calendar.v3.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System.Threading;

namespace Master_Arepa.Controllers
{
    [Route("api/[controller]")]
    public class InventoryController : Controller
    {
        public ApplicationDbContext _context;

        private string User { get; set; }

        private string Role { get; set; }

        private string InventoryType { get; set; }

        private string SingleInventory { get; set; }

        private int SingleValue { get; set; }

        private List<HomeInventoryItem> insertItem { get; set; }

        private List<HomeInventoryItem> emailItem { get; set; }

        private List<InventoryOtherItem> emaiOtherlItem { get; set; }

        private List<string> email { get; set; }

        static string[] Scopes = { CalendarService.Scope.CalendarReadonly };

        static string ApplicationName = "Master Arepa";

        public InventoryController(ApplicationDbContext context)
        {
            _context = context;

            insertItem = new List<HomeInventoryItem>();

            emailItem = new List<HomeInventoryItem>();

            emaiOtherlItem = new List<InventoryOtherItem>();

            email = new List<string>();
        }

        [HttpPost("[action]")]
        public ActionResult<dynamic> AddOtherInventory([FromForm] IFormCollection formValues)
        {
            try
            {
                SetUserAndRole(formValues);
                
                // Set Other Inventory Email values
                if (!emailItem.Any())
                    SetOtherEmailValues(formValues);

                string inventoryItemsMes = String.Empty;

                foreach (var item in emaiOtherlItem)
                {
                    inventoryItemsMes = inventoryItemsMes + "<tr>" + "<td>"
                        + item.Item + "</td>" + "<td>" + " Low " + "</td>" + "</tr>";
                }

                SendInventoryEmail("Daily Missing Items " + DateTime.Now.ToShortDateString(), inventoryItemsMes);

                _context.InventoryTimeStamp.Add(new InventoryTimeStamp
                {
                    InventoryType = InventoryType,
                    TimeStamp = DateTime.Now,
                    User = User
                });

                _context.SaveChanges();

                return Ok(new APIResponse { response = "SuccessNoMessage" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("[action]")]
        public ActionResult<dynamic> AddFoodTruckInventory([FromForm] IFormCollection formValues)
        {
            try
            {
                SetUserAndRole(formValues);
                // Set Home Inventory Email values
                SetEmailValues(formValues);

                string inventoryItemsMes = String.Empty;

                foreach (var item in emailItem)
                {
                    inventoryItemsMes = inventoryItemsMes + "<tr>" + "<td>"
                        + item.Item + "</td>" + "<td>" + item.Quantity + "</td>" + "</tr>";
                }

                SendInventoryEmail("Daily Inventory on " + DateTime.Now.ToShortDateString(), inventoryItemsMes);

                _context.InventoryTimeStamp.Add(new InventoryTimeStamp
                {
                    InventoryType = Models.InventoryType.Home.ToString(),
                    TimeStamp = DateTime.Now,
                    User = User
                });

                _context.SaveChanges();

                return Ok(new APIResponse { response = "Success", popup = true });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("[action]")]
        public ActionResult<dynamic> IncreaseDailyInventory([FromForm] IFormCollection formValues)
        {
            try
            {
                SetUserAndRole(formValues);

                var lastRecordDate = _context.HomeInventoryItem
                    .OrderByDescending(x => x.TimeStamp).FirstOrDefault();

                if (lastRecordDate != null && DatesAreInTheSameWeek(lastRecordDate.TimeStamp, DateTime.Now))
                {
                    SetHomeQuantity(formValues, lastRecordDate, -1);
                }
                else
                {
                    SetNewHomeRecord(formValues, -1);
                }

                _context.InventoryTimeStamp.Add(new InventoryTimeStamp
                {
                    InventoryType = Models.InventoryType.Home.ToString(),
                    TimeStamp = DateTime.Now,
                    User = User
                });

                _context.SaveChanges();

                SetEmailValues(formValues);

                string inventoryItemsMes = String.Empty;

                foreach (var item in emailItem)
                {
                    inventoryItemsMes = inventoryItemsMes + "<tr>" + "<td>"
                        + item.Item + "</td>" + "<td>" + item.Quantity + "</td>" + "</tr>";
                }

                SendInventoryEmail("Add Inventory in: " + InventoryType + " done by: " + User + " ", inventoryItemsMes);

                _context.InventoryTimeStamp.Add(new InventoryTimeStamp
                {
                    InventoryType = Models.InventoryType.Home.ToString(),
                    TimeStamp = DateTime.Now,
                    User = User
                });

                _context.SaveChanges();

                return Ok(new APIResponse { response = "Success", popup = false });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("[action]")]
        public ActionResult<dynamic> HomeInventory([FromForm] IFormCollection formValues)
        {
            try
            {
                SetUserAndRole(formValues);

                SetUserSingleValues(formValues);

                SetHomeVariables(formValues);

                SetTimeStamp();

                SetEmailValues(formValues);

                string inventoryItemsMes = SetEmailMessage();

                SendInventoryEmail("Weekly Inventory on " + DateTime.Now.ToShortDateString(), inventoryItemsMes);

                return Ok(new APIResponse { response = "Success" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        private string SetEmailMessage()
        {
            string inventoryItemsMes = String.Empty;

            foreach (var item in emailItem)
            {
                inventoryItemsMes = inventoryItemsMes + "<tr>" + "<td>"
                    + item.Item + "</td>" + "<td>" + item.Quantity + "</td>" + "</tr>";
            }

            return inventoryItemsMes;
        }

        private void SetTimeStamp()
        {
            _context.InventoryTimeStamp.Add(new InventoryTimeStamp
            {
                InventoryType = Models.InventoryType.Home.ToString(),
                TimeStamp = DateTime.Now,
                User = User
            });

            _context.SaveChanges();
        }

        private void SetHomeVariables(IFormCollection formValues)
        {
            var lastRecordDate = _context.HomeInventoryItem
                                .OrderByDescending(x => x.TimeStamp).FirstOrDefault();

            if (lastRecordDate != null && DatesAreInTheSameWeek(lastRecordDate.TimeStamp, DateTime.Now))
            {
                SetHomeQuantity(formValues, lastRecordDate, 1);
            }
            else
            {
                SetNewHomeRecord(formValues, 1);
            }
        }

        [HttpGet("[action]")]
        public ActionResult<HomeInventoryItem> GetHomeInventoryItem()
        {
            //UserCredential credential;

            //using (var stream =
            //    new FileStream("credentials.json", FileMode.Open, FileAccess.Read))
            //{
            //    // The file token.json stores the user's access and refresh tokens, and is created
            //    // automatically when the authorization flow completes for the first time.
            //    string credPath = "token.json";
            //    credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
            //        GoogleClientSecrets.Load(stream).Secrets,
            //        Scopes,
            //        "user",
            //        CancellationToken.None,
            //        new FileDataStore(credPath, true)).Result;
            //    Console.WriteLine("Credential file saved to: " + credPath);
            //}

            //// Create Google Calendar API service.
            //var service = new CalendarService(new BaseClientService.Initializer()
            //{
            //    HttpClientInitializer = credential,
            //    ApplicationName = ApplicationName,
            //});

            //// Define parameters of request.
            //EventsResource.ListRequest request = service.Events.List("primary");
            //request.TimeMin = DateTime.Now;
            //request.ShowDeleted = false;
            //request.SingleEvents = true;
            //request.MaxResults = 10;
            //request.OrderBy = EventsResource.ListRequest.OrderByEnum.StartTime;

            //// List events.
            //Events events = request.Execute();
            ////Console.WriteLine("Upcoming events:");
            //if (events.Items != null && events.Items.Count > 0)
            //{
            //    foreach (var eventItem in events.Items)
            //    {
            //        string when = eventItem.Start.DateTime.ToString();
            //        if (String.IsNullOrEmpty(when))
            //        {
            //            when = eventItem.Start.Date;
            //        }
            //        //Console.WriteLine("{0} ({1})", eventItem.Summary, when);
            //    }
            //}
            //else
            //{
            //    //Console.WriteLine("No upcoming events found.");
            //}

            return Ok(_context.HomeInventoryItem.Where(x  => DatesAreInTheSameWeek(x.TimeStamp, DateTime.Today)));

        }

        [HttpGet("[action]")]
        public ActionResult<HomeInventoryItem> GetInventoryItemType()
        {
            return Ok(_context.InventoryItemType.ToList());
        }

        private void SendInventoryEmail(string subject, string inventoryItemsMes)
        {
            EmailHelper helper = new EmailHelper();

            string message = "";

            string path = String.Empty;

            path = Path.Combine(Directory.GetCurrentDirectory(),
                            "ClientApp", "build", "Templates", "InventoryEmail.html");

#if DEBUG
            path = Path.Combine(Directory.GetCurrentDirectory(),
                            "ClientApp", "public", "Templates", "InventoryEmail.html");
#endif
            var fileStream = new FileStream(@path, FileMode.Open, FileAccess.Read);

            string line;
            using (var streamReader = new StreamReader(fileStream, Encoding.UTF8))
            {
                while ((line = streamReader.ReadLine()) != null)
                {
                    message = message + line;
                }
            }

            message = message.Replace("InventoryDate", DateTime.Now.ToShortDateString());

            message = message.Replace("InventoryUser", User);

            message = message.Replace("InventoryType", InventoryType);

            message = message.Replace("InventoryItems", inventoryItemsMes);

#if DEBUG
            email.Add("cguisao@masterarepa.com");
            helper.sendEmail("smtp.gmail.com", 587, "cguisao@masterarepa.com", "lotero321"
                , email, subject, message);
#else
            email.Add("cguisao@masterarepa.com");
            email.Add("bulltradeus@gmail.com");
            email.Add("ruthpanqueva1@gmail.com");
            email.Add("marceosorno0810@gmail.com");
            email.Add("walterperez79@gmail.com");
            helper.sendEmail("smtp.gmail.com", 587, "cguisao@masterarepa.com", "lotero321"
                , email, subject, message);
#endif


        }

        public void SetNewHomeRecord(IFormCollection formValues, int setter)
        {
            if (!String.IsNullOrEmpty(SingleInventory))
            {
                insertItem.Add(new HomeInventoryItem
                {
                    Item = SingleInventory,
                    Quantity = SingleValue,
                    Role = Role,
                    User = User,
                    TimeStamp = DateTime.Now
                });
            }
            else
            {
                foreach (var item in formValues)
                {
                    int s = -9999;
                    if (Int32.TryParse(item.Value, out s))
                    {
                        insertItem.Add(new HomeInventoryItem
                        {
                            Item = item.Key,
                            Quantity = Int32.Parse(item.Value) * setter,
                            Role = Role,
                            User = User,
                            TimeStamp = DateTime.Now
                        });
                    }
                }
            }

            _context.BulkInsert(insertItem);

        }

        private void SetEmailValues(IFormCollection formValues)
        {
            foreach (var item in formValues)
            {
                int s = -9999;
                if (Int32.TryParse(item.Value, out s))
                {
                    emailItem.Add(new HomeInventoryItem
                    {
                        Item = item.Key,
                        Quantity = Int32.Parse(item.Value),
                        Role = Role,
                        User = User,
                        TimeStamp = DateTime.Now
                    });
                }
            }
        }

        private void SetOtherEmailValues(IFormCollection formValues)
        {
            foreach (var item in formValues)
            {
                if (item.Key == "User")
                    User = item.Value;
                else if (item.Key == "InventoryType")
                    InventoryType = item.Value;
                else if (item.Key == "Role")
                {
                    Role = item.Value;
                }
                else
                {
                    emaiOtherlItem.Add(new InventoryOtherItem
                    {
                        Item = item.Key
                    });
                }
            }
        }

        private void SetHomeQuantity(IFormCollection formValues, HomeInventoryItem lastRecordDate, int setter)
        {
            // Get the items from the same week and update those items
            var thisWeekItems = _context.HomeInventoryItem
                .Where(x => x.TimeStamp.ToShortDateString() == lastRecordDate.TimeStamp.ToShortDateString())
                    .AsNoTracking().ToList();

            if(!String.IsNullOrEmpty(SingleInventory))
            {
                int currId = thisWeekItems
                            .Where(y => y.Item.Equals(SingleInventory))
                                .Select(x => x.Id)
                                    .FirstOrDefault();

                int currQuantity = thisWeekItems
                    .Where(y => y.Item.Equals(SingleInventory))
                        .Select(x => x.Quantity)
                            .FirstOrDefault();
                insertItem.Add(new HomeInventoryItem
                {
                    Id = currId,
                    Item = SingleInventory,
                    Quantity = SingleValue * setter + currQuantity,
                    Role = Role,
                    User = User,
                    TimeStamp = DateTime.Now
                });
            }
            else
            {
                foreach (var item in formValues)
                {
                    int s = -9999;
                    if (Int32.TryParse(item.Value, out s))
                    {
                        int currId = thisWeekItems
                            .Where(y => y.Item.Equals(item.Key))
                                .Select(x => x.Id)
                                    .FirstOrDefault();

                        int currQuantity = thisWeekItems
                            .Where(y => y.Item.Equals(item.Key))
                                .Select(x => x.Quantity)
                                    .FirstOrDefault();

                        insertItem.Add(new HomeInventoryItem
                        {
                            Id = currId,
                            Item = item.Key,
                            Quantity = Int32.Parse(item.Value) * setter + currQuantity,
                            Role = Role,
                            User = User,
                            TimeStamp = DateTime.Now
                        });
                    }
                }
            }
            
            _context.BulkInsertOrUpdate(insertItem);
        }

        private void SetUserAndRole(IFormCollection formValues)
        {
            foreach (var item in formValues)
            {
                if (item.Key == nameof(User))
                {
                    User = item.Value;
                }
                else if (item.Key == nameof(InventoryType))
                {
                    InventoryType = item.Value;
                }
                else if (item.Key == nameof(Role))
                {
                    Role = item.Value;
                    break;
                }
            }
        }

        private void SetUserSingleValues(IFormCollection formValues)
        {
            foreach (var item in formValues)
            {
                if (item.Key == nameof(SingleInventory))
                    SingleInventory = item.Value;
                else if (item.Key == nameof(SingleValue))
                {
                    int val = 99;
                    int.TryParse(item.Value.ToString(), out val);
                    SingleValue = val;
                    break;
                }
            }
        }

        private bool DatesAreInTheSameWeek(DateTime date1, DateTime date2)
        {
            var cal = System.Globalization.DateTimeFormatInfo.CurrentInfo.Calendar;

            // If it is Sunday we need different logic

            if (date2.DayOfWeek == DayOfWeek.Sunday)
            {
                var d3 = date1.Date.AddDays(-1 * ((int)cal.GetDayOfWeek(date1.AddDays(-1)) - 1));
                var d4 = date2.Date.AddDays(-1 * ((int)cal.GetDayOfWeek(date2.AddDays(-1)) - 1));
                return d3 == d4;
            }
            else
            {
                var d1 = date1.Date.AddDays(-1 * ((int)cal.GetDayOfWeek(date1) - 1));
                var d2 = date2.Date.AddDays(-1 * ((int)cal.GetDayOfWeek(date2) - 1));
                return d1 == d2;
            }
        }
    }
}