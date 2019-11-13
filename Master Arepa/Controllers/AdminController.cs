using System;
using System.Collections.Generic;
using System.Linq;
using EFCore.BulkExtensions;
using Master_Arepa.Data;
using Master_Arepa.Models;
using Master_Arepa.Models.InventoryViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Master_Arepa.Controllers
{
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        public ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("[action]")]
        public ActionResult<InventoryItem> AddItem([FromForm]InventoryItem formValues)
        {
            try
            {
                var allInventory = _context.InventoryItem.ToDictionary(x => x.Item);

                if(allInventory.ContainsKey(formValues.Item))
                {
                    return Ok( new APIResponse { response = "Error", error = "Value already in the database!" });  
                }
                else
                {
                    var lastRecordDate = _context.HomeInventoryItem
                        .OrderByDescending(x => x.TimeStamp).FirstOrDefault();

                    if (lastRecordDate != null && DatesAreInTheSameWeek(lastRecordDate.TimeStamp, DateTime.Now))
                    {
                        _context.HomeInventoryItem.Add(new HomeInventoryItem
                        {
                            Item = formValues.Item,
                            Quantity = 0,
                            TimeStamp = DateTime.Now
                        });
                    }

                    _context.InventoryItem.Add(new InventoryItem { Item = formValues.Item });
                    _context.SaveChanges();
                    return Ok( new APIResponse { response = "Success" });  
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("[action]")]
        public ActionResult<InventoryItemType> AddItemType([FromForm]InventoryItemType formValues)
        {
            try
            {
                var allInventory = _context.InventoryItemType.ToDictionary(x => x.Type);

                if (allInventory.ContainsKey(formValues.Type))
                {
                    return Ok(new APIResponse { response = "Error", error = "Value already in the database!" });
                }
                else
                {
                    _context.InventoryItemType.Add(new InventoryItemType { Type = formValues.Type });
                    _context.SaveChanges();
                    return Ok(new APIResponse { response = "Success" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("[action]")]
        public ActionResult<InventoryItem> GetInventoryItem()
        {
            return Ok(_context.InventoryItem.ToList());
        }

        [HttpGet("[action]")]
        public ActionResult<InventoryItem> GetInventoryType()
        {
            return Ok(_context.InventoryItemType.ToList());
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