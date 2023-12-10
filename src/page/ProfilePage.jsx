import React, { useEffect, useState } from "react";
import CommonService from "../services/commonService";
import { Avatar, Typography } from "@mui/material";
import CustomButton from "../theme/CustomButton";

export default function ProfilePage() {
    const [username, setUsername] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
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

    function handleUpdateProfile() {
        CommonService.patchProfile(file)
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
            }
        )
        .catch((error) => {
            alert("please relogin again")
            window.location.href = "/"
        })
    }, []);
    return (
        <React.Fragment>
            <p className="generic-header">Your Profile</p>
            <div className="center">
                <Avatar alt={username} src={file || profileImage} sx={{ width: 128, height: 128 }}></Avatar>
                <Typography variant="h6">{username}</Typography>
            </div>
            <input id="file" type="file" onChange={handleFileChange} />
            <div className="button-margin">
                <CustomButton text="Apply Change" action={handleUpdateProfile} />
            </div>

            
        </React.Fragment>
        
    );
}