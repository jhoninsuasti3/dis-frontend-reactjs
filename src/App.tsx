// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PropertiesPage from './pages/PropertiesPage';
import ProtectedRoute from './components/ProtectedRoute';
import Nav from './components/Nav';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <Nav /> {/* Agregar el componente de navegación */}
      <div style={{ minHeight: '90vh' }} className="min-h-screen flex flex-col items-center">
        <main className="flex-grow w-3/5 max-w-screen-lg">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/properties"
              element={
                <ProtectedRoute>
                  <PropertiesPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
