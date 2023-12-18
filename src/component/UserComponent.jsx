import React, { useEffect } from "react";
import CommonService from "../services/commonService";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

export default function UserComponent() {
    const { usernameParam } = useParams()
    const [username, setUsername] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [displayName, setDisplayName] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        CommonService.getUserByUsername(usernameParam)
        .then(response => {
            setUsername(response.data.data.username);
            setProfileImage(response.data.data.profileImage);
            setDisplayName(response.data.data.displayName);
        })
        .catch((error) => {
            if (error.response.status === 404) {
                enqueueSnackbar("User not found", { variant: 'error' });
            } else {
                enqueueSnackbar(error, { variant: 'error' });
            }
        }
        )
    }, [])

    return (
        <React.Fragment>
            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                <Avatar alt={username} src={profileImage} sx={{ position: 'relative',width: 256, height: 256, "&:hover": { cursor: 'pointer' } }}></Avatar>
                <Typography sx={{ mt: 4,fontWeight: 'bold', fontSize: 'h1' } }>{CommonService.handleDisplayName(displayName, username)}</Typography>
            </Box>
            
            
        </React.Fragment>
    );
}