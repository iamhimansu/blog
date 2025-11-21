import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    interface RegisterResponse {
        message: string,
        status: Number
    }

    interface RegisterVariables {
        username: string,
        email: string,
        password: string,
        confirmPassword: string
    }

    const registerMutation = useMutation<RegisterResponse, Error, RegisterVariables>({
        mutationFn: async (userData) => {
            const response = await axios.post('/auth/register', userData);
            return response.data;
        },
        onError: (error) => {
            console.log(error.message);
        },
        onSuccess: (data) => {
            if (data.status === 200) {
                navigate('/login');
            }
            throw new Error(data.message);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerMutation.mutate({
            username, email, password, confirmPassword
        });
    }
    const passwordMatch = (e: React.FormEvent) => {
        if (password.length === confirmPassword.length && password != confirmPassword) {

        }
    }

    return (
        <>
            <Container maxWidth="xs">
                <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5">Register</Typography>
                </Box>

                {registerMutation.isError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {registerMutation.error.message}
                    </Alert>
                )}
                {registerMutation.isPending && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                        Happy to add you.
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal" required fullWidth label="Username"
                        value={username} onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal" required fullWidth label="Email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal" required fullWidth label="Password" type="password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal" required fullWidth label="Confirm Password" type="password"
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
                        disabled={registerMutation.isPending}
                    >
                        {registerMutation.isPending ? '...' : 'Register'}
                    </Button>
                </Box>
            </Container>
        </>
    );
}

export default RegisterPage;