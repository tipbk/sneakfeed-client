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
import ReplyIcon from '@mui/icons-material/Reply';


export default function FullPostComponent({ countComment ,countLike, setCountLike, datetime, postID, title, username, profileImage, content, isLikeProp, postImageUrl }) {
  const [isLike, setIsLike] = useState(isLikeProp);

  const handleToggleLike = () => {
    if (isLike) {
      setCountLike(countLike - 1)
    } else {
      setCountLike(countLike + 1)
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
          <IconButton aria-label="add to favorites">
              {isLike && <div onClick={handleToggleLike}><FavoriteOutlinedIcon /></div>}
            {!isLike && <div onClick={handleToggleLike}><FavoriteBorderOutlinedIcon /></div>}
          </IconButton>
          <p>{countLike}</p>
          <IconButton aria-label="comment">
            <ReplyIcon />
          </IconButton>
          <p>{countComment}</p>
        </div>
      </CardActions>
    </Card>
    </React.Fragment>
  );
}