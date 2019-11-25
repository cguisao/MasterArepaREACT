const handleSubmit = url => event => {
    console.log(url);
    event.preventDefault();
    const data = new FormData(event.target);

    fetch(url, {
        method: 'POST',
        body: data
    }).then(function(response){
        return response.json();
    }).then(function(data){
        if(data.response != undefined){
            // Show that nothing went wrong
            // Show that Item is already in the database
            if(data.response == "SuccessNoMessage"){
                console.log("Item added successfully!");
            }
            else if(data.response == "Success"){
                alert("Item added successfully!");
            }
            // Show that the Item has successfully been added then reload the page
            else if(data.response == "Error"){
                alert(data.error);
            }
        }
        else{
            // Show that there is an error on the server
            console.log("Error on server info: \n" + "data.response" + data.ClassName + "\n" + "data.response" + data.response);
        }
    }).catch(function(err){
        console.log("Server completely down info: \n" + err);
    })
}

export default handleSubmit;