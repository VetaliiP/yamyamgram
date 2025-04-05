import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

const Home: FC = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Typography variant="h4">Добро пожаловать на главную страницу!</Typography>
        </Box>
    )
}

export default Home;

