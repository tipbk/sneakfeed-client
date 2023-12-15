import React, { useState } from 'react';
import CommonService from '../services/commonService';
import TextField from '@mui/material/TextField';
import CustomButton from '../theme/Theme';

export default function CreatePostComponent() {
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);

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
            <div className="create-post-component">
            <TextField
                onChange={(e) => handleChangeContent(e.target.value)}
                id="outlined-multiline-static"
                label="Content"
                multiline
                rows={4}
                inputProps={{ maxLength: 50 }}
                fullWidth
            />
                <p>{content.length}/50</p>
            </div>
            <input id="file" type="file" onChange={handleFileChange} />
            { file && 
            <img className="post-image" alt="postpic" src={file} />}
            <div className="main-content-component">
                <div className="button-margin">
                    <CustomButton text={"Post!"} action={handleSubmit}/>
                </div>
            </div>
        </React.Fragment>
    );
}