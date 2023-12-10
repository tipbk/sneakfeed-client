import React, { useState } from 'react';
import AuthService from '../services/authService'
import ConfigService from '../services/configService';
import UsernamePasswordFormComponent from '../component/UsernamePasswordFormComponent';
import CustomButton from '../theme/CustomButton';

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
            <p className="generic-header">Login</p>
            <UsernamePasswordFormComponent username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
            <div className="button-margin">
                <CustomButton text="Submit" action={handleSubmit}></CustomButton>
            </div>
        </React.Fragment>
    );
}

export default LoginPage;