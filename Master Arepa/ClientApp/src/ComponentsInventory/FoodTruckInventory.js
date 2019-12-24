import React from "react";
import GenericForm from "../componentsAPI/genericForm";

const FoodTruckInventory = () => {
    
    return(
        <GenericForm 
            fetchTypesApi = "api/Admin/GetInventoryType" 
            fetchDataApi = "api/Inventory/GetHomeInventoryItem"
            title = "Daily Inventory"
            SubmitApi = "api/Inventory/AddFoodTruckInventory"
        />
    );
}

export default FoodTruckInventory;