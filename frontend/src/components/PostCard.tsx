import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react"
interface PostCardProps {
    id: string;
    headerImage: string;
    title: string;
    content: string;
    handleTabs: (id: string, label: string) => void
}
const PostCard: React.FC<PostCardProps> = ({ id, headerImage, title, content, handleTabs }) => {
    return (<Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={() => handleTabs(id, title)}>
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
            <Button size="small" color="primary" onClick={() => handleTabs(id, title)}>
                Read
            </Button>
        </CardActions>
    </Card>
    );
}

export default PostCard;