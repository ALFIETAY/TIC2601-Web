import axios from "axios";

//create superset
export const createSuperset = async (data) => {
    axios.post(`/superset/create`, data)
        .then(

    )
        .catch(error => {
            console.error(error);
            alert('Error creating superset');
        });
}

//remove superset
export const removeSuperset = async (data) => {
    axios.delete(`/superset/remove`, data)
        .then(

    )
        .catch(error => {
            console.error(error);
            alert('Error removing superset bundle');
        });
}