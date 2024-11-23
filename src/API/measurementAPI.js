import axios from "axios";

//get all logged measurements of user
export const getMeasurements = async (setMeasurementData, userID) => {
    axios.get(`/measurements/${userID}`)
        .then(response => {
            setMeasurementData(response.data.measurements);
        })
        .catch(error => {
            console.error(error);
            alert('Error getting measurements');
        });
};

//add measurements
export const addMeasurement = async (data) => {
    axios.post(`/measurements/add`, data)
        .then(() => {
            alert('Measurements updated');
            return true;
        })
        .catch(error => {
            console.error(error);
            alert('Error adding measurements');
            return false;
        });
};

//get last logged measurement of user
export const getLatestMeasurement = async (userID, setWeight, setBodyFat, setWaistLine) => {
    axios.get(`/measurements/latest/${userID}`)
        .then(response => {
            const data = response.data.measurement;
            setWeight(data.weight || 0);
            setBodyFat(data.bodyfat_percentage || 0);
            setWaistLine(data.waistline || 0);
        })
        .catch(error => {
            console.error(error);
            alert('Error getting measurements');
        });
}
