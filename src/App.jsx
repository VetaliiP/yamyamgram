import { Route, Routes, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Button } from '@mui/material';
import Home from './pages/Home/Home';
import FormPage from './pages/FormPage/FormPage';

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Главная</Button>
          <Button color="inherit" component={Link} to="/form">Форма</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
