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
    const [isYourUser, setIsYourUser] = useState(false);
    const [totalFollowers, setTotalFollowers] = useState(0);
    const [totalFollowing, setTotalFollowing] = useState(0);

    function handleFollow() {
        setLoadingFollow(true);
        CommonService.toggleFollowUser(userID)
        .then(response => {
            const isFollowedResult = response.data.data.isFollowed;
            setIsFollowed(isFollowedResult);
            if (isFollowedResult) {
                setTotalFollowers(totalFollowers + 1);
                setFollowText("Unfollow")
            } else {
                setTotalFollowers(totalFollowers - 1);
                setFollowText("Follow")
            }
            setLoadingFollow(false);
        })
        .catch(error => {
            enqueueSnackbar("Error. Please try again later.", { variant: "error" });
            setLoadingFollow(false);
        })
    }

    useEffect(() => {
        CommonService.getUserByUsername(usernameParam)
        .then(response => {
            setUserID(response.data.data.id);
            setUsername(response.data.data.username);
            setProfileImage(response.data.data.profileImage);
            setDisplayName(response.data.data.displayName);
            setIsFollowed(response.data.data.isFollowed);
            setIsYourUser(response.data.data.isYourUser);
            setTotalFollowers(response.data.data.totalFollowers);
            setTotalFollowing(response.data.data.totalFollowing);
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
                <Box display='flex' flexDirection='row' justifyContent='space-evenly' alignItems='center' sx={{width: 200, height:70}}>
                    <Box display='flex' flexDirection='column' alignItems='center' sx={{width:100}}>
                        <Typography color="text.primary" sx={{ fontSize: 'default' }}>Following</Typography><Typography color="text.primary" sx={{ fontSize: 'bold' }}>{totalFollowing}</Typography>
                    </Box>
                    <Box display='flex' flexDirection='column' alignItems='center' sx={{width:100}}>
                        <Typography color="text.primary" sx={{ fontSize: 'default' }}>Followers</Typography><Typography color="text.primary" sx={{ fontSize: 'bold' }}>{totalFollowers}</Typography>
                    </Box>
                    
                </Box>
                <LoadingButton disabled={isYourUser} color={isFollowed ? "error" : "primary"} loading={loadingFollow} onClick={handleFollow} variant="contained" sx={{ mt: 2 }}>{followText}</LoadingButton>
            </Box>
            
        </React.Fragment>
    );
}