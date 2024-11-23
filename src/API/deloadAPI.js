import axios from "axios";

//get user deload status
export const getDeload = async (userID, setActive, setStart, setEnd, setDisabled) => {
    axios.get(`/deload/${userID}`)
        .then(response => {
            const deloadstatus = response.data;
            if (deloadstatus.deload) {
                setActive(true);
                setStart(deloadstatus.start_date);
                setEnd(deloadstatus.end_date);
                setDisabled(true);
            }
        })
        .catch(error => {
            console.error(error);
            alert('Error getting Deload Status');
        })
};

//add deload period
export const addDeloadPeriod = async (data, navigate) => {
    axios.post(`/deload/add_deload`, data)
        .then(
            navigate(0)
        )
        .catch(error => {
            console.error(error);
            alert('Error adding Deload Period');
        });
}
