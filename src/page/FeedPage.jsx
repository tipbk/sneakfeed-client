import React, { useEffect, useState } from 'react';
import CommonService from '../services/commonService';
import { Box, Typography } from '@mui/material';
import FullPostComponent from '../component/FullPostComponent';
import CircularProgress from '@mui/material/CircularProgress';
import InfiniteScroll from "react-infinite-scroller";
import { GenericLoading } from '../component/CommonComponent';

function FeedPage() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [hasMorePage, setHasMorePage] = useState(true);
    const LIMIT_PER_PAGE = 8;

    useEffect(() => {
        CommonService.getPosts(LIMIT_PER_PAGE, null)
        .then(response => {
            setIsLoading(false);
            setPosts(response.data.data.posts);
            // remove loading pagination
            if (response.data.data.posts.length === response.data.data.pagination.total) {
                setHasMorePage(false);
            }
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

    const loadMore = () => {
        CommonService.getPosts(LIMIT_PER_PAGE, posts[posts.length - 1].createdDatetime)
        .then(response => {
            setIsLoading(false);
            setPosts(posts.concat(response.data.data.posts));
            // remove loading pagination
            if (response.data.data.posts.length === response.data.data.pagination.total) {
                setHasMorePage(false);
            }
        })
        .catch(error => {
            setIsError(true);
            setIsLoading(true);
            setPosts([]);
            if (error.response.status === 401) {
                window.location.href = "/login"
            }
        })  
    }

    return (
        <React.Fragment>
            <Typography variant="h4" sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}>FEEDS</Typography>
            {isLoading && <Box sx={{ display: 'flex', flexDirection: 'row' }} alignItems='center' justifyContent='center'>
                <CircularProgress />
            </Box>}
            {isError && <p>Error</p>}
            {!isLoading && posts.length === 0 && <p>No posts found.</p>}
            {!isLoading && posts.length > 0 && // Display posts only if data is fetched and there are posts
            <InfiniteScroll hasMore={hasMorePage} loader={<GenericLoading />} loadMore={loadMore}>
                {posts.map((post) => (
                    <div>
                        <FullPostComponent key={post.id} isComment={post.isComment} isLikeProp={post.isLike} totalComments={post.totalComments} totalLikes={post.totalLikes} datetime={post.createdDatetime} content={post.content} postID={post.id} title={post.title} username={post.username} profileImage={post.profileImage} postImageUrl={post.imageUrl} displayName={post.displayName} />
                    </div>
                 ))}
            </InfiniteScroll>
            }
            {!hasMorePage && 
                <Typography sx={{textAlign: 'center', mt: 4, mb: 4}}>This is dinosaur era. Be careful with these dinosaurs. 🦕🦕🦖🌋</Typography>
            }
        </React.Fragment>
    );  
}

export default FeedPage;