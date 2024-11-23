import axios from "axios";

//signup
export const signup = async (data, navigate) => {
    axios.post(`/users/signup`, data)
        .then(response => {
            const user = response.data.user;
            localStorage.setItem('userID', user.userId);
            localStorage.setItem('username', user.username);
            localStorage.setItem('token', response.data.token);
            navigate('/signup/create_profile');
        })
        .catch(error => {
            if (error.response.status === 400) {
                alert('Username or Email already registered');
            }
            else {
                console.log(error);
                alert('Error during sign up');
            }
        });
}

//login
export const login = async (data, navigate) => {
    axios.post(`/users/login`, data)
        .then(response => {
            localStorage.setItem('userID', response.data.user.userId);
            localStorage.setItem('username', response.data.user.username);
            localStorage.setItem('token', response.data.token);
            navigate('/home');
        })
        .catch(error => {
            if (error.status === 401) {
                alert('Wrong username or password');
            }
            else {
                console.error(error);
                alert('Error during login');
            }
        });
}

//forget password
export const updatePassword = async (data, navigate) => {
    axios.put(`/users/forget`, data)
        .then(() => {
            alert('Password updated');
            navigate('/login');
        })
        .catch(error => {
            alert('User no found');
        });
}
