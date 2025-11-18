import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import RegisterPage from './pages/RegisterPage';
import { Container } from '@mui/material';

const App: React.FC = () => {
  return (<>
    <Container
      maxWidth="lg"
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
    >
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
      <Footer></Footer>
    </Container>
  </>
  )
}
export default App;