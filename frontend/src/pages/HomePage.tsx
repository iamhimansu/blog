import { Box, Typography } from "@mui/material";
import React from "react";
const HomePage: React.FC = () => {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div>
                    <Typography variant="h3" gutterBottom>
                        Blogflirt
                    </Typography>
                    <Typography>Stay in the loop with the latest about our products</Typography>
                </div>
            </Box>
        </>
    );
}

export default HomePage;