import React from "react";
import GenericForm from "../componentsAPI/genericForm";

function MainInventory() {
    return(
        <GenericForm 
            fetchTypesApi = "api/Admin/GetInventoryType" 
            fetchDataApi = "api/Admin/GetInventoryItem"
            title = "Home Inventory"
            SubmitApi = "api/Inventory/HomeInventory"
        />
    );
}

export default MainInventory;