import React from "react";
import UserComponent from "../component/UserComponent";
import { Typography } from "@mui/material";

export default function UserPage() {
    return (
        <React.Fragment>
            <Typography variant="h4" sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}>Users</Typography>
            <UserComponent />
        </React.Fragment>
    );
}