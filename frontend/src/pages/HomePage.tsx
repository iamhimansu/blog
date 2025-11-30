import React from 'react';
import { Alert, Box, CircularProgress, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import api from '../api/api';
import PostCard from '../components/PostCard';

interface PostData {
    id: string;
    title: string;
    content: string;
}

const HomePage: React.FC = () => {

    const postsQuery = useQuery<PostData[]>({
        queryKey: ['posts'],
        queryFn: async () => { const response = await api.get('/posts/all'); return response.data.data }
    });

    if (postsQuery.isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (postsQuery.isError) {
        return (
            <Box sx={{ mt: 5 }}>
                <Alert severity="error">
                    Error loading posts. Please try again later.
                </Alert>
            </Box>
        );
    }
    return (

        <Stack sx={{ padding: 2 }} direction="row" flexWrap="wrap" gap={3} justifyContent="flex-start">
            {/* 6. Map over the data array to create cards dynamically */}
            {postsQuery.data?.map((post) => (
                <PostCard
                    // IMPORTANT: Every item in a map needs a unique 'key'
                    key={post.id}
                    title={post.title}
                    // Truncate long content for the preview card
                    content={post.content.substring(0, 120) + (post.content.length > 120 ? '...' : '')}
                    // Use a placeholder image since the backend doesn't provide one yet
                    headerImage={`https://dummyimage.com/600x400/000/fff`}
                />
            ))}
        </Stack>
    );
}

export default HomePage;