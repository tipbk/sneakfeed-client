import React, { useState } from 'react';
import CommonService from '../services/commonService';
import TextField from '@mui/material/TextField';
import ImageIcon from '@mui/icons-material/Image';
import { Box, Typography } from '@mui/material';
import { useRef } from 'react';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';

export default function CreatePostComponent() {
    const { enqueueSnackbar } = useSnackbar();
    const [loadingCreatePost, setLoadingCreatePost] = useState(false);
    const [postCreated, setPostCreated] = useState(false);
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const fileInput = useRef();

    async function getBase64(file) {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
            resolve(reader.result);
          };
          reader.onerror = function (error) {
            reject(error);
          };
        });
      }

    function handleFileChange(e) {
        if (e.target.files) {
            getBase64(e.target.files[0])
            .then(response => {
                setFile(response);
            })
            .catch(error => {
                setFile(null);
            });
        }
    };

    function handleChangeContent(input) {
        if (input.length > 300) return
        setContent(input);
    }

    function handleSubmit() {
        setLoadingCreatePost(true);
        CommonService.createPost(content, file)
        .then(response => {
            const postID = response.data.data;
            setPostCreated(true);
            setLoadingCreatePost(false);
            enqueueSnackbar("Post created successfully! Redirecting to post...", { variant: "success" });
            setTimeout(() => {
                window.location.href = `/feeds/${postID}`;
            }, 2000);
        })
        .catch(error => {
            enqueueSnackbar("Cannot publish a post. Please try again later.", { variant: "error" });
            setLoadingCreatePost(false);
        })
    }

    function handlePaste(e) {
        if (e.clipboardData.files[0]?.type.split("/")[0] === "image") {
            getBase64(e.clipboardData.files[0])
            .then(response => {
                setFile(response);
            })
            .catch(error => {
                setFile(null);
            });
            return;
        }
        
    }

    return (
        <React.Fragment>
            <Typography align='right' variant='inherit'>{content.length}/300</Typography>
            <TextField
                autoFocus
                sx={{ mt: 1 }}
                onChange={(e) => handleChangeContent(e.target.value)}
                id="outlined-multiline-static"
                label="Content"
                multiline
                inputProps={{ maxLength: 300 }}
                fullWidth
                onPaste={(e) => {handlePaste(e)}}
            />
            { file && 
                <Box sx={{ mt: 2 }} style={{ display: 'flex', flexDirection: 'row'}} alignItems='center' justifyContent='center'>
                    <img className="post-preview-image" alt="postpic" src={file} />
                </Box>
            }
            <Box sx={{ mt: 1, ml: 1  }} style={{ display: 'flex', flexDirection: 'row'}} alignItems='center' justifyContent='space-between'>
                <Box style={{ display: 'flex', flexDirection: 'row' }} justifyContent='flex-start' alignItems='center'>
                    <ImageIcon style={{fontSize: 25, cursor: "pointer"}} onClick={()=>fileInput.current.click()}>
                    </ImageIcon>
                    <input id="file" 
                        ref={fileInput}
                        style={{
                            display: "none"
                        }} 
                        hidden
                        accept="image/*"
                        type="file" onChange={handleFileChange}>
                    </input>
                </Box>
                <LoadingButton disabled={postCreated || (content.length === 0)} onClick={handleSubmit} type="submit" variant="contained" loading={loadingCreatePost}>
                    Post!
                </LoadingButton>
            </Box>
            
            
        </React.Fragment>
    );
}