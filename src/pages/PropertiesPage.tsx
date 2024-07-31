// src/pages/PropertiesPage.tsx
import React, { useState } from 'react';
import Menu from '../components/Menu';
import PropertiesList from '../components/PropertiesList';
import RegisterProperty from '../components/RegisterProperty';

const PropertiesPage: React.FC = () => {
  const [view, setView] = useState<string>('list');

  return (
    <div className="container mx-auto p-4">
      <Menu setView={setView} />
      {view === 'list' && <PropertiesList />}
      {view === 'register' && <RegisterProperty />}
    </div>
  );
};

export default PropertiesPage;
