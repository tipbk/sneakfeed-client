import { Avatar, Button, TextField, Typography } from "@mui/material";
import React, { useRef } from "react";
import { useState } from "react";
import CommonService from "../services/commonService";
import { useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';

export default function ProfileEditorComponent() {
    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [profileImage, setProfileImage] = useState(null);
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

    function handleUpdateProfile() {
        CommonService.updateProfile(file, displayName)
        .then(response => {
            window.location.href = "/profile"
        })
        .catch(error => {
            alert("cannot update. please try again later")
        })
    }

    useEffect(() => {
        CommonService.getCurrentUser()
        .then(
            response => {
                setUsername(response.data.data.username);
                setProfileImage(response.data.data.profileImage);
                setDisplayName(response.data.data.displayName);
            }
        )
        .catch((error) => {
            alert("please relogin again")
            window.location.href = "/"
        })
    }, []);

    return (
        <React.Fragment>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <div style={{position: 'relative', display: 'inline-block'}}>
                    <Avatar alt={username} src={file || profileImage} sx={{ position: 'absolute',width: 128, height: 128, "&:hover": { cursor: 'pointer' } }}></Avatar>
                    <Avatar onClick={()=>fileInput.current.click()} children={<EditIcon sx={{ fontSize: 40 }}/>} alt={username} sx={{ zIndex: 1 ,position: 'relative', opacity: 0 ,width: 128, height: 128, "&:hover": { cursor: 'pointer', opacity: 0.85 } }}></Avatar>
                    <input id="file" 
                        ref={fileInput}
                        style={{
                            display: "none"
                        }} 
                        hidden
                        accept="image/*"
                        type="file" onChange={handleFileChange}>
                    </input>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <TextField sx={{ m: 1, width: '50ch' }}
                        disabled
                        id="username"
                        label="Username"
                        defaultValue={username}
                        value={username}
                        />
                    <TextField sx={{ m: 1, width: '50ch' }}
                        id="displayName"
                        label="Display Name"
                        name="displayName"
                        helperText="Others will see this name on posts, comments"
                        defaultValue={displayName}
                        value={displayName}
                        onChange={(e) => {setDisplayName(e.target.value)}}
                        />
                </div>
            </div>
            <Button variant="contained" style={{float:'right'}} onClick={handleUpdateProfile}>Apply change</Button>
            
        </React.Fragment>
    );
}