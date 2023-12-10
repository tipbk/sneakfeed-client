import React, { useEffect, useState } from 'react';
import CommonService from '../services/commonService';
import FeedPostComponent from '../component/FeedPostComponent';
import { useNavigate } from "react-router-dom";

function FeedPage() {
    const navigate = useNavigate();
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

    function handlePostClick(postID) {
        navigate(`/feeds/${postID}`);
    }


    return (
        <React.Fragment>
            <p className="generic-header">FEEDS</p>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error</p>}
            {!isLoading && posts.length === 0 && <p>No posts found.</p>}
            {!isLoading && posts.length > 0 && // Display posts only if data is fetched and there are posts
                posts.map((post) => (
                    <div onClick={() => handlePostClick(post.id)}>
                        <FeedPostComponent key={post.id} totalComments={post.totalComments} totalLikes={post.totalLikes} datetime={post.createdDatetime} content={post.content} postID={post.id} title={post.title} username={post.username} profileImage={post.profileImage} postImageUrl={post.imageUrl} />
                    </div>
                
            ))}
        </React.Fragment>
    );
}

export default FeedPage;