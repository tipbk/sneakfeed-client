import axios from 'axios';

const url = "http://192.168.100.2:8080"

class AuthService {
    static register(username, password) {
        return axios.post(`${url}/register`,{
            username: username,
            password: password
        });
    }
    static login(username, password) {
        return axios.post(`${url}/login`,{
            username: username,
            password: password
        });
    }

    static refreshToken(refreshToken) {
        return axios.post(`${url}/refresh`,{
            refreshToken: refreshToken
        });
    }
}

export default AuthService;