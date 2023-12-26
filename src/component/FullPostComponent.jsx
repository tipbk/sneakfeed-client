import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommonService from '../services/commonService';
import { useState } from 'react';
import { ChatBubble, ChatBubbleOutlineOutlined } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { Box, Tooltip } from '@mui/material';
import CompactUserComponent from './CompactUserComponent';
import OgMetaComponent from './OgMetaComponent';


export default function FullPostComponent({ totalComments ,totalLikes, datetime, postID, username, profileImage, content, isLikeProp, postImageUrl, isComment, displayName, ogLink, ogTitle, ogDescription, ogImage, ogDomain }) {
  const [isLike, setIsLike] = useState(isLikeProp);
  const [currentLikes, setCurrentLikes] = useState(totalLikes)

  const navigate = useNavigate();

  const handlePostNavigation = () => {
    navigate(`/feeds/${postID}`);
  }

  const handleToggleLike = () => {
    if (isLike) {
      setCurrentLikes(currentLikes - 1)
    } else {
      setCurrentLikes(currentLikes + 1)
    }
    setIsLike(!isLike)
    CommonService.toggleLikePost(postID)
    .catch(error => {
        alert(error);
    })
  }

  const handleDateFormat = (datetimeString) => {
    const dateObject = new Date(datetimeString);
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    
    const formattedDate = formatter.format(dateObject);
    return formattedDate;
  }

  const handleNavigateUser = () => {
    navigate(`/users/${username}`);
  }

  return (
    <React.Fragment>
    <Card className="generic-item" sx={{ width: 'auto' }}>
      <CardHeader
        avatar={
          <Avatar onClick={handleNavigateUser} sx={{ "&:hover": { cursor: "pointer" } }} alt={ username } src={ (profileImage !== "" && profileImage) || "/nothing.jpg" } />
        }
        title={<div style={{display: 'flex', flexDirection: 'row'}}><Tooltip leaveDelay={500} enterDelay={500} enterNextDelay={500} title={<CompactUserComponent username={username} displayName={displayName} profileImage={profileImage} />} placement="top">
           <Typography onClick={handleNavigateUser} sx={{ fontWeight: 'bold', fontSize: 'default', "&:hover": { textDecoration: "underline" , cursor: 'pointer' } }}>{displayName || username}</Typography></Tooltip><pre style={{margin: 0}}> </pre><Tooltip leaveDelay={500} enterDelay={500} enterNextDelay={500} title={<CompactUserComponent username={username} displayName={displayName} profileImage={profileImage} />} placement="top"><Typography color="text.secondary" onClick={handleNavigateUser} sx={{ fontSize: 'default', "&:hover": { textDecoration: "underline" , cursor: 'pointer' } }}>@{username}</Typography></Tooltip></div>
        }
        subheader={<div style={{display: 'flex', flexDirection: 'row'}}><Tooltip title={CommonService.handleDateFormat(datetime)}><Typography noWrap color="text.secondary" onClick={handlePostNavigation} sx={{ fontSize: 'default', "&:hover": { textDecoration: "underline", cursor: 'pointer' }}}>{CommonService.handleShowTimeFormat(datetime)}</Typography></Tooltip></div>}
      />
      <CardContent>
        <Typography variant="p" color="text.primary" style={{ wordWrap: "break-word" }}>
          {content}
        </Typography>
      </CardContent>
      { postImageUrl && <img className="post-image" alt="postpic" src={postImageUrl} />}
      { ogLink && <Box display='flex' justifyContent='center' alignItems='center' sx={{ mt: 2 }}>
        <OgMetaComponent ogTitle={ogTitle} ogDescription={ogDescription} ogDomain={ogDomain} ogLink={ogLink} ogImage={ogImage} />
      </Box>}
      <CardActions disableSpacing>
        <div className="icon-button">
          <IconButton aria-label="add to favorites" onClick={handleToggleLike}>
              {isLike && <FavoriteOutlinedIcon style={{ color: 'red' }} />}
            {!isLike && <FavoriteBorderOutlinedIcon />}
          </IconButton>
          <p>{currentLikes}</p>
          <IconButton aria-label="comment" onClick={handlePostNavigation}>
            {isComment && <ChatBubble style={{ color: 'DeepSkyBlue' }} />}
            {!isComment && <ChatBubbleOutlineOutlined />}
          </IconButton>
          <p>{totalComments}</p>
        </div>
      </CardActions>
    </Card>
    </React.Fragment>
  );
}