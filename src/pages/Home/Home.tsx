import React from 'react';
import { Typography, Button } from '@mui/material';

const Home = () => {
    const handleLogout = () => {
        localStorage.removeItem('auth');
        window.location.reload();  // Перезагружаем страницу, чтобы сбросить состояние
    };

    return (
        <div>
            <Typography variant="h4">Добро пожаловать на главную страницу!</Typography>
            <Button onClick={handleLogout} variant="contained" color="secondary">
                Выйти
            </Button>
        </div>
    );
};

export default Home;
