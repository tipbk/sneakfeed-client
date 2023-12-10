import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyIcon from '@mui/icons-material/Reply';
import { useNavigate } from "react-router-dom";

export default function FeedPostComponent({ datetime, postID, username, profileImage, content, postImageUrl, totalLikes, totalComments }) {
  const navigate = useNavigate();

  const handlePostNavigation = () => {
    navigate(`/feeds/${postID}`);
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
      <div className="icon-button">
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <p>{totalLikes}</p>
          <IconButton aria-label="share">
            <ReplyIcon onClick={handlePostNavigation} />
          </IconButton>
          <p>{totalComments}</p>
        </CardActions>
      </div>
    </Card>
  );
}