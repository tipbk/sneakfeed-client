import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CommonService from "../services/commonService";
import FullPostComponent from "../component/FullPostComponent";
import CustomButton from "../theme/Theme";
import TextField from '@mui/material/TextField';
import CommentComponent from "../component/CommentComponent";

function PostPage() {
    const { postID } = useParams();

    const [post, setPost] = useState("");
    const [isPostLoading, setIsPostLoading] = useState(true);
    const [postErrorMessage, setPostErrorMessage] = useState("");
    const [comment, setComment] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [isCommentLoading, setIsCommentLoading] = useState(true);
    const [countLike, setCountLike] = useState(0);

    function handleComment() {
        if (newComment === "") return;
        CommonService.addComment(postID, newComment)
        .then(response => {
            window.location.reload();
        })
        .catch(error => {
            alert("there was some error. please try again.")
        });
    }

    useEffect(() => {
        CommonService.getPostByID(postID)
        .then(response => {
            setCountLike(response.data.data.totalLikes);
            setPost(response.data.data);
            setIsPostLoading(false);
        })
        .catch(error => {
            if (error.response.status === 401) {
                window.location.href = "/";
            }
            setPostErrorMessage("couldn't find post")
            setIsPostLoading(false);
        });
        CommonService.getCommentsByPostID(postID)
        .then(response => {
            setComment(response.data.data);
            setIsCommentLoading(false);
        })
        .catch(error => {
            if (error.response.status === 401) {
                window.location.href = "/";
            }
            setPostErrorMessage("couldn't load comments")
            setIsCommentLoading(false);
        });
    }, [postID]);
    return (
        <React.Fragment>
            {isPostLoading && <p>Loading...</p>}
            {postErrorMessage !== "" && <p>{ postErrorMessage }</p>}
            {(!isPostLoading && postErrorMessage === "") && 
                <div>
                    <FullPostComponent countComment={post.totalComments} countLike={countLike} setCountLike={setCountLike} postImageUrl={post.postImageUrl} isLikeProp={post.isLike} datetime={post.createdDatetime} postID={postID} title={post.title} username={post.username} profileImage={post.profileImage} content={post.content}/>
                </div>
            }
            <p className="generic-header">What the others think?</p>
            {isCommentLoading && <p className="main-content-component">Loading comments...</p>}
            {comment !== null && comment.length === 0 && <p className="main-content-component">No comment yet. Wanna be the first one?</p>}
            {comment !== null && comment.length >= 0 && 
                
                comment.map((c) => 
                <div key={ c.commentID } className="item-margin">
                    <CommentComponent username={c.username} content={c.content} datetime={c.createdDatetime} profileImage={c.profileImage}/>
                </div>
            )}
            <TextField
            id="outlined-required"
            label="Comment"
            fullWidth
            defaultValue={newComment}
            onChange={(e) => {setNewComment(e.target.value)}}
            />
            <div className="button-margin">
                <CustomButton text="Comment!" action={handleComment} />
            </div>

        </React.Fragment>
    );
}

export default PostPage;