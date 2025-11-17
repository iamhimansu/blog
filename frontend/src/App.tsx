import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function HomePage() {
  return <h1>Welcome to the Blog! <Link to={{
    pathname: "/login",
  }}>Click to login</Link></h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;