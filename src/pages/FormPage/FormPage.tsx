import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Схема валидации для регистрации
const schema = yup.object({
    username: yup.string().required('Имя обязательно').min(3, 'Минимум 3 символа'),
    password: yup.string().required('Пароль обязателен').min(6, 'Минимум 6 символов'),
});

type FormData = yup.InferType<typeof schema>;

interface FormPageProps {
    setAuthenticated: (auth: boolean) => void;
}

const FormPage = ({ setAuthenticated }: FormPageProps) => {
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

        // Проверяем, есть ли уже такой пользователь в localStorage
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = storedUsers.some((user: { username: string }) => user.username === username);

        if (userExists) {
            alert('Пользователь с таким именем уже существует.');
        } else {
            // Добавляем нового пользователя в localStorage
            storedUsers.push({ username, password });
            localStorage.setItem('users', JSON.stringify(storedUsers));

            // Сохраняем авторизацию в localStorage
            localStorage.setItem('auth', 'true');
            setAuthenticated(true);

            // Перенаправляем на страницу Home
            navigate('/');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5">Регистрация / Вход</Typography>

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

export default FormPage;
