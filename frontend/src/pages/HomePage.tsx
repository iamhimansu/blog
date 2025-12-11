import React, { useState } from 'react';
import { Alert, Box, CircularProgress, Container, Divider, IconButton, Stack, Tab, Tabs } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';
import PostCard from '../components/PostCard';
import { CloseTwoTone } from '@mui/icons-material';

interface PostData {
    id: string;
    title: string;
    content: string;
}

interface TabItems {
    id: string;
    label: string;
}

const HomePage: React.FC = () => {

    const [tabs, setTabs] = useState<TabItems[]>([]);
    const [currentTab, setCurrentTab] = useState('');

    const queryClient = useQueryClient();
    const postsQuery = useQuery<PostData[]>({
        queryKey: ['posts'],
        queryFn: async () => { const response = await api.get('/posts/all'); return response.data.data },
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
    const handleRefreshPosts = () => {
        queryClient.invalidateQueries({ queryKey: ['posts'] }); // Marks 'posts' query as stale
        // postsQuery.refetch(); // This also works to refetch just this specific query
    };

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
                    <button onClick={handleRefreshPosts}>Try Again</button>
                </Alert>
            </Box>
        );
    }

    const handleTabs = (id: string, value: string) => {
        setTabs((prevTabs) => {
            const exists = tabs.some((tab) => tab.id === id);

            if (!exists) {
                // 2. If it doesn't exist, add it to the array
                setTabs((prevTabs) => [...tabs, { id, label: value }]);
            }
            return prevTabs;
        });

        setCurrentTab(id);

    }

    const handleTabClose = (e: React.FormEvent, id: string) => {
        setTabs((prevTabs) => {
            const newTabs = prevTabs.filter((tab) => tab.id !== id);
            return newTabs;
        });
    }

    return (
        <Container maxWidth={false} disableGutters sx={{ backgroundColor: '#F2F2F2' }}>
            {tabs.length > 0 && (
                <>
                    <Tabs
                        value={currentTab}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            margin: 0,
                            backgroundColor: '#FFFFFF',
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#E47C6B', // Set indicator color to coral
                                height: '3px', // Optional: Make it slightly thicker
                            },
                            '& .MuiTab-root': {
                                textTransform: 'none', // Keep text as written (not uppercase)
                                fontWeight: 'bold',
                                color: '#000000',
                                opacity: 0.8, // Slightly transparent for unselected tabs
                                fontSize: '16px',
                                '&.Mui-selected': {
                                    color: '#E47C6B', // Highlight selected tab with coral
                                    opacity: 1,
                                },
                                '&:hover': {
                                    color: '#E47C6B', // Highlight on hover
                                    opacity: 1,
                                },
                            },
                        }}
                    >
                        {tabs.map((tab, index) => (
                            <Tab
                                key={tab.id}
                                value={tab.id}
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bolder' }}>
                                        {tab.label}
                                        <IconButton size="small" component="span" sx={{ ml: 1 }} onClick={(e) => handleTabClose(e, tab.id)}>
                                            <CloseTwoTone fontSize="small" />
                                        </IconButton>
                                    </Box>
                                }
                                onClick={e => setCurrentTab(tab.id)}
                                aria-controls={`simple-tabpanel-${index}`}
                            />
                        ))
                        }
                    </Tabs>

                    <Divider></Divider>
                </>
            )}

            <Stack sx={{ padding: 2 }} direction="row" flexWrap="wrap" gap={3} justifyContent="flex-start">
                {/* 6. Map over the data array to create cards dynamically */}
                {postsQuery.data?.map((post) => (
                    <PostCard
                        // IMPORTANT: Every item in a map needs a unique 'key'
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        // Truncate long content for the preview card
                        content={post.content.substring(0, 120) + (post.content.length > 120 ? '...' : '')}
                        // Use a placeholder image since the backend doesn't provide one yet
                        headerImage={`https://dummyimage.com/600x400/000/fff`}

                        handleTabs={handleTabs}
                    />
                ))}
            </Stack>
        </Container>
    );
}

export default HomePage;