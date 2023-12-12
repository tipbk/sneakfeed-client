import React from 'react';
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

function Homepage() {
    return (
        <React.Fragment>
            <Div>
                <h1>Welcome to Chanathip's community</h1>
                <p>We're thrilled to welcome you to our vibrant community where you can find that this is just my side project.</p>
                <p>There are gonna be a lot of system here and I will try to expand it if I think it is good.</p>

                <p>You may find that some data will be changed or lost. That's normal. I'm not gonna help you on that.</p>
                <p>If you are recruiter and would like to try, feel free to do anything here.</p>
                <p>This project mainly shows functionalities, not decoration.</p>
                <p>Test new text changed</p>
                <p>P.S. sometime you may find that you got redirect to this page because your refresh token is already expired. :)</p>
                <p>Contact: chanathip.nate@gmail.com</p>
            </Div>
        </React.Fragment>
    );
}

export default Homepage;