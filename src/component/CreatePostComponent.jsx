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
        if (input.length > 50) return
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
            <Typography align='right' variant='inherit'>{content.length}/50</Typography>
            <TextField
                autoFocus
                sx={{ mt: 1 }}
                onChange={(e) => handleChangeContent(e.target.value)}
                id="outlined-multiline-static"
                label="Content"
                multiline
                rows={4}
                inputProps={{ maxLength: 50 }}
                fullWidth
                onPaste={(e) => {handlePaste(e)}}
            />
            <Box sx={{ mt: 2 }} style={{ display: 'flex', flexDirection: 'row'}} alignItems='center' >
                <Box style={{ display: 'flex', flexDirection: 'row' }} height='100px' width='100px' justifyContent='center' alignItems='center'>
                    <ImageIcon style={{fontSize: 60, cursor: "pointer"}} onClick={()=>fileInput.current.click()}>
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
                { file && 
                <Box sx={{ border: 1 , borderColor: 'primary.main', borderRadius: '16px' }} style={{ display: 'flex', flexDirection: 'row'}} height='100px' width='100px' alignItems='center' justifyContent='center'>
                    <Box>
                        <img className="post-preview-image" alt="postpic" src={file} />
                    </Box>
                </Box>
                }
            </Box>
            
            <LoadingButton disabled={postCreated} onClick={handleSubmit} type="submit" fullWidth variant="contained"  sx={{ mt: 2 }} loading={loadingCreatePost}>
                Post!
            </LoadingButton>
        </React.Fragment>
    );
}