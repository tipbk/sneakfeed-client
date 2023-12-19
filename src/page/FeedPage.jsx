import React, { useEffect, useState } from 'react';
import CommonService from '../services/commonService';
import { Box, Typography } from '@mui/material';
import FullPostComponent from '../component/FullPostComponent';
import CircularProgress from '@mui/material/CircularProgress';
import InfiniteScroll from "react-infinite-scroller";
import { GenericLoading } from '../component/CommonComponent';

const FEED_SELECTION_GLOBAL = "GLOBAL";
const FEED_SELECTION_YOUR_FEED = "YOUR";

function FeedPage() {
    const LIMIT_PER_PAGE = 8;

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [hasMorePage, setHasMorePage] = useState(true);
    const [globalFeedFontWeight, setGlobalFeedFontWeight] = useState('bold');
    const [globalFeedFontColor, setGlobalFeedFontColor] = useState('text.primary');
    const [feedSelection, setFeedSelection] = useState(FEED_SELECTION_GLOBAL);

    // YOUR FEED ZONE
    const [yourFeedPosts, setYourFeedPosts] = useState([]);
    const [isYourFeedLoading, setIsYourFeedLoading] = useState(true);
    const [isYourFeedError, setIsYourFeedError] = useState(false);
    const [yourFeedHasMorePage, setYourFeedHasMorePage] = useState(true);
    const [yourFeedFontWeight, setYourFeedFontWeight] = useState('default');
    const [yourFeedFontColor, setYourFeedFontColor] = useState('text.secondary');

    useEffect(() => {
        CommonService.getPosts(LIMIT_PER_PAGE, null, "")
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

    const switchingFeed = (feed) => {
        if (feed === FEED_SELECTION_YOUR_FEED) {
            setYourFeedFontWeight('bold');
            setYourFeedFontColor('color.primary');
            setGlobalFeedFontWeight('default');
            setGlobalFeedFontColor('text.secondary');
            setFeedSelection(FEED_SELECTION_YOUR_FEED);
        } else {
            setYourFeedFontWeight('default');
            setYourFeedFontColor('color.secondary')
            setGlobalFeedFontWeight('bold');
            setGlobalFeedFontColor('text.primary');
            setFeedSelection(FEED_SELECTION_GLOBAL);
        }
    }

    const loadMore = () => {
        CommonService.getPosts(LIMIT_PER_PAGE, posts[posts.length - 1].createdDatetime, "")
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

    const loadMoreYourFeed = () => {
        let queryDatetime = null;
        if (yourFeedPosts.length > 0) {
            queryDatetime = yourFeedPosts[yourFeedPosts.length - 1].createdDatetime
        }
        CommonService.getPosts(LIMIT_PER_PAGE, queryDatetime, "FOLLOWING_POST")
        .then(response => {
            setIsYourFeedLoading(false);
            setYourFeedPosts(yourFeedPosts.concat(response.data.data.posts));
            // remove loading pagination
            if (response.data.data.posts.length === response.data.data.pagination.total) {
                setYourFeedHasMorePage(false);
            }
        })
        .catch(error => {
            setIsYourFeedError(true);
            setIsYourFeedLoading(true);
            setYourFeedPosts([]);
            if (error.response.status === 401) {
                window.location.href = "/login"
            }
        })  
    }

    return (
        <React.Fragment>
            <Box display='flex' flexDirection='col' justifyContent='space-between'>
                <Typography variant='h6' onClick={() => {switchingFeed(FEED_SELECTION_GLOBAL)}} sx={{ mt: 2 ,fontWeight: globalFeedFontWeight, color: globalFeedFontColor,"&:hover": { cursor: "pointer" } }}>Global Feed</Typography>
                <Typography variant='h6' onClick={() => {switchingFeed(FEED_SELECTION_YOUR_FEED)}} sx={{ mt: 2 ,fontWeight: yourFeedFontWeight, color: yourFeedFontColor, "&:hover": { cursor: "pointer" } }}>Your feed</Typography>
            </Box>
            {feedSelection === FEED_SELECTION_GLOBAL && <Box>
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
            </Box>}
            {feedSelection === FEED_SELECTION_YOUR_FEED && <Box>
                <InfiniteScroll hasMore={yourFeedHasMorePage} loader={<GenericLoading />} loadMore={loadMoreYourFeed}>
                    {yourFeedPosts.map((post) => (
                        <div>
                            <FullPostComponent key={post.id} isComment={post.isComment} isLikeProp={post.isLike} totalComments={post.totalComments} totalLikes={post.totalLikes} datetime={post.createdDatetime} content={post.content} postID={post.id} title={post.title} username={post.username} profileImage={post.profileImage} postImageUrl={post.imageUrl} displayName={post.displayName} />
                        </div>
                    ))}
                </InfiniteScroll>
                {!yourFeedHasMorePage && 
                    <Typography sx={{textAlign: 'center', mt: 4, mb: 4}}>This is dinosaur era. Be careful with these dinosaurs. 🦕🦕🦖🌋</Typography>
                }
            </Box>}
            
        </React.Fragment>
    );  
}

export default FeedPage;