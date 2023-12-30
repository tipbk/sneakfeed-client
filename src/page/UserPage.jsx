import React from "react";
import UserComponent from "../component/UserComponent";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
export default function UserPage() {
    const { usernameParam } = useParams()
    
    return (
        <React.Fragment>
            <Typography variant="h4" sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}>Users</Typography>
            <UserComponent usernameParam={usernameParam} />
        </React.Fragment>
    );
}