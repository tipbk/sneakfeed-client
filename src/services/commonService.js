import axios from 'axios';
import ConfigService from './configService';
import AuthService from './authService';

const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
});

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
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
                const isUseSessionStorage = ConfigService.isUseSessionStorage();
                ConfigService.setAccessToken(accessToken, isUseSessionStorage);
                ConfigService.setRefreshToken(refreshToken, isUseSessionStorage);
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
    static getPosts(limit, from, filter) {
        const params = {
            limit: limit,
            from: from,
            filter: filter,
        };
        return instance.get(`/posts`, {params: params});
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

    static createPost(content, imageBase64, ogTitle, ogDescription, ogLink, ogImage, ogDomain) {
        return instance.post(`/posts`, {
            content: content,
            imageBase64: imageBase64,
            ogTitle: ogTitle,
            ogDescription: ogDescription,
            ogLink: ogLink,
            ogImage: ogImage,
            ogDomain: ogDomain,
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

    static updateProfile(base64string , displayName) {
        return instance.patch(`/profiles`, {
            imageBase64: base64string,
            displayName: displayName,
        })
    }

    static capitalizeFirstCharacter(input) {
        if (input.length === 0) {
            return input
        }
        return input[0].toUpperCase() + input.slice(1);
    }

    static getUserByUsername(username) {
        return instance.get(`/users/${username}`);
    }

    static toggleFollowUser(followUserID) {
        return instance.post(`/users/toggle-follow`, {
            followUserID: followUserID,
        });
    }

    static getMetadata(url) {
        return instance.post(`/metadata`, {
            url: url,
        });
    }

    static handleDateFormat(datetimeString) {
        const dateObject = new Date(datetimeString);
        const formattedDate = formatter.format(dateObject);
        return formattedDate;
    }

    static handleShowTimeFormat(datetimeString) {
        const dateObject = new Date(datetimeString);
        const currentTime = new Date();
        const minutes = ((currentTime.getTime() - dateObject.getTime()) / 1000) / 60;
        
        if (Math.round(minutes) === 0) {
            return "1 m"
        } else if (Math.round(minutes) < 60) {
            return `${Math.round(minutes)} m`
        } else if (Math.round(minutes) < 1440) {
            return `${Math.round(Math.round(minutes)/60)} h`
        } else if (Math.round(minutes) < 10080) {
            return `${Math.round(Math.round(Math.round(minutes)/60)/24)} d`
        }
        
        const formattedDate = formatter.format(dateObject);
        return formattedDate;
    }
}

export default CommonService;