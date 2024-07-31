import React, { useState } from 'react';
import axios from 'axios';

const RegisterProperty: React.FC = () => {
  const [newProperty, setNewProperty] = useState({
    address: '',
    price: '',
    size: '',
    description: '',
    property_type: 'casa',
  });
  const [formError, setFormError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProperty((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = window.localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.post('http://localhost:8000/api/properties/', newProperty, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage('Property registered successfully');
      setFormError(''); // Limpieza de errores
      setNewProperty({
        address: '',
        price: '',
        size: '',
        description: '',
        property_type: 'casa',
      }); // Restrablecimiento del form
    } catch (error) {
      setFormError('Failed to register property');
      console.error('Register property error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-xl font-bold mb-2">Register New Property</h2>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {formError && <p className="text-red-500">{formError}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={newProperty.address}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={newProperty.price}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Size</label>
        <input
          type="number"
          name="size"
          value={newProperty.size}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <input
          type="text"
          name="description"
          value={newProperty.description}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Property Type</label>
        <select
          name="property_type"
          value={newProperty.property_type}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 w-full"
          required
        >
          <option value="casa">Casa</option>
          <option value="apartamento">Apartamento</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Register Property
      </button>
    </form>
  );
};

export default RegisterProperty;
