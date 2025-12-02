import styled from "@emotion/styled";
import { CloudUploadTwoTone } from "@mui/icons-material";
import { Alert, Box, Button, Container, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const CreatePage: React.FC = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [headerImage, setHeaderImage] = useState<File | null>(null);

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    interface CreateContentResponse {
        message: string,
        status: Number
    }

    const createPageMutation = useMutation<CreateContentResponse, Error, FormData>({
        mutationFn: async (formData: FormData) => {
            const response = await api.post('/posts/create', formData);
            return response.data;
        },
        onError: (error) => {
            console.log(error.message);
        },
        onSuccess: (data) => {
            if (data.status === 200) {
                // setTimeout(() => navigate('/create'), 2000);
            }
            throw new Error(data.message);
        }
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);

        if (headerImage) {
            formData.append('headerImage', headerImage);
        }
        createPageMutation.mutate(formData);
    }

    return (
        <Container maxWidth="md" sx={{ padding: '2rem' }}>

            {createPageMutation.isError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {createPageMutation.error.message}
                </Alert>
            )}
            {createPageMutation.isPending && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    Creating...
                </Alert>
            )}
            {createPageMutation.isSuccess && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {createPageMutation.data.message}
                </Alert>
            )}
            <Box component="form" encType="multipart/form-data" onSubmit={handleSubmit}>
                <Box sx={{ marginBottom: 4 }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Title"
                        fullWidth
                        onChange={(e) => setTitle(e.target.value.trim())}
                    />
                </Box>
                <Box sx={{ marginBottom: 4 }}>
                    <Button
                        component="label"
                        variant="outlined"
                        tabIndex={-1}
                        fullWidth
                        startIcon={<CloudUploadTwoTone />}
                    >
                        Upload Header Image
                        <VisuallyHiddenInput
                            type="file"
                            accept="image/*" // Only accept image files
                            onChange={(e) => setHeaderImage(e.target.files ? e.target.files[0] : null)}
                        />
                    </Button>
                </Box>
                <Box sx={{ marginBottom: 4 }}>
                    <TextField
                        id="content"
                        label="Content"
                        required
                        multiline
                        fullWidth
                        rows={10}
                        sx={{ minHeight: '200px' }}
                        onChange={(e) => { setContent(e.target.value) }}
                    />
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Button variant="outlined" type="submit" size="medium">
                        Submit
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
export default CreatePage;