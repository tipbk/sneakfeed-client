import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
});

class AuthService {
    static register(username, password, email) {
        return instance.post(`/register`,{
            username: username,
            password: password,
            email: email
        });
    }
    static login(username, password) {
        return instance.post(`/login`,{
            username: username,
            password: password
        });
    }

    static refreshToken(refreshToken) {
        return instance.post(`/refresh`,{
            refreshToken: refreshToken
        });
    }
}

export default AuthService;