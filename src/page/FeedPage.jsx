import React, { useEffect, useState } from 'react';
import CommonService from '../services/commonService';
import { Box, Typography } from '@mui/material';
import FullPostComponent from '../component/FullPostComponent';
import CircularProgress from '@mui/material/CircularProgress';

function FeedPage() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        CommonService.getPosts()
        .then(response => {
            setIsLoading(false);
            setPosts(response.data.data);
        })
        .catch(error => {
            setIsError(true);
            setIsLoading(true);
            setPosts([]);
            if (error.response.status === 401) {
                window.location.href = "/login"
            }
        })  
    }, [])

    return (
        <React.Fragment>
            <Typography variant="h4" sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}>FEEDS</Typography>
            {isLoading && <Box sx={{ display: 'flex', flexDirection: 'row' }} alignItems='center' justifyContent='center'>
                <CircularProgress />
            </Box>}
            {isError && <p>Error</p>}
            {!isLoading && posts.length === 0 && <p>No posts found.</p>}
            {!isLoading && posts.length > 0 && // Display posts only if data is fetched and there are posts
                posts.map((post) => (
                    <div>
                        <FullPostComponent key={post.id} isComment={post.isComment} isLikeProp={post.isLike} totalComments={post.totalComments} totalLikes={post.totalLikes} datetime={post.createdDatetime} content={post.content} postID={post.id} title={post.title} username={post.username} profileImage={post.profileImage} postImageUrl={post.imageUrl} displayName={post.displayName} />
                    </div>
                
            ))}
        </React.Fragment>
    );
}

export default FeedPage;