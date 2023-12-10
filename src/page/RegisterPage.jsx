import React, { useState } from 'react';
import AuthService from '../services/authService';
import UsernamePasswordFormComponent from '../component/UsernamePasswordFormComponent';
import CustomButton from '../theme/CustomButton';

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // doing some api to backends
        AuthService.register(username, password)
        .then(response => {
            alert("register successfully!");
        })
        .catch(err => {
            alert("cannot register");
        })
    }

    return (
        <React.Fragment>
            <p className="generic-header">Register</p>
            <UsernamePasswordFormComponent username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
            <div className="button-margin">
                <CustomButton text="Submit" action={handleSubmit}></CustomButton>
            </div>
        </React.Fragment>
    );
}

export default RegisterPage;