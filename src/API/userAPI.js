const serverPort = 3001;

//signup
export const signup = async(data,navigate) => {
    try{
        const response= await fetch(`http://localhost:${serverPort}/api/users/signup`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        //if successful, go to create profile, pass userID and username to the page
        if(response.status === 200){
            const user = await response.json();
            localStorage.setItem('userID', user.user.userId);
            localStorage.setItem('username',user.user.username);
            localStorage.setItem('token',user.token);
            navigate('/signup/create_profile');
        }
        //else if user already exist
        else if (response.status === 400){
            alert('Username or Email already exists');
        }
    }
    catch (error){
        console.error(error);
    }
}

//login
export const login = async (data, navigate) =>{
    try {
        const response = await fetch(`http://localhost:${serverPort}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (response.status === 200) {
            const user = await response.json();
            localStorage.setItem('token', user.token);
            localStorage.setItem('userID', user.user.userId);
            localStorage.setItem('username', user.user.username);
            navigate('/home');
            return;
        }
        else if (response.status === 401) {
            alert('Wrong Username or Password');
            return;
        }
    } catch (error) {
        console.error('POST error: ', error);
    }
}

//forget password
export const updatePassword = async (data, navigate) =>{
    try {
        const response = await fetch(`http://localhost:${serverPort}/api/users/forget`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        //if successful, back to login page
        if (response.status === 200) {
            navigate('/login');
        }
        //else user not found
        else if (response.status === 404) {
            const message = await response.json();
            alert(message.message);
        }
    }
    catch (error) {
        console.error(error);
        return;
    }
}
