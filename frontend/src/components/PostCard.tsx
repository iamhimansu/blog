import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react"
interface PostCardProps {
    headerImage: string;
    title: string;
    content: string;
}
const PostCard: React.FC<PostCardProps> = ({ headerImage, title, content }) => {
    return (<Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
            <CardMedia
                component="img"
                height="140"
                image={headerImage}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {content}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary">
                Read
            </Button>
        </CardActions>
    </Card>
    );
}

export default PostCard;