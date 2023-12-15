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


export default function FullPostComponent({ totalComments ,totalLikes, datetime, postID, username, profileImage, content, isLikeProp, postImageUrl, isComment }) {
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

  return (
    <React.Fragment>
    <Card className="generic-item" sx={{ width: 'auto' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ "&:hover": { cursor: "pointer" } }} alt={ username } src={ (profileImage !== "" && profileImage) || "/nothing.jpg" } />
        }
        title={ <Typography sx={{ fontWeight: 'bold', fontSize: 'default', "&:hover": { textDecoration: "underline" , cursor: 'pointer' } }}>{username}</Typography> }
        subheader={ ((datetime !== null && datetime !== "" && <Typography color="text.secondary" onClick={handlePostNavigation} sx={{ fontSize: 'default', "&:hover": { textDecoration: "underline", cursor: 'pointer' }}}>{handleDateFormat(datetime)}</Typography>) || <Typography color="text.secondary" onClick={handlePostNavigation}>N/A</Typography>)}
      />
      <CardContent>
        <Typography variant="p" color="text.primary">
          <pre style={{ fontFamily: 'inherit' }}>
              {content}
          </pre>
        </Typography>
      </CardContent>
      { postImageUrl && <img className="post-image" alt="postpic" src={postImageUrl} />}
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