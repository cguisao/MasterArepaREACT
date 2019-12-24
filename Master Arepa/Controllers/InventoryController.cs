﻿using System;
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

namespace Master_Arepa.Controllers
{
    [Route("api/[controller]")]
    public class InventoryController : Controller
    {
        public ApplicationDbContext _context;

        private string user { get; set; }

        private string role { get; set; }

        private string type { get; set; }

        private List<HomeInventoryItem> insertItem { get; set; }

        private List<HomeInventoryItem> emailItem { get; set; }

        private List<InventoryOtherItem> emaiOtherlItem { get; set; }

        private List<string> email { get; set; }

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
                    InventoryType = type,
                    TimeStamp = DateTime.Now,
                    User = user
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
                    InventoryType = InventoryType.Home.ToString(),
                    TimeStamp = DateTime.Now,
                    User = user
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
                    InventoryType = InventoryType.Home.ToString(),
                    TimeStamp = DateTime.Now,
                    User = user
                });

                _context.SaveChanges();

                SetEmailValues(formValues);

                string inventoryItemsMes = String.Empty;

                foreach (var item in emailItem)
                {
                    inventoryItemsMes = inventoryItemsMes + "<tr>" + "<td>"
                        + item.Item + "</td>" + "<td>" + item.Quantity + "</td>" + "</tr>";
                }

                SendInventoryEmail("Add Inventory in: " + type + " done by: " + user + " ", inventoryItemsMes);

                _context.InventoryTimeStamp.Add(new InventoryTimeStamp
                {
                    InventoryType = InventoryType.Home.ToString(),
                    TimeStamp = DateTime.Now,
                    User = user
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
        public ActionResult<dynamic> HomeInventory([FromForm] IFormCollection formValues)
        {
            try
            {
                SetUserAndRole(formValues);

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

                _context.InventoryTimeStamp.Add(new InventoryTimeStamp
                {
                    InventoryType = InventoryType.Home.ToString(),
                    TimeStamp = DateTime.Now,
                    User = user
                });

                _context.SaveChanges();

                SetEmailValues(formValues);

                string inventoryItemsMes = String.Empty;

                foreach (var item in emailItem)
                {
                    inventoryItemsMes = inventoryItemsMes + "<tr>" + "<td>"
                        + item.Item + "</td>" + "<td>" + item.Quantity + "</td>" + "</tr>";
                }

                SendInventoryEmail("Weekly Inventory on " + DateTime.Now.ToShortDateString(), inventoryItemsMes);

                return Ok(new APIResponse { response = "Success" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("[action]")]
        public ActionResult<HomeInventoryItem> GetHomeInventoryItem()
        {
            var cal = System.Globalization.DateTimeFormatInfo.CurrentInfo.Calendar;

            return Ok(_context.HomeInventoryItem
                .Where(x => x.TimeStamp.Date.
                    AddDays(-1 * ((int)cal.GetDayOfWeek(x.TimeStamp))-1) == 
                        DateTime.Today.Date.AddDays(-1 * ((int)cal.GetDayOfWeek(DateTime.Today))-1)));
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

            message = message.Replace("InventoryUser", user);

            message = message.Replace("InventoryType", type);

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
            foreach (var item in formValues)
            {
                int s = -9999;
                if (Int32.TryParse(item.Value, out s))
                {
                    insertItem.Add(new HomeInventoryItem
                    {
                        Item = item.Key,
                        Quantity = Int32.Parse(item.Value) * setter,
                        Role = role,
                        User = user,
                        TimeStamp = DateTime.Now
                    });
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
                        Role = role,
                        User = user,
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
                    user = item.Value;
                else if (item.Key == "InventoryType")
                    type = item.Value;
                else if (item.Key == "Role")
                {
                    role = item.Value;
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
                        Role = role,
                        User = user,
                        TimeStamp = DateTime.Now
                    });
                }
            }
            _context.BulkInsertOrUpdate(insertItem);
        }

        private void SetUserAndRole(IFormCollection formValues)
        {
            foreach (var item in formValues)
            {
                if (item.Key == "User")
                    user = item.Value;
                else if (item.Key == "InventoryType")
                    type = item.Value;
                else if (item.Key == "Role")
                {
                    role = item.Value;
                    break;
                }
            }
        }

        private bool DatesAreInTheSameWeek(DateTime date1, DateTime date2)
        {
            var cal = System.Globalization.DateTimeFormatInfo.CurrentInfo.Calendar;
            
            var d1 = date1.Date.AddDays(-1 * ((int)cal.GetDayOfWeek(date1)-1));
            
            var d2 = date2.Date.AddDays(-1 * ((int)cal.GetDayOfWeek(date2)-1));

            return d1 == d2;
        }
    }
}