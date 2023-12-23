import { VolumeDown } from "@mui/icons-material";
import { Avatar, Box, Button, Tooltip, Typography } from "@mui/material";
import LoginComponent from "./LoginComponent";
import { useEffect } from "react";
import CommonService from "../services/commonService";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export default function CompactUserComponent({ username, displayName, profileImage }) {
    const [userID, setUserID] = useState("");
    const [loadingFollow ,setLoadingFollow] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [isFollowed, setIsFollowed] = useState(false);
    const [followText, setFollowText] = useState("Follow");
    const [isYourUser, setIsYourUser] = useState(false);
    const [totalFollowers, setTotalFollowers] = useState(0);
    const [totalFollowing, setTotalFollowing] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        CommonService.getUserByUsername(username)
        .then(response => {
            setUserID(response.data.data.id);
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
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
            <Avatar alt={username} src={profileImage} sx={{ mt: 2, position: 'relative',width: 64, height: 64, "&:hover": { cursor: 'pointer' } }}></Avatar>
            <Typography onClick={() => {navigate(`/users/${username}`)}} sx={{ "&:hover": { textDecoration: "underline" , cursor: 'pointer' }, mt: 2,fontWeight: 'bold', fontSize: 'large', color: 'white' }}>{displayName || username}</Typography>
            <Typography onClick={() => {navigate(`/users/${username}`)}} color="text.secondary" sx={{ "&:hover": { textDecoration: "underline" , cursor: 'pointer' }, fontSize: 'default', color: 'rgba(255, 255, 255, 0.7)' }}>@{username}</Typography>
            <Box display='flex' flexDirection='row' justifyContent='space-evenly' alignItems='center' sx={{width: 200, height:70}}>
                <Box display='flex' flexDirection='column' alignItems='center' sx={{width:100}}>
                    <Typography color="text.primary" sx={{ fontSize: 'default', color: 'white' }}>Following</Typography><Typography color="text.primary" sx={{ fontSize: 'bold', color: 'white' }}>{totalFollowing}</Typography>
                </Box>
                <Box display='flex' flexDirection='column' alignItems='center' sx={{width:100}}>
                    <Typography color="text.primary" sx={{ fontSize: 'default', color: 'white' }}>Followers</Typography><Typography color="text.primary" sx={{ fontSize: 'bold', color: 'white' }}>{totalFollowers}</Typography>
                </Box>
            </Box>
        </Box>
    );
}