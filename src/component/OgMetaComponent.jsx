import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

export default function OgMetaComponent({ ogTitle, ogDescription, ogImage, ogDomain, ogLink }) {
    return (
        <Card sx={{ maxWidth: 345 }} onClick={() => window.open(ogLink, '_blank')}>
            <CardActionArea>
                {ogImage && <CardMedia
                component="img"
                height="140"
                image={ ogImage }
                alt="og image"
                />}
                
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        { ogTitle }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        { ogDescription }
                    </Typography>
                    {ogDomain && <Typography variant="body2" color="text.secondary">
                        { ogDomain }
                    </Typography>}
                </CardContent>
                
            </CardActionArea>
        </Card>
    );
}