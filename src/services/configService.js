class ConfigService {
    static getAccessToken() {
        return localStorage.getItem("atk");
    }

    static getRefreshToken() {
        return localStorage.getItem("rtk");
    }
    
    static setAccessToken(accessToken) {
        return localStorage.setItem("atk", accessToken);
    }

    static setRefreshToken(refreshToken) {
        return localStorage.setItem("rtk", refreshToken);
    }
    
    static removeSession() {
        localStorage.clear();
    }
}

export default ConfigService;