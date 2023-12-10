import axios from 'axios';
import ConfigService from './configService';
import AuthService from './authService';

const instance = axios.create({
    baseURL: "http://192.168.100.2:8080",
});

instance.interceptors.request.use((config) => {
    // intercept auth header
    const token = ConfigService.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

instance.interceptors.response.use(null, (error) => {
    // in case token is expired
    if (error.response.status === 401) {
        return AuthService.refreshToken(ConfigService.getRefreshToken())
            .then(response => {
                const accessToken = response.data.data.accessToken;
                const refreshToken = response.data.data.refreshToken;
                ConfigService.setAccessToken(accessToken);
                ConfigService.setRefreshToken(refreshToken);
                error.config.headers.Authorization = `Bearer ${accessToken}`;
                return axios.request(error.config);
            })
            .catch((err) => {
                ConfigService.removeSession();
                return Promise.reject(err);
                
            });
    }
    // Return the error if it's not a 401 error
    return Promise.reject(error);
});

class CommonService {
    static getPosts() {
        return instance.get(`/posts`);
    }

    static getPostByID(postID) {
        return instance.get(`/posts/${postID}`);
    }

    static getCommentsByPostID(postID) {
        return instance.get(`/posts/${postID}/comments`);
    }

    static toggleLikePost(postID) {
        return instance.post(`/posts/${postID}/like`);
    }

    static createPost(content, imageBase64) {
        return instance.post(`/posts`, {
            content: content,
            imageBase64: imageBase64
        });
    }

    static addComment(postID, content) {
        return instance.post(`/posts/${postID}/comments`, {
            content: content
        });
    }

    static getCurrentUser() {
        return instance.get(`/profiles`)
    }

    static uploadImage(base64string) {
        return instance.post(`/image/upload`, {
            file: base64string
        })
    }

    static patchProfile(base64string) {
        return instance.patch(`/profiles`, {
            imageBase64: base64string
        })
    }
}

export default CommonService;