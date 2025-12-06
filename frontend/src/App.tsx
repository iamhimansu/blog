import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import RegisterPage from './pages/RegisterPage';
import { Container } from '@mui/material';
import CreatePage from './pages/CreatePage';
const App: React.FC = () => {
  return (<>
    <Container
      maxWidth={false}
      component="main"
      disableGutters>
      <Navbar />
      <Routes>
        <Route index path='/' element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />} />
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