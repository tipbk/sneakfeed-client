import React from 'react';
import { Typography } from '@mui/material';
import CreatePostComponent from '../component/CreatePostComponent';

function CreatePostPage() {

    return (
        <React.Fragment>
            <Typography variant="h4" sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}>What are you thinking?</Typography>
            <CreatePostComponent />
        </React.Fragment>
    );
}

export default CreatePostPage;