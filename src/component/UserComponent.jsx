import React, { useEffect } from "react";
import CommonService from "../services/commonService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import InfiniteScroll from "react-infinite-scroller";
import { GenericLoading } from "./CommonComponent";
import FullPostComponent from "./FullPostComponent";

const LIMIT_PER_PAGE = 8;

export default function UserComponent({ usernameParam }) {
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
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [hasMorePage, setHasMorePage] = useState(true);

    const loadMore = () => {
        let queryDatetime = null;
        if (posts.length > 0) {
            queryDatetime = posts[posts.length - 1].createdDatetime
        }
        CommonService.getPosts(LIMIT_PER_PAGE, queryDatetime, "USER", usernameParam)
        .then(response => {
            setPosts(posts.concat(response.data.data.posts));
            // remove loading pagination
            if (response.data.data.posts.length === response.data.data.pagination.total) {
                setHasMorePage(false);
            }
        })
        .catch(error => {
            setPosts([]);
            if (error.response.status === 401) {
                window.location.href = "/login"
            }
        })  
    }

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
        if (username !== usernameParam) {
            setHasMorePage(true);
            setPosts([]);
        }
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
        })
        
        loadMore();
    }, [usernameParam])

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
                {!isYourUser && <LoadingButton color={isFollowed ? "error" : "primary"} loading={loadingFollow} onClick={handleFollow} variant="contained" sx={{ mt: 2 }}>{followText}</LoadingButton>}
                {isYourUser && <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/profile")}>Edit Profile</Button>}
                </Box>
                <Typography variant='h6' sx={{ mt: 2 ,fontWeight: 'bold', color: 'text.primary' }}>Feeds</Typography>
                <Box>
                    <InfiniteScroll hasMore={hasMorePage} loader={<GenericLoading />} loadMore={loadMore}>
                        {posts.map((post) => (
                            <div>
                                <FullPostComponent key={post.id} isComment={post.isComment} isLikeProp={post.isLike} totalComments={post.totalComments} totalLikes={post.totalLikes} datetime={post.createdDatetime} content={post.content} postID={post.id} title={post.title} username={post.username} profileImage={post.profileImage} postImageUrl={post.imageUrl} displayName={post.displayName} ogLink={post.ogLink} ogTitle={post.ogTitle} ogDescription={post.ogDescription} ogImage={post.ogImage} ogDomain={post.ogDomain} />
                            </div>
                        ))}
                    </InfiniteScroll>
                    {!hasMorePage && posts.length !== 0 &&
                        <Typography sx={{textAlign: 'center', mt: 4, mb: 4}}>No more posts to show.</Typography>
                    }
                    {!hasMorePage && posts.length === 0 &&
                        <Typography sx={{textAlign: 'center', mt: 4, mb: 4}}>No posts</Typography>
                    }
                </Box>
            
        </React.Fragment>
    );
}