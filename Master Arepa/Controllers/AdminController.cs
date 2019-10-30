using System;
using System.Linq;
using Master_Arepa.Data;
using Master_Arepa.Models;
using Master_Arepa.Models.InventoryViewModels;
using Microsoft.AspNetCore.Mvc;

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

                // if Inventory Item already exists
                if(allInventory.ContainsKey(formValues.Item))
                {
                    return Ok( new APIResponse { response = "Error", error = "Value already in the database!" });  
                }

                // If Inventory Item has been added successfully
                else{
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

        [HttpGet("[action]")]
        public ActionResult<InventoryItem> GetInventoryItem()
        {
            return Ok(_context.InventoryItem.ToList());
        }
    }
}