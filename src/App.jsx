import { Route, Routes, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import Home from './pages/Home/Home';
import FormPage from './pages/FormPage/FormPage';
import LogIn from './pages/LogIn/LogIn';
import { useState, useEffect } from 'react';

// Проверка авторизации из localStorage
const isAuthenticated = () => localStorage.getItem('auth') === 'true';

function App() {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    // Слушаем изменения авторизации (например, в случае логина/выхода)
    setAuthenticated(isAuthenticated());
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Главная
          </Button>
          {!authenticated && (
            <Button color="inherit" component={Link} to="/login">
              Войти
            </Button>
          )}
          {!authenticated && (
            <Button color="inherit" component={Link} to="/form">
              Регистрация
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route
            path="/"
            element={authenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/form"
            element={<FormPage setAuthenticated={setAuthenticated} />}
          />
          <Route
            path="/login"
            element={<LogIn setAuthenticated={setAuthenticated} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
