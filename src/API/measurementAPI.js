const serverPort = 3001;

//get all logged measurements of user
export const getMeasurements = async (setMeasurementData, userID, token) => {
    try {
        const response = await fetch(`http://localhost:${serverPort}/api/measurements/${userID}`, {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${token}`
            }
        });
        if (response.status === 200) {
            const data = await response.json();
            setMeasurementData(data.measurements);
        }
    }
    catch (error) {
        console.error(error);
    }
};

//add measurements
export const addMeasurement = async (data, token) => {
    try {
        const response = await fetch(`http://localhost:${serverPort}/api/measurements/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            body: JSON.stringify(data),
        });
        if (response.status === 201) {
            alert('Measurement updated successfully');
        }
    } catch (error) {
        console.error(error);
    }
};

//get last logged measurement of user
export const getLatestMeasurement = async (userID, token, setWeight,setBodyFat,setWaistLine) =>{
    try{
        const response = await fetch (`http://localhost:${serverPort}/api/measurements/latest/${userID}`, {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${token}`
            }
        });
        if (response.status === 200){
            const data = await response.json();

            //set values for display
            setWeight(data.measurement.weight);
            setBodyFat(data.measurement.bodyfat_percentage);
            setWaistLine(data.measurement.waistline);
        }
    }
    catch(error){
        console.error (error);
    }
}
