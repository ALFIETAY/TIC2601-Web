const serverPort = 5001;

//create superset
export const createSuperset = async(data, token) =>{
    console.log(data);
    try{
        const response = await fetch (`http://localhost:${serverPort}/api/superset/create`,{
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': `bearer ${token}`
           },
           body: JSON.stringify(data),
       });

       //return creasted supersetID if successful
       if (response.status === 200){
           return response.superset_id;
       }
   }
   catch (error){
       console.log(error);
   }
}

//remove superset
export const removeSuperset = async(data, token) =>{
    try{
        const response = await fetch(`http://localhost:${serverPort}/api/superset/remove`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            body: JSON.stringify(data),
        });

        //if not successful, give an alert
        if (response.status !== 200){
            alert('Error while deleting superset ID');
            return;
        }
    }catch (error){
        console.error(error);
    }
}