import React, { useState } from 'react';
import CommonService from '../services/commonService';
import TextField from '@mui/material/TextField';
import ImageIcon from '@mui/icons-material/Image';
import { Box, Button, Input, Typography } from '@mui/material';
import { useRef } from 'react';

export default function CreatePostComponent() {
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
        CommonService.createPost(content, file)
        .then(response => {
            const postID = response.data.data;
            window.location.href = `/feeds/${postID}`;
        })
        .catch(error => {
            alert("Cannot publish a post. Please try again later");
        })
    }

    return (
        <React.Fragment>
            <Typography align='right' variant='inherit'>{content.length}/50</Typography>
            <TextField
                sx={{ mt: 1 }}
                onChange={(e) => handleChangeContent(e.target.value)}
                id="outlined-multiline-static"
                label="Content"
                multiline
                rows={4}
                inputProps={{ maxLength: 50 }}
                fullWidth
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
                        
                        <img className="post-image" alt="postpic" src={file} />
                    </Box>
                </Box>
                }
            </Box>
            
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              Post!
            </Button>
        </React.Fragment>
    );
}