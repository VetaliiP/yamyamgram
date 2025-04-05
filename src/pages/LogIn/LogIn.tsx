import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Схема валидации для входа
const schema = yup.object({
    username: yup.string().required('Имя пользователя обязательно').min(3, 'Минимум 3 символа'),
    password: yup.string().required('Пароль обязателен').min(6, 'Минимум 6 символов'),
});

type FormData = yup.InferType<typeof schema>;

interface LoginPageProps {
    setAuthenticated: (auth: boolean) => void;
}

const LoginPage = ({ setAuthenticated }: LoginPageProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();

    const onSubmit = (data: FormData) => {
        const { username, password } = data;

        // Проверяем, есть ли такой пользователь в localStorage
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const user = storedUsers.find((user: { username: string, password: string }) =>
            user.username === username && user.password === password
        );

        if (user) {
            // Если пользователь найден, сохраняем авторизацию и перенаправляем
            localStorage.setItem('auth', 'true');
            setAuthenticated(true);
            navigate('/');
        } else {
            // Если пользователь не найден, выводим ошибку
            alert('Неверное имя пользователя или пароль');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5">Вход</Typography>

            <TextField
                label="Имя пользователя"
                {...register('username')}
                error={!!errors.username}
                helperText={errors.username?.message}
            />

            <TextField
                label="Пароль"
                type="password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
            />

            <Button variant="contained" type="submit">
                Войти
            </Button>
        </Box>
    );
};

export default LoginPage;
