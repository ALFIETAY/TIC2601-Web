const serverPort = 5001;

//get user deload status
export const getDeload = async (userID, token, setActive, setStart, setEnd, setDisabled) => {
    try {
        const response = await fetch(`http://localhost:${serverPort}/api/deload/${userID}`, {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${token}`
            }
        });
        if (response.status === 200) {
            const data = await response.json();
            if (data.deload) {
                setActive(data.deload); //set deload status == true
                setStart(data.start_date);//set start date
                setEnd(data.end_date);//set end date
                setDisabled(true);//disable date pickers
                localStorage.setItem('deload', true);//update localStorage
            }
        }
    }
    catch (error) {
        console.error(error);
    }
};

//add deload period
export const addDeloadPeriod = async (data, token, navigate) => {
    try {
        const response = await fetch(`http://localhost:${serverPort}/api/deload/add_deload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            body: JSON.stringify(data),
        });
        if (response.status === 200) {
            navigate(0);
        }
    }
    catch (error) {
        console.error(error);
    }
}
