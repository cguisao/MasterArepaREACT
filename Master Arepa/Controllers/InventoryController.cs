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

namespace Master_Arepa.Controllers
{
    [Route("api/[controller]")]
    public class InventoryController : Controller
    {
        public ApplicationDbContext _context;

        private string user { get; set; }

        private string role { get; set; }

        private List<HomeInventoryItem> insertItem { get; set; }

        public InventoryController(ApplicationDbContext context)
        {
            _context = context;

            insertItem = new List<HomeInventoryItem>();
        }

        [HttpPost("[action]")]
        public ActionResult<dynamic> AddFoodTruckInventory([FromForm] IFormCollection formValues)
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

                _context.InventoryTimeStamp.Add(new InventoryTimeStamp
                {
                    InventoryType = InventoryType.FoodTruck.ToString(),
                    TimeStamp = DateTime.Now,
                    User = user
                });

                _context.SaveChanges();

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok(new APIResponse { response = "Success" });
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
                    SetNewHomeRecord(formValues);
                }

                _context.InventoryTimeStamp.Add(new InventoryTimeStamp
                {
                    InventoryType = InventoryType.Home.ToString(),
                    TimeStamp = DateTime.Now,
                    User = user
                });

                _context.SaveChanges();

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
            return Ok(_context.HomeInventoryItem.ToList().OrderByDescending(x => x.TimeStamp).Take(_context.InventoryItem.Count()));
        }

        [HttpGet("[action]")]
        public ActionResult<HomeInventoryItem> GetInventoryItemType()
        {
            return Ok(_context.InventoryItemType.ToList());
        }

        public void SetNewHomeRecord(IFormCollection formValues)
        {
            foreach (var item in formValues)
            {
                if (!item.Key.Equals("User"))
                {
                    if (!item.Key.Equals("Role"))
                    {
                        insertItem.Add(new HomeInventoryItem
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
            _context.BulkInsert(insertItem);
        }

        public void SetHomeQuantity(IFormCollection formValues, HomeInventoryItem lastRecordDate, int setter)
        {
            // Get the items from the same week and update those items
            var thisWeekItems = _context.HomeInventoryItem
                .Where(x => x.TimeStamp.ToShortDateString() == lastRecordDate.TimeStamp.ToShortDateString())
                    .AsNoTracking().ToList();
            foreach (var item in formValues)
            {
                if (!item.Key.Equals("User"))
                {
                    if (!item.Key.Equals("Role"))
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
            }
            _context.BulkUpdate(insertItem);
        }

        public void SetUserAndRole(IFormCollection formValues)
        {
            foreach (var item in formValues)
            {
                if (item.Key == "User")
                    user = item.Value;
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
            
            var d1 = date1.Date.AddDays(-1 * (int)cal.GetDayOfWeek(date1));
            
            var d2 = date2.Date.AddDays(-1 * (int)cal.GetDayOfWeek(date2));

            return d1 == d2;
        }
    }
}