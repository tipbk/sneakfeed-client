import React, { useEffect, useRef } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import { useState } from 'react';
import { Typography } from '@mui/material';
import Markdown from 'react-markdown'
import MdService from '../services/mdService';

function Homepage() {
    const [isMuted, setIsMuted] = useState(true);
    const [isMusicPlay, setIsMusicPlay] = useState(false);

    const [md, setMd] = useState("");

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
        MdService.getIntroMarkdown()
        .then(response => {
            setMd(response.data);
        });
        return () => {
            audio.current.pause();
        }
      }, [md])

    return (
        <React.Fragment>
            <Markdown>{md}</Markdown>
            <Typography>Created by</Typography>
            <Typography>Name: Chanathip Nateprapai</Typography>
            <Typography>Contact: chanathip.nate@gmail.com</Typography>
            <Typography>Always available for job offer. Let's have some talk.</Typography>
            <Typography variant="h6" sx={{ mt: 5, mb: 10, fontWeight: 'bold', textAlign: 'center' }}>This is the end. And cat is dancing. Click cat to enjoy music.</Typography>
            <div className='center'>
                <img onClick={playDubidubidu} style={{cursor: "pointer"}} src="https://ik.imagekit.io/tipbk/dubidubidu-cat.gif?updatedAt=1702567780242" alt="dubidubidu-cat"/>
                {!isMuted ? <VolumeUpIcon sx={{mt:5}} /> : <VolumeMuteIcon sx={{mt:5}} />}
            </div>
        </React.Fragment>
    );
}

export default Homepage;