class ConfigService {
    static getAccessToken() {
        if (sessionStorage.getItem("atk") !== "" && sessionStorage.getItem("atk") !== null) {
            return sessionStorage.getItem("atk");
        }
        return localStorage.getItem("atk");
    }

    static getRefreshToken() {
        if (sessionStorage.getItem("rtk") !== "" && sessionStorage.getItem("rtk") !== null) {
            return sessionStorage.getItem("rtk");
        }
        return localStorage.getItem("rtk");
    }

    static isUseSessionStorage() {
        if (sessionStorage.getItem("rtk") !== "") {
            return true;
        }
        return false;
    }
    
    static setAccessToken(accessToken, isSessionStorage) {
        if (isSessionStorage) {
            return sessionStorage.setItem("atk", accessToken);
        }
        return localStorage.setItem("atk", accessToken);
    }

    static setRefreshToken(refreshToken, isSessionStorage) {
        if (isSessionStorage) {
            return sessionStorage.setItem("rtk", refreshToken);
        }
        return localStorage.setItem("rtk", refreshToken);
    }
    
    static removeSession() {
        localStorage.clear();
        sessionStorage.clear();
    }
}

export default ConfigService;