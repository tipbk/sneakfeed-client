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


export default function FullPostComponent({ totalComments ,totalLikes, datetime, postID, username, profileImage, content, isLikeProp, postImageUrl, isComment }) {
  const [isLike, setIsLike] = useState(isLikeProp);
  const [currentLikes, setCurrentLikes] = useState(totalLikes)

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
          <Avatar alt={ username } src={ (profileImage !== "" && profileImage) || "/nothing.jpg" } />
        }
        title={ username }
        subheader={ (datetime !== null && datetime !== "" && handleDateFormat(datetime)) || "N/A" }
      />
      <CardContent>
        <Typography variant="p" color="text.primary">
          { content }
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
          <IconButton aria-label="comment">
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