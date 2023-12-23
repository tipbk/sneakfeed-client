import React, { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import { useState } from 'react';
import { Button, Tooltip, Typography } from '@mui/material';
import CompactUserComponent from '../component/CompactUserComponent';

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

  
  


function Homepage() {
    const [isMuted, setIsMuted] = useState(true);
    const [isMusicPlay, setIsMusicPlay] = useState(false);

    const audio = useRef(new Audio("/dubidubidu-cat.mp3"));   
    
    
    const playDubidubidu = () => {
        
        if (!isMusicPlay) {
            audio.current.loop = true;
            setIsMusicPlay(true);
            audio.current.play();
            setIsMuted(false);
            return
        }
        if (isMuted) {
            audio.current.muted = false;
        } else {
            audio.current.muted = true;
        }
        setIsMuted(!isMuted)
    }

    useEffect(() => {
        return () => {
            audio.current.pause();
        }
      }, [])

    

    return (
        <React.Fragment>

            {/* <Div>
                <h1>Welcome to Chanathip's community</h1>
                <p>We're thrilled to welcome you to our vibrant community where you can find that this is just my side project.</p>
                <p>There are gonna be a lot of system here and I will try to expand it if I think it is good.</p>

                <p>You may find that some data will be changed or lost. That's normal. I'm not gonna help you on that.</p>
                <p>If you are recruiter and would like to try, feel free to do anything here.</p>
                <p>This project mainly shows functionalities, not decoration.</p>
                <p>P.S. sometime you may find that you got redirect to this page because your refresh token is already expired. :)</p>
                <p>Contact: chanathip.nate@gmail.com</p>
            </Div> */}
            <Typography variant="h4" sx={{ mt: 5, mb: 10, fontWeight: 'bold', textAlign: 'center' }}>CHIPI CHIPI CHAPA CHAPA DUBI DUBI DABA DABA MAGICO MI DUBI DUBI BOOM BOOM BOOM BOOM</Typography>
            <div className='center'>
                <img onClick={playDubidubidu} style={{cursor: "pointer"}} src="https://ik.imagekit.io/tipbk/dubidubidu-cat.gif?updatedAt=1702567780242" alt="dubidubidu-cat"/>
                {!isMuted ? <VolumeUpIcon sx={{mt:5}} /> : <VolumeMuteIcon sx={{mt:5}} />}
            </div>
            <Tooltip leaveDelay={700} enterDelay={700} enterNextDelay={700} title={<CompactUserComponent username="admin" displayName="CHUPI CHAPA" />} placement="top">
                <Button>top-start</Button>
            </Tooltip>
        </React.Fragment>
    );
}

export default Homepage;