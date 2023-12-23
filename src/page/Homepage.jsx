import React, { useEffect, useRef } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import { useState } from 'react';
import { Typography } from '@mui/material';

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
            <Typography variant="h4" sx={{ mt: 5, mb: 10, fontWeight: 'bold', textAlign: 'center' }}>CHIPI CHIPI CHAPA CHAPA DUBI DUBI DABA DABA MAGICO MI DUBI DUBI BOOM BOOM BOOM BOOM</Typography>
            <div className='center'>
                <img onClick={playDubidubidu} style={{cursor: "pointer"}} src="https://ik.imagekit.io/tipbk/dubidubidu-cat.gif?updatedAt=1702567780242" alt="dubidubidu-cat"/>
                {!isMuted ? <VolumeUpIcon sx={{mt:5}} /> : <VolumeMuteIcon sx={{mt:5}} />}
            </div>
        </React.Fragment>
    );
}

export default Homepage;