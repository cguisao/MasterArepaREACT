import React from "react";
import GenericForm from "../componentsAPI/genericForm";

function IncreaseInventory() {
    return(
        <GenericForm 
            fetchTypesApi = "api/Admin/GetInventoryType" 
            fetchDataApi = "api/Inventory/GetHomeInventoryItem"
            title = "Increase Daily Inventory"
            SubmitApi = "api/Inventory/IncreaseDailyInventory"
        />
    );
}

export default IncreaseInventory;