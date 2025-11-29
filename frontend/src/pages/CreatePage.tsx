import styled from "@emotion/styled";
import { CloudUploadTwoTone } from "@mui/icons-material";
import { Box, Button, Container, TextField } from "@mui/material";
import React from "react";
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
            <Box sx={{ marginBottom: 4 }}>
                <Button
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    fullWidth={true}
                    startIcon={<CloudUploadTwoTone />}
                >
                    Upload Header Image
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => console.log(event.target.files)}
                    />
                </Button>
            </Box>
            <Box sx={{ marginBottom: 4 }}>
                <TextField
                    id="standard-multiline-flexible"
                    label="Content"
                    required
                    multiline
                    fullWidth
                    rows={10}
                    sx={{ minHeight: '200px' }}
                />
            </Box>
            <Box sx={{ textAlign: 'right' }}>
                <Button variant="outlined" size="medium">
                    Submit
                </Button>
            </Box>
        </Container>
    );
}
export default CreatePage;