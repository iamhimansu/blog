import { Box, Container, TextField } from "@mui/material";
import React from "react";

const CreatePage: React.FC = () => {
    return (
        <Container maxWidth="md" sx={{ padding: '2rem' }}>
            <Box sx={{ marginBottom: 4 }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Title"
                    fullWidth={true}
                />
            </Box>
            <Box>
                <TextField
                    id="standard-multiline-flexible"
                    label="Content"
                    multiline
                    fullWidth={true}
                    rows={10}
                    sx={{ minHeight: '200px' }}
                />
            </Box>
        </Container>
    );
}
export default CreatePage;