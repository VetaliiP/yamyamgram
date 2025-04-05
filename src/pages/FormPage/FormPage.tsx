import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography, Box } from '@mui/material';

// 🔧 Определяем схему валидации через Yup
const schema = yup.object({
    name: yup.string().required('Имя обязательно').min(2, 'Минимум 2 символа'),
    email: yup.string().required('Email обязателен').email('Неверный формат email'),
});

type FormData = yup.InferType<typeof schema>;

const FormPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log('Отправлено:', data);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <Typography variant="h5">Форма</Typography>

            <TextField
                label="Имя"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
            />

            <TextField
                label="Email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
            />

            <Button variant="contained" type="submit">
                Отправить
            </Button>
        </Box>
    );
};

export default FormPage;
