import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function CommentComponent({username, profileImage, datetime, content}) {
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
                title={username}
                subheader={ (datetime !== null && datetime !== undefined && datetime !== "" && handleDateFormat(datetime)) || "N/A" }
            />
            <CardContent>
                <Typography variant="body2" color="text.primary">
                { content }
                </Typography>
            </CardContent>
        <CardActions disableSpacing>
        </CardActions>
        </Card>
    );
}