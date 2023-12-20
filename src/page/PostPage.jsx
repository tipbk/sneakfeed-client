import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CommonService from "../services/commonService";
import FullPostComponent from "../component/FullPostComponent";
import TextField from '@mui/material/TextField';
import CommentComponent from "../component/CommentComponent";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { Box } from "@mui/material";
import { GenericLoading } from "../component/CommonComponent";

function PostPage() {
    const { postID } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const [post, setPost] = useState("");
    const [isPostLoading, setIsPostLoading] = useState(true);
    const [postErrorMessage, setPostErrorMessage] = useState("");
    const [comment, setComment] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [isCommentLoading, setIsCommentLoading] = useState(true);
    const [loadingSubmitComment, setLoadingSubmitComment] = useState(false);

    function handleComment() {
        setLoadingSubmitComment(true);
        if (newComment === "") {
            setLoadingSubmitComment(false);
            return;
        }
        CommonService.addComment(postID, newComment)
        .then(response => {
            window.location.reload();
        })
        .catch(error => {
            setLoadingSubmitComment(false);
            enqueueSnackbar("There was some error. Please try again.", { variant: "error" })
        });
    }

    useEffect(() => {
        CommonService.getPostByID(postID)
        .then(response => {
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
            {isPostLoading && <Box sx={{ display: 'flex', flexDirection: 'row' }} alignItems='center' justifyContent='center'>
                <GenericLoading />
            </Box>}
            {postErrorMessage !== "" && <p>{ postErrorMessage }</p>}
            {(!isPostLoading && postErrorMessage === "") && 
                <div>
                    <FullPostComponent displayName={post.displayName} isComment={post.isComment} totalComments={post.totalComments} totalLikes={post.totalLikes} postImageUrl={post.imageUrl} isLikeProp={post.isLike} datetime={post.createdDatetime} postID={postID} title={post.title} username={post.username} profileImage={post.profileImage} content={post.content}/>
                </div>
            }
            <p className="generic-header">What the others think?</p>
            {isCommentLoading && <Box sx={{ display: 'flex', flexDirection: 'row' }} alignItems='center' justifyContent='center'>
                <GenericLoading />
            </Box>}
            {comment !== null && comment.length === 0 && <p className="main-content-component">No comment yet. Wanna be the first one?</p>}
            {comment !== null && comment.length >= 0 && 
                
                comment.map((c) => 
                <div key={ c.commentID } className="item-margin">
                    <CommentComponent displayName={c.displayName} username={c.username} content={c.content} datetime={c.createdDatetime} profileImage={c.profileImage}/>
                </div>
            )}
            <TextField
            id="outlined-required"
            label="Comment"
            fullWidth
            defaultValue={newComment}
            onChange={(e) => {setNewComment(e.target.value)}}
            />
            <LoadingButton disabled={newComment.length === 0} loading={loadingSubmitComment} style={{float:'right'}} sx={{mt: 2}} variant="contained" onClick={(e) => {handleComment(e)}}>Comment!</LoadingButton>

        </React.Fragment>
    );
}

export default PostPage;