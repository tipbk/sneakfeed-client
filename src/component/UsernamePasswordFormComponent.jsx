import TextField from '@mui/material/TextField';
import React from 'react';

export default function UsernamePasswordFormComponent({ username, setUsername, password, setPassword }) {
    return (
        <div className="username-password-form">
        <TextField
            required
            id="outlined-required"
            label="Username"
            defaultValue=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
                required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        </div>
    );
    
}