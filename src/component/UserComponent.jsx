import React, { useEffect } from "react";
import CommonService from "../services/commonService";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";

export default function UserComponent() {
    const { usernameParam } = useParams()
    const [username, setUsername] = useState("");
    const [userID, setUserID] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [loadingFollow ,setLoadingFollow] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [isFollowed, setIsFollowed] = useState(false);
    const [followText, setFollowText] = useState("Follow");

    function handleFollow() {
        setLoadingFollow(true);
        CommonService.toggleFollowUser(userID)
        .then(response => {
            const isFollowedResult = response.data.data.isFollowed;
            setIsFollowed(isFollowedResult);
            if (isFollowedResult) {
                setFollowText("Unfollow")
            } else {
                setFollowText("Follow")
            }
            setLoadingFollow(false);
            enqueueSnackbar("Post created successfully! Redirecting to post...", { variant: "success" });
        })
        .catch(error => {
            alert("Cannot publish a post. Please try again later");
            setLoadingFollow(false);
        })
    }

    useEffect(() => {
        CommonService.getUserByUsername(usernameParam)
        .then(response => {
            setUserID(response.data.data.user.id);
            setUsername(response.data.data.user.username);
            setProfileImage(response.data.data.user.profileImage);
            setDisplayName(response.data.data.user.displayName);
            setIsFollowed(response.data.data.isFollowed);
            if (response.data.data.isFollowed) {
                setFollowText("Unfollow");
            }
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
                <Typography sx={{ mt: 4,fontWeight: 'bold', fontSize: 'large' }}>{displayName || username}</Typography>
                <Typography color="text.secondary" sx={{ fontSize: 'default' }}>@{username}</Typography>
                <LoadingButton color={isFollowed ? "error" : "primary"} loading={loadingFollow} onClick={handleFollow} variant="contained" sx={{ mt: 2 }}>{followText}</LoadingButton>
            </Box>
            
        </React.Fragment>
    );
}