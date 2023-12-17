import React, { useState } from 'react';
import AuthService from '../services/authService'
import ConfigService from '../services/configService';
import LoginComponent from '../component/LoginComponent';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        AuthService.login(username, password)
        .then(response => {
            ConfigService.setAccessToken(response.data.data.accessToken);
            ConfigService.setRefreshToken(response.data.data.refreshToken);
            window.location.href = `/`;
        })
        .catch(err => {
            alert("incorrect username or password")
        })
    }

    return (
        <React.Fragment>
            <LoginComponent headerText="Login" username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleSubmit={handleSubmit} buttonText="Login"/>
        </React.Fragment>
    );
}

export default LoginPage;