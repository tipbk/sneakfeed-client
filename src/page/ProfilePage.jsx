import React from "react";
import ProfileEditorComponent from "../component/ProfileEditorComponent";

export default function ProfilePage() {
    return (
        <React.Fragment>
            <p className="generic-header">Your Profile</p>
            <ProfileEditorComponent />
        </React.Fragment>
        
    );
}