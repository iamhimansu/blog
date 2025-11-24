import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Alert, Link } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Link as RouterLink } from "react-router-dom";

function LoginPage() {
    const [userOremail, setUserOremail] = useState('');
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
        status: Number,
        message: string
    }
    // ---------------------------

    interface LoginVariables {
        userOremail: string;
        password: string;
    }
    // API Mutation
    const loginMutation = useMutation<LoginResponse, Error, LoginVariables>({
        mutationFn: async (userData) => {
            const response = await api.post('/auth/login', { username: userData.userOremail, password: userData.password });
            return response.data;
        },
        onError: (err) => {
            console.error("Error:", err);
        },
        onSuccess: (data) => {
            if (data.status === 200) {
                // Save the Token
                localStorage.setItem('token', data.token);
                navigate('/');
            }
            throw new Error(data.message);
        },

        onSettled: async (data, error, variables, onMutateResult, context) => {

        }
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate({ userOremail, password });
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Sign In</Typography>

                {loginMutation.isError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {loginMutation.error.message}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal" required fullWidth label="Username or Email"
                        value={userOremail} onChange={(e) => setUserOremail(e.target.value)}
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
                    Not registered yet? <Link component={RouterLink} to="/register" variant="body2">
                        {"Create new account"}
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}

export default LoginPage;