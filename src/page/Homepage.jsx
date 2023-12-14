import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import { useState } from 'react';
import { Typography } from '@mui/material';

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

  
  


function Homepage() {
    const [isMuted, setIsMuted] = useState(true);
    const [isMusicPlay, setIsMusicPlay] = useState(false);

    const audio = useRef(new Audio("https://rr3---sn-5goeen7y.googlevideo.com/videoplayback?expire=1702587599&ei=bxh7ZZHwLMSYv_IPp9izUA&ip=95.217.131.170&id=o-AF2TCOImEpdKMYXspE6a-nQTYU2NkwTBd0ju8ndkto5D&itag=249&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=pb&mm=31%2C29&mn=sn-5goeen7y%2Csn-5go7ynl6&ms=au%2Crdu&mv=m&mvi=3&pl=24&initcwndbps=386250&spc=UWF9fxzgKozZyzzn0LuRbNDroBU94SSY4mtuFC9e7w&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=Y4_wlEe4tOUkGVOwg9_qACkQ&gir=yes&clen=76504&dur=13.081&lmt=1702066262994903&mt=1702565643&fvip=1&keepalive=yes&fexp=24007246&c=WEB&txp=5308224&n=cmu6wIubgIMylA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AAO5W4owRAIgVgg4FDmcTXISs56Zho2xDQpuJWXRPKvpZW-MjTIkfpwCIA2x9wViSBXh8BSPANPwEUKaedPTB4LvpowDZ_zvOtQI&sig=AJfQdSswRQIgSzOpHUQQ9hy4ZIh78BUY5pVCsQi0WoXn7WbUog7Y-owCIQDlixrRtujIPcjwWXnjAqzHMp6DCVassY4CTKrFydqr2A%3D%3D"));   
    
    
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
            
        </React.Fragment>
    );
}

export default Homepage;