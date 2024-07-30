// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import PropertyListPage from './pages/PropertyListPage'; // Asegúrate de que la ruta es correcta

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/properties" element={<PropertyListPage />} />
    </Routes>
  </Router>
);

export default App;
