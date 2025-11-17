import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Alert } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // --- ADD THIS DEFINITION ---
    interface LoginResponse {
        token: string;
        user: {
            id: string;
            username: string;
            email: string;
        };
    }
    // ---------------------------

    interface LoginInput {
        email: string;
        password: string;
    }
    // API Mutation
    const loginMutation = useMutation<LoginResponse, Error, LoginInput>({
        mutationFn: async (userData) => {
            const response = await api.post('/auth/login', userData);
            return response.data;
        },
        onSuccess: (data) => {
            console.log("Success!", data);
            // Save the Token
            localStorage.setItem('token', data.token);
            // Redirect to Home
            navigate('/');
        },
        onError: (err) => {
            console.error("Error:", err);
        }
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate({ email, password });
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Sign In</Typography>

                {loginMutation.isError && (
                    <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                        Login Failed. Check credentials.
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal" required fullWidth label="Email Address"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal" required fullWidth label="Password" type="password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default LoginPage;