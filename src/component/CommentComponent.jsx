import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import CompactUserComponent from './CompactUserComponent';
import CommonService from '../services/commonService';

export default function CommentComponent({username, profileImage, datetime, content, displayName}) {
    const navigate = useNavigate();

    const handleNavigateUser = () => {
        navigate(`/users/${username}`);
      }

    return (
        <Card className="generic-item" sx={{ width: 'auto' }}>
            <CardHeader
                avatar={
                <Avatar onClick={handleNavigateUser} sx={{ "&:hover": { cursor: "pointer" } }} alt={ username } src={ (profileImage !== "" && profileImage) || "/nothing.jpg" } />
                }
                title={<div style={{display: 'flex', flexDirection: 'row'}}><Tooltip leaveDelay={500} enterDelay={500} enterNextDelay={500} title={<CompactUserComponent username={username} displayName={displayName} profileImage={profileImage} />} placement="top">
                    <Typography onClick={handleNavigateUser} sx={{ fontWeight: 'bold', fontSize: 'default', "&:hover": { textDecoration: "underline" , cursor: 'pointer' } }}>{displayName || username}</Typography></Tooltip><pre style={{margin: 0}}> </pre><Tooltip leaveDelay={500} enterDelay={500} enterNextDelay={500} title={<CompactUserComponent username={username} displayName={displayName} profileImage={profileImage} />} placement="top"><Typography color="text.secondary" onClick={handleNavigateUser} sx={{ fontSize: 'default', "&:hover": { textDecoration: "underline" , cursor: 'pointer' } }}>@{username}</Typography></Tooltip></div>
                }
                subheader={<div style={{display: 'flex', flexDirection: 'row'}}><Tooltip title={CommonService.handleDateFormat(datetime)}><Typography noWrap color="text.secondary" sx={{ fontSize: 'default', "&:hover": { textDecoration: "underline", cursor: 'pointer' }}}>{CommonService.handleShowTimeFormat(datetime)}</Typography></Tooltip></div>}
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