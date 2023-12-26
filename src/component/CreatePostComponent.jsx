import React, { useState } from 'react';
import CommonService from '../services/commonService';
import TextField from '@mui/material/TextField';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Menu, Typography } from '@mui/material';
import { useRef } from 'react';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import OgMetaComponent from './OgMetaComponent';

export default function CreatePostComponent() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const [link, setLink] = useState("");
    const [loadingLink, setLoadingLink] = useState(false);
    const [linkAvailable, setLinkAvailable] = useState(false);
    const [ogTitle, setOgTitle] = useState("");
    const [ogDescription, setOgDescription] = useState("");
    const [ogImage, setOgImage] = useState("");
    const [ogDomain, setOgDomain] = useState("");



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
        if (!linkAvailable) {
            CommonService.createPost(content, file, null, null, null, null, null)
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
        } else {
            CommonService.createPost(content, file, ogTitle, ogDescription, link, ogImage, ogDomain)
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
    }

    function handleLink() {
        setLoadingLink(true);
        CommonService.getMetadata(link)
        .then(response => {
            setLinkAvailable(true);
            setLoadingLink(false);
            const metadata = response.data.data.metadata;
            setOgTitle(metadata.ogTitle);
            setOgImage(metadata.image);
            setOgDescription(metadata.ogDescription);
            setOgDomain(metadata.domain);
            handleClose();
        })
        .catch(error => {
            enqueueSnackbar("Invalid Url", { variant: "error" });
            setLinkAvailable(false);
            setLoadingLink(false);
        })
    }

    function removeLink() {
        setLink("")
        setLinkAvailable(false);
        setOgTitle("");
        setOgDescription("");
        setOgImage("");
        setOgDomain("");
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
            <Box display='flex' justifyContent='center' alignItems='center'>
                <Box sx={{ mt: 2 }} style={{ display: 'inline-block', position: 'relative'}}>
                    <CloseIcon style={{position: 'absolute', right: 0,top: 0, zIndex: 1}} sx={{ "&:hover": { cursor: "pointer" } }} onClick={() => {setFile(null)}} />
                    <img className="post-preview-image" alt="postpic" src={file} />
                </Box>
            </Box>    
            }
            {linkAvailable && <Box display='flex' justifyContent='center' alignItems='center' sx={{ mt: 2 }}>
                <Box sx={{ mt: 2 }} style={{ display: 'inline-block', position: 'relative'}}>
                    <CloseIcon style={{position: 'absolute', right: 0,top: 0, zIndex: 1}} sx={{ "&:hover": { cursor: "pointer" } }} onClick={() => {removeLink()}} />
                    <OgMetaComponent ogDomain={ogDomain} ogTitle={ogTitle} ogDescription={ogDescription} ogImage={ogImage} ogLink={link} />
                </Box>
            </Box>}
            <Box sx={{ mt: 1, ml: 1  }} style={{ display: 'flex', flexDirection: 'row'}} alignItems='center' justifyContent='space-between'>
                <Box style={{ display: 'flex', flexDirection: 'row' }} sx={{gap: '10px'}} justifyContent='flex-start' alignItems='center'>
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
                    <InsertLinkIcon id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        sx={{ "&:hover": { cursor: "pointer" } }}
                        onClick={handleClick}/>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <TextField variant="outlined" sx={{ml: 1}}
                                size="small" onChange={(e) => {setLink(e.target.value)}} value={link}
                            />
                            <LoadingButton sx={{ml: 1, mr: 1}} disabled={postCreated || link.length === 0} onClick={() => {handleLink()}} type="submit" variant="contained" loading={loadingCreatePost || loadingLink}>
                                Link
                            </LoadingButton>
                        </Box>
                    </Menu>
                </Box>
                <Box style={{ display: 'flex', flexDirection: 'row' }} alignItems='center' justifyContent='flex-start'>
                    <Typography align='right' variant='inherit'>{content.length}/300</Typography>
                    <LoadingButton sx={{ml:2}} disabled={postCreated || (content.length === 0)} onClick={handleSubmit} type="submit" variant="contained" loading={loadingCreatePost}>
                        Post!
                    </LoadingButton>
                </Box>
                
            </Box>
            
            
        </React.Fragment>
    );
}